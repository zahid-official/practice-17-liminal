import {
  FaChartLine,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import useAuth from "../../Auth/Hook/useAuth";

const Dashboard = () => {
  const { users } = useAuth();

  // Dummy stats for the dashboard
  const stats = [
    {
      id: 1,
      title: "Total Projects",
      value: "24",
      icon: <FaProjectDiagram className="text-blue-500" size={24} />,
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      title: "Active Clients",
      value: "18",
      icon: <FaUsers className="text-green-500" size={24} />,
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 3,
      title: "Revenue Growth",
      value: "+32%",
      icon: <FaChartLine className="text-purple-500" size={24} />,
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 4,
      title: "Pending Tasks",
      value: "7",
      icon: <FaTasks className="text-orange-500" size={24} />,
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
  ];
  return (
    <div className="container mx-auto py-24 px-6">
      {/* intro */}
      <div>
        <h2 className="text-3xl font-semibold">Dashboard</h2>
        <p className="py-2">Welcome Back, {users?.displayName}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-5">
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
    </div>
  );
};

export default Dashboard;
