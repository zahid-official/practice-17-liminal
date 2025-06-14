import {
  FaChartLine,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import useAuth from "../../Auth/Hook/useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Auth/Hook/useAxiosSecure";

const Dashboard = () => {
  const { users } = useAuth();
  const axiosSecure = useAxiosSecure();

  // state for projectsData
  const [projectsData, setProjectsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]);

  const ongoing = projectsData.filter(
    (project) => project.status === "Ongoing"
  );

  const completed = projectsData.filter(
    (project) => project.status === "Completed"
  );

  // stats for the dashboard
  const stats = [
    {
      id: 1,
      title: "Total Projects",
      value: projectsData.length,
      icon: <FaProjectDiagram className="text-blue-500" size={24} />,
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      title: "Ongoing Projects",
      value: ongoing.length,
      icon: <FaChartLine className="text-purple-500" size={24} />,
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 3,
      title: "Completed Projects",
      value: completed.length,
      icon: <FaTasks className="text-orange-500" size={24} />,
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      id: 4,
      title: "Total Users",
      value: usersData.length,
      icon: <FaUsers className="text-green-500" size={24} />,
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
  ];

  // useEffect for projectsData
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axiosSecure.get("/manageProjects");
      setProjectsData(res.data);
    };

    const fetchUsers = async () => {
      const res = await axiosSecure.get("/manageUsers");
      setUsersData(res.data);
    };

    const fetchLatestProjects = async () => {
      const res = await axiosSecure.get("/latestProjects");
      setLatestProjects(res.data);
    };

    fetchProjects();
    fetchUsers();
    fetchLatestProjects();
  }, [axiosSecure]);

  return (
    <div className="container mx-auto py-16 mt-4 sm:px-10 px-4">
      {/* intro */}
      <div>
        <h2 className="text-3xl font-semibold">Dashboard</h2>
        <p className="py-1">Welcome Back, {users?.displayName}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 mb-8 mt-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`${stat.bgColor} p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white dark:bg-[#0a1020] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Added Projects</h2>
        <div className="space-y-4">
          {latestProjects?.map((project) => (
            <div
              key={project?._id}
              className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="w-2 h-2 mt-2 rounded-full bg-[#154434]"></div>
              <div>
                <p className="font-medium">{project?.title}</p>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Status: {project?.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-[#0a1020] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="addProject">
            <button className="btn w-full bg-[#154434] hover:bg-[#0d2c22] text-white">
              Add New Project
            </button>
          </Link>

          <Link to="manageProjects">
            <button className="btn w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
              Manage Project
            </button>
          </Link>

          <Link to="manageUsers">
            <button className="btn w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
              Manage Users
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
