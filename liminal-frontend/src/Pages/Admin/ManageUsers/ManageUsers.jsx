import useAxiosSecure from "../../../Auth/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import EditRole from "./EditRole";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // fetch all projects
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manageUsers");
      return res.data;
    },
  });

  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-w-6xl mx-auto mt-32">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-300 text-base">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Update Role</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user, idx) => (
              <tr key={user._id} className="hover:bg-base-200">
                <th>{idx + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>

                {/* update role */}
                <td>
                  <EditRole user={user} refetch={refetch}></EditRole>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
