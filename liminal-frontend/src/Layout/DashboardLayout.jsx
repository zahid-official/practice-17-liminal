import { Outlet } from "react-router-dom";
import Sidebar from "../Shared/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="duration-500 dark:bg-[#010313] dark:text-white">
      <main className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-[#f9f9f9] dark:bg-[#0a1020] min-h-screen shadow-md">
          <Sidebar></Sidebar>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
