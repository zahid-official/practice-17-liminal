import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { users } = useAuth();
  const axiosSecure = useAxiosSecure();

  const email = users?.email;

  // get role
  const { data: role = [], isPending } = useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userRole/${email}`);
      return res.data;
    },
  });

  return { role, isPending };
};

export default useRole;
