import React, { useState, useMemo } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import Login from './routes/LoginPage.jsx';
import NotFound from './routes/PageNotFound.jsx';
import Chat from './routes/ChatPage.jsx';
import AuthContext from '../context/index.js';
import useAuth from '../hook/index.js';

const AuthProvider = ({ children }) => {
  const currentUsername = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUsername);
  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const authServices = useMemo(() => ({ logIn, user }), [user]);

  return (
    <AuthContext.Provider value={authServices}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index="true" element={<Chat />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
