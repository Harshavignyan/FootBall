import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Customerinterface from './features/customer/customerinterface.jsx';
import Operatorinterface from './features/operator/Operatorinterface.jsx';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Matchpredata from './features/operator/Matchpredata.jsx';
import { ThemeProvider } from './features/theme/ThemeContext';
import Login from './features/login/login.jsx';
import Signup from './features/signup/Signup.jsx';
import Dashboard from './features/dashboard/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/prematchboard',
        element: <Matchpredata />,
      },
      {
        path: '/customer',
        element: <Customerinterface />,
      },
      {
        path: '/operator',
        element: <Operatorinterface />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />, // Add this line to include the Signup route
      },
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>, // Add this line to include the Signup route
      },
      {
        path: '/dashboard/signup',
        element: <Signup></Signup>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
