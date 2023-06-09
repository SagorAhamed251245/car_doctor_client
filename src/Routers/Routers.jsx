import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SingUp from "../Pages/SIngUp/SingUp";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Bookings from "../Pages/Bookings/Bookings";
import PrivetRoute from "./PrivetRoute";


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
        path: 'checkout/:id',
        element: <PrivetRoute>
          <CheckOut></CheckOut>
        </PrivetRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
      },
      {
        path: 'bookings',
        element: <PrivetRoute>
          <Bookings></Bookings>
        </PrivetRoute>
      }

    ]
  },
]);


export default router