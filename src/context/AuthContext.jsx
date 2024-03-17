import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);

  const authContextValue = { showLogin, setShowLogin };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
