import React from "react";
import Routes from "./router/Routes";
import GlobalStyle from "./GlobalStyle";
import { AuthProvider } from "./auth/AuthProvider";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
        <AuthProvider>
          <GlobalStyle />
          <Routes />
        </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
