import { ApiError } from "./errors";

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers, ...customConfig } = options;

    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += (url.includes("?") ? "&" : "?") + queryString;
      }
    }

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...customConfig,
    };

    let response: Response;
    try {
      response = await fetch(url, config);
    } catch {
      throw new ApiError(
        "Gagal terhubung ke server. Periksa jaringan Anda dan coba lagi.",
        0,
        "NETWORK_ERROR"
      );
    }

    let result: ApiResponse<T>;
    try {
      result = await response.json();
    } catch {
      if (!response.ok) {
        throw new ApiError(
          `Terjadi kesalahan pada server (${response.status})`,
          response.status,
          "SERVER_ERROR"
        );
      }
      return {} as T;
    }

    if (!response.ok || result.success === false) {
      const code = result.error?.code || `HTTP_${response.status}`;
      const message =
        result.error?.message ||
        `Permintaan gagal dengan status ${response.status}.`;
      throw new ApiError(message, response.status, code);
    }

    // If there is pagination, return full payload or result as T
    if (result.pagination) {
      return result as unknown as T;
    }

    const dataObj = result.data as Record<string, unknown> | undefined;
    if (dataObj && typeof dataObj === "object" && !Array.isArray(dataObj) && dataObj.pagination) {
      return {
        success: result.success,
        data: dataObj.transactions ?? dataObj.data ?? dataObj,
        pagination: dataObj.pagination,
      } as unknown as T;
    }

    return (result.data !== undefined ? result.data : result) as T;
  }

  public get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, { method: "GET", ...options });
  }

  public post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  public put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  public delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, { method: "DELETE", ...options });
  }
}

export const apiClient = new ApiClient();
