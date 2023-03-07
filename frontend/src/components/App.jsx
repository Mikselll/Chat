import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import Login from './LoginPage.jsx';
import Signup from './SignupPage.jsx';
import NotFound from './PageNotFound.jsx';
import Chat from './ChatPage.jsx';
import { useAuth } from '../hooks/index.js';

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route index="true" element={<Chat />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
