import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './componnent/Layout/Layout';
import Home from './componnent/Home/Home';
import Register from './componnent/Register/Register';
import Login from './componnent/Login/Login';
import ProdectedRoute from './componnent/ProdectedRoute/ProdectedRoute';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './componnent/ForgetPassword/ForgetPassword';

function App() {
     const router = createBrowserRouter([
    {
      path:"",element:<Layout />,children:[
        {index:true , element:<ProdectedRoute><Home /></ProdectedRoute>},
        {path:"home" , element:<ProdectedRoute><Home /></ProdectedRoute>},
        {path:"register" , element:<Register />},
        {path:"login" , element:<Login />},
        {path:"forgotPassword" , element:<ForgotPassword />},
      ]
    }
  ])


  return (

<>    <RouterProvider router={router} />
    <Toaster />
  </>
  
  )
}

export default App
