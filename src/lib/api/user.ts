import { apiClient } from "./client";
import {
  UpdateProfileFormValues,
  ChangePasswordFormValues,
} from "@/lib/validations/user.schema";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export async function fetchProfile(): Promise<UserProfile> {
  return apiClient.get<UserProfile>("/api/user/profile");
}

export async function updateProfile(
  payload: UpdateProfileFormValues
): Promise<UserProfile> {
  return apiClient.put<UserProfile>("/api/user/profile", payload);
}

export async function changePassword(
  payload: ChangePasswordFormValues
): Promise<{ success: boolean; message: string }> {
  return apiClient.put<{ success: boolean; message: string }>(
    "/api/user/password",
    payload
  );
}
