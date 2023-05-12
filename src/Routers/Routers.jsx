import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SingUp from "../Pages/SIngUp/SingUp";
import CheckOut from "../Pages/CheckOut/CheckOut";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'singup',
        element: <SingUp></SingUp>
      },
      {
        path:'checkout/:id',
        element: <CheckOut></CheckOut>,
        loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
      }
     
    ]
  },
]);


export default router