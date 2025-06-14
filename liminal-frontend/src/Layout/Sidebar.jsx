import { Link, NavLink } from "react-router-dom";
import useAuth from "../Auth/Hook/useAuth";
import profile from "/assets/profile.png";
import { toast } from "react-toastify";
import { BsFillGridFill } from "react-icons/bs";
import { FaDiagramProject } from "react-icons/fa6";
import {
  FaChartBar,
  FaHome,
  FaSignOutAlt,
  FaTimes,
  FaUserCog,
} from "react-icons/fa";

const Sidebar = () => {
  const { users, logout } = useAuth();

  // handleSignOut
  const handleSignOut = () => {
    logout()
      .then(() => {
        toast.success("Sign Out Successfully");
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-[#f9f9f9] text-base pt-4 shadow-md min-h-screen w-80 px-4">
          {/* close drawer */}
          <label
            htmlFor="my-drawer"
            className="lg:hidden absolute top-4 right-4 drawer-button "
          >
            <FaTimes className="text-2xl hover:text-red-700 cursor-pointer" />
          </label>

          {/* profile info */}
          <div className="pt-12">
            <div className="h-16 w-16 mx-auto p-0.5 border-[#154434] border-2 rounded-full">
              <img
                src={profile}
                className="w-full h-full object-cover rounded-full"
                alt="Photo"
              />
            </div>

            <h2 className="text-2xl font-semibold text-center pt-2">
              {users?.displayName}
            </h2>
            <p className="pb-6 text-center break-words">{users?.email}</p>
          </div>

          {/* navigation */}
          <ul className="space-y-2">
            <li>
              <NavLink to="" end>
                <BsFillGridFill /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="addProject">
                <FaDiagramProject /> Add Project
              </NavLink>
            </li>
            <li>
              <NavLink to="manageProjects">
                <FaChartBar /> Manage Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="manageUsers">
                <FaUserCog /> Manage Users
              </NavLink>
            </li>
          </ul>

          {/* back home */}
          <div className="border-t mt-10 pt-2">
            <li>
              <Link to="/">
                <FaHome /> Back to Home
              </Link>
            </li>

            {/* sign out */}
            <li>
              <button onClick={handleSignOut}>
                <FaSignOutAlt /> Sign Out
              </button>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
