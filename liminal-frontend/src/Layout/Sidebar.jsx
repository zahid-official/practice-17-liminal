import { Link, NavLink } from "react-router-dom";
import useAuth from "../Auth/Hook/useAuth";
import profile from "/assets/profile.png";
import { BsFillGridFill } from "react-icons/bs";
import { FaDiagramProject } from "react-icons/fa6";
import { FaChartBar, FaHome, FaTimes, FaUserCog } from "react-icons/fa";

const Sidebar = () => {
  const { users } = useAuth();
  return (
    <>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-[#f9f9f9] text-base pt-4 shadow-md min-h-screen w-72 px-4">
          {/* close drawer */}
           <label htmlFor="my-drawer" className="lg:hidden absolute top-4 right-4 drawer-button ">
            <FaTimes className="text-2xl hover:text-red-700 cursor-pointer"/>
          </label>

          {/* profile info */}
          <div className="pt-12">
            <div className="h-16 w-16 mx-auto p-0.5 border-[#154434] border-2 rounded-full">
              <img
                src={users?.photoURL || profile}
                className="w-full h-full object-cover rounded-full"
                alt=""
              />
            </div>

            <h2 className="text-2xl font-semibold text-center pt-2 pb-6">
              {users?.displayName}
            </h2>
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
                <FaHome /> Manage Users
              </Link>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
