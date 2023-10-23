import {
  ChildContextProvider,
  ReactComponentElement,
  ReactElement,
  ReactNode,
  ReactPropTypes,
  createContext,
  useEffect,
  useState,
} from "react";
import { json, useLocation } from "react-router-dom";

const AuthContext = createContext({} as AuthContextType);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const initialAuth = () => {
    if (sessionStorage.getItem("auth")) {
      return JSON.parse(sessionStorage.getItem("auth")!);
    }
  };

  const [auth, setAuth] = useState<AuthObject | null>(initialAuth);

  useEffect(() => {
    if (auth) {
      sessionStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
