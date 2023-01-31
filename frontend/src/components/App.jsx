import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Login from '../routes/LoginPage.jsx';
import NotFound from '../routes/PageNotFound.jsx';
import Root from '../routes/Root.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
