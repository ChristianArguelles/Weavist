import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const raw = localStorage.getItem('weavist_auth');
    if(raw) setUser(JSON.parse(raw));
  },[]);

  const login = (userObj, token) => {
    const store = {...userObj, token};
    localStorage.setItem('weavist_auth', JSON.stringify(store));
    localStorage.setItem('weavist_token', token);
    setUser(store);
  };

  const logout = () => {
    localStorage.removeItem('weavist_auth');
    localStorage.removeItem('weavist_token');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
