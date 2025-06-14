import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Error from "../Pages/Error/Error";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Projects from "../Pages/Projects/Projects";
import Contact from "../Pages/Contact/Contact";
import PrivateRouter from "./PrivateRouter";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Pages/Admin/Dashboard";
import AddProject from "../Pages/Admin/AddProject";
import ProjectDetails from "../Pages/Projects/ProjectDetails";
import ManageProjects from "../Pages/Admin/ManageProjects/ManageProjects";
import AdminRouter from "./AdminRouter";
import ManageUsers from "../Pages/Admin/ManageUsers/ManageUsers";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/projects",
        element: <Projects></Projects>,
        loader: () => fetch("https://liminal-server.vercel.app/projects"),
      },
      {
        path: "/projectDetails/:id",
        element: <ProjectDetails></ProjectDetails>,
        loader: ({ params }) =>
          fetch(`https://liminal-server.vercel.app/projectDetails/${params.id}`),
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
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
  {
    path: "adminPanel",
    element: (
      <PrivateRouter>
        <AdminRouter>
          <DashboardLayout></DashboardLayout>
        </AdminRouter>
      </PrivateRouter>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "",
        element: (
          <AdminRouter>
            <Dashboard></Dashboard>
          </AdminRouter>
        ),
      },
      {
        path: "addProject",
        element: (
          <AdminRouter>
            <AddProject></AddProject>
          </AdminRouter>
        ),
      },
      {
        path: "manageProjects",
        element: (
          <AdminRouter>
            <ManageProjects></ManageProjects>
          </AdminRouter>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRouter>
            <ManageUsers></ManageUsers>
          </AdminRouter>
        ),
      },
    ],
  },
]);

export default Routes;
