import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: localStorage.getItem("fosterToken") || null,
  });

  const login = (payload) => {
    setAuth({ isAuthenticated: payload });
    localStorage.setItem("fosterToken", payload);
  };

  const logout = () => {
    setAuth({ isAuthenticated: null });
    localStorage.removeItem("fosterToken");
  };
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
