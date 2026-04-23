export interface AuthState {
  userId: string;
  isReady: boolean;
  errorMessage: string | null;
}

export interface AuthActions {
  setUserId: (id: string) => void;
  setAuthReady: () => void;
  setAuthError: (message: string) => void;
  clearUserId: () => void;
}
