import { apiClient } from "./client";
import { RegisterFormValues } from "@/lib/validations/auth.schema";

export async function registerUser(payload: RegisterFormValues) {
  return apiClient.post<{ id: string; email: string; name: string }>(
    "/api/auth/register",
    payload
  );
}
