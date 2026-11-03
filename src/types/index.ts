/**
 * Core Application Types for MoneyTrack
 * These definitions will be expanded in Phase 2 & 3.
 */

export type Currency = "IDR";

export interface UserSession {
  id: string;
  email: string;
  name?: string | null;
}
