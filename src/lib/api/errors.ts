export class ApiError extends Error {
  public status: number;
  public code: string;
  public details?: unknown;

  constructor(message: string, status = 400, code = "API_ERROR", details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "Terjadi kesalahan yang tidak diharapkan. Silakan coba lagi.";
}
