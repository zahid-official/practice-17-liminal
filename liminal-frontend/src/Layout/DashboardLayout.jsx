import { Outlet } from "react-router-dom";
import Sidebar from "../Shared/Sidebar";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const DashboardLayout = () => {
  return (
    <div className="duration-500 dark:bg-[#010313] dark:text-white">
      <header>
        <Navbar></Navbar>
      </header>

      <main className="min-h-[80vh] flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#f9f9f9] dark:bg-[#0a1020] min-h-[80vh] shadow-md">
          <Sidebar></Sidebar>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <Outlet></Outlet>
        </div>
      </main>

      <footer className="bg-[#f9f9f9] dark:bg-[#0a1020]">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default DashboardLayout;
