import { NavLink } from "react-router-dom";
import { FaHome, FaProjectDiagram, FaUserCog, FaChartBar, FaCog } from "react-icons/fa";
import useAuth from "../Auth/Hook/useAuth";

const Sidebar = () => {
  const { users } = useAuth();

  return (
    <div className="p-4">
      <div className="mb-6 text-center">
        {users?.email && (
          <div className="pt-10 flex flex-col items-center">
            <img
              src={users?.photoURL || "https://i.ibb.co/MgsTCcv/avater.jpg"}
              alt="profile"
              className="h-16 w-16 rounded-full object-cover border-2 border-[#154434] dark:border-gray-400"
            />
            <h2 className="mt-2 text-2xl font-semibold">{users?.displayName || "User"}</h2>
          </div>
        )}
      </div>

      <ul className="space-y-2">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive
                  ? "bg-[#154434] text-white dark:bg-slate-700"
                  : "hover:bg-gray-200 dark:hover:bg-slate-800"
              }`
            }
            end
          >
            <FaHome /> <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/projects"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive
                  ? "bg-[#154434] text-white dark:bg-slate-700"
                  : "hover:bg-gray-200 dark:hover:bg-slate-800"
              }`
            }
          >
            <FaProjectDiagram /> <span>Add Project</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive
                  ? "bg-[#154434] text-white dark:bg-slate-700"
                  : "hover:bg-gray-200 dark:hover:bg-slate-800"
              }`
            }
          >
            <FaChartBar /> <span>Manage Projects</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive
                  ? "bg-[#154434] text-white dark:bg-slate-700"
                  : "hover:bg-gray-200 dark:hover:bg-slate-800"
              }`
            }
          >
            <FaUserCog /> <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive
                  ? "bg-[#154434] text-white dark:bg-slate-700"
                  : "hover:bg-gray-200 dark:hover:bg-slate-800"
              }`
            }
          >
            <FaCog /> <span>Settings</span>
          </NavLink>
        </li>
      </ul>

      <div className="mt-8 pt-4 border-t border-gray-300 dark:border-gray-700">
        <NavLink
          to="/"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800"
        >
          <span>Back to Home</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
