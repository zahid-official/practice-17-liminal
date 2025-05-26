import { NavLink } from "react-router-dom";
import { FaHome, FaProjectDiagram, FaUserCog, FaChartBar, FaCog } from "react-icons/fa";
import useAuth from "../Auth/Hook/useAuth";

const Sidebar = () => {
  const { users } = useAuth();

  return (
    <div className="p-4">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold">Dashboard</h2>
        {users?.email && (
          <div className="mt-4 flex flex-col items-center">
            <img
              src={users?.photoURL || "https://i.ibb.co/MgsTCcv/avater.jpg"}
              alt="profile"
              className="h-16 w-16 rounded-full object-cover border-2 border-[#154434] dark:border-gray-400"
            />
            <p className="mt-2 font-medium">{users?.displayName || "User"}</p>
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
            <FaHome /> <span>Dashboard Home</span>
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
            <FaProjectDiagram /> <span>Projects</span>
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
            <FaChartBar /> <span>Analytics</span>
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
