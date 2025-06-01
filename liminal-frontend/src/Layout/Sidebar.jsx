import { NavLink } from "react-router-dom";
import useAuth from "../Auth/Hook/useAuth";
import profile from "/assets/profile.png";
import { BsFillGridFill } from "react-icons/bs";
import { FaDiagramProject } from "react-icons/fa6";
import { FaChartBar, FaUserCog } from "react-icons/fa";

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
        <div className="menu bg-[#f9f9f9] space-y-2 text-base pt-14 shadow-md min-h-screen w-64 p-4">
          {/* profile info */}
          <div>
            <div className="h-16 w-16 mx-auto p-0.5 border-[#154434] border-2 rounded-full">
              <img
                src={users?.photoURL || profile}
                className="w-full h-full object-cover rounded-full"
                alt=""
              />
            </div>
            <h2 className="text-2xl font-semibold text-center pt-2 pb-5">
              {users?.displayName}
            </h2>
          </div>

          {/* navigation */}
          <ul>
            <li>
              <NavLink to="">
                <BsFillGridFill /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="addProject">
                <FaDiagramProject /> Add Project
              </NavLink>
            </li>
            <li>
              <NavLink to="/manageProjects">
                <FaChartBar /> Manage Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/manageUsers">
                <FaUserCog /> Manage Users
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
