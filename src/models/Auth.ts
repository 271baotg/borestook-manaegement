export interface AuthObject {
  username: string;
  password: string;
  token: string;
  roles: string[];
}

export type AuthContextType = {
  auth: AuthObject | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthObject | null>>;
};
