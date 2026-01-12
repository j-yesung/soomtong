import { type User } from "@supabase/supabase-js";

export interface AuthState {
  userInfo: User;
}

export interface AuthActions {
  updateUserInfo: (info: User) => void;
  clearUserInfo: () => void;
}
