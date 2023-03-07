import React, { useState, useMemo } from 'react';
import { AuthContext } from '../contexts/index.js';

const AuthProvider = ({ children }) => {
  const currentUsername = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUsername);

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => ({ Authorization: `Bearer ${user.token}` });

  const authServices = useMemo(() => ({
    logIn, logOut, getAuthHeader, user,
  }), [user]);

  return (
    <AuthContext.Provider value={authServices}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
