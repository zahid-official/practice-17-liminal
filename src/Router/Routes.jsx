import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Error from "../Pages/Error/Error";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Upcoming1 from "../Pages/Upcoming/Upcoming1";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/about",
        element: (
          <About></About>
        ),
      },
      {
        path: "/route3",
        element: (
          <h1>Route3 Page</h1>
        ),
      },
      {
        path: "/upcoming1",
        element: (
          <Upcoming1></Upcoming1>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default Routes;
