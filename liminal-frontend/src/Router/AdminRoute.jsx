/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Auth/Hook/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Auth/Hook/useAxiosSecure";

const AdminRoute = ({ children }) => {
  const { users, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (users?.email) {
        try {
          const response = await axiosSecure.get(`/users/admin/${users.email}`);
          setIsAdmin(response.data.isAdmin);
          setIsAdminLoading(false);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdminLoading(false);
        }
      } else {
        setIsAdminLoading(false);
      }
    };

    if (!loading) {
      checkAdminStatus();
    }
  }, [users, loading, axiosSecure]);

  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (users?.email && isAdmin) {
    return children;
  }

  return <Navigate to="/dashboard" state={location?.pathname} />;
};

export default AdminRoute;
