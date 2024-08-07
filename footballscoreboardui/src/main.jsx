import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Customerinterface from './features/customer/customerinterface.jsx';
import Operatorinterface from './features/operator/Operatorinterface.jsx';
import { store } from './app/store'
import { Provider } from 'react-redux'
import Matchpredata from './features/operator/Matchpredata.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:"/prematchboard",
        element: <Matchpredata></Matchpredata>
      },
      {
        path:"/customer",
        element: <Customerinterface></Customerinterface>
      },
      {
        path:"/operator",
        element: <Operatorinterface></Operatorinterface>,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  
)
