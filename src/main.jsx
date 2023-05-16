import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './component/Shop/Shop';
import Home from './component/Home/Home';
import Orders from './component/Orders/Orders';
import Inventor from './component/Inventor/Inventor';
import Login from './component/Login/Login';
import cartProductsLoader from './Loaders/CartProductsLoader';
import CheckOut from './component/Checkout/CheckOut';
import SignUp from './component/SignUp/SignUp';
import AuthProvider from './component/Provider/AuthProvider';
import PrivateRoute from './component/PrivateRoute';

const router = createBrowserRouter([
  {path: '/',
  element: <Home></Home>,
  children: [
    {
      path: 'shop',
      element: <Shop></Shop>,
      loader: () => fetch('http://localhost:5000/totalProducts')
    },
    {
      path: 'orders',
      element: <Orders></Orders>,
      loader: cartProductsLoader
    },
    {
      path: 'inventor',
      element: <PrivateRoute><Inventor></Inventor></PrivateRoute>
    },
    {
      path: 'login',
      element: <Login></Login>
    },
    {
      path: 'signup',
      element: <SignUp></SignUp>
    },
    {
      path: 'checkout',
      element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>
    }
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <AuthProvider>
        <RouterProvider router={router} />
        </AuthProvider>
  </React.StrictMode>,
)
