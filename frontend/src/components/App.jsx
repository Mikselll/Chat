import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import Login from './LoginPage.jsx';
import Signup from './SignupPage.jsx';
import NotFound from './PageNotFound.jsx';
import Chat from './ChatPage.jsx';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.chatPagePath()} element={<PrivateRoute />}>
        <Route index="true" element={<Chat />} />
      </Route>
      <Route path={routes.loginPagePath()} element={<Login />} />
      <Route path={routes.signupPagePath()} element={<Signup />} />
      <Route path={routes.substitutionPath()} element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
