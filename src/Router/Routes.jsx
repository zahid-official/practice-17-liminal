import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Error from "../Pages/Error/Error";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Upcoming1 from "../Pages/Upcoming/Upcoming1";
import Upcoming2 from "../Pages/Upcoming/Upcoming2";
import Upcoming3 from "../Pages/Upcoming/Upcoming3";
import Upcoming4 from "../Pages/Upcoming/Upcoming4";
import Upcoming5 from "../Pages/Upcoming/Upcoming5";
import Projects from "../Pages/Projects/Projects";
import Contact from "../Pages/Contact/Contact";

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
        path: "/projects",
        element: (
          <Projects></Projects>
        ),
      },
      {
        path: "/contact",
        element: (
          <Contact></Contact>
        ),
      },
      {
        path: "/upcoming1",
        element: (
          <Upcoming1></Upcoming1>
        ),
      },
      {
        path: "/upcoming2",
        element: <Upcoming2></Upcoming2>
      },
      {
        path: "/upcoming3",
        element: <Upcoming3></Upcoming3>
      },
      {
        path: "/upcoming4",
        element: <Upcoming4></Upcoming4>
      },
      {
        path: "/upcoming5",
        element: <Upcoming5></Upcoming5>
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
