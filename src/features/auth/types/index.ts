export interface AuthState {
  userId: string;
}

export interface AuthActions {
  setUserId: (id: string) => void;
  clearUserId: () => void;
}
