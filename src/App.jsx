import React from "react";
import Routes from "./router/Routes";
import GlobalStyle from "./GlobalStyle";
import { AuthProvider } from "./components/auth/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes />
    </AuthProvider>
  );
};

export default App;
