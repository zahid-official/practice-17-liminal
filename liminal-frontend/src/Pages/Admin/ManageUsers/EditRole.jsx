/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import useAuth from "../../../Auth/Hook/useAuth";
import useAxiosSecure from "../../../Auth/Hook/useAxiosSecure";
import { toast } from "react-toastify";

const EditRole = ({ user, refetch }) => {
  const { users: authUsers } = useAuth();
  const axiosSecure = useAxiosSecure();

  // state for confirm update
  const [confirmUpdate, setConfirmUpdate] = useState({});

  // ref for select input
  const selectRef = useRef();

  // confirmClick
  const confirmClick = (userId) => {
    setConfirmUpdate((prev) => ({
      ...prev,
      [userId]: true,
    }));
  };

  // handleUpdateRole
  const handleUpdateRole = async (id) => {
    const role = selectRef.current.value;
    try {
      const res = await axiosSecure.patch(`/updateUserRole/${id}`, { role });
      if (res.data.modifiedCount) {
        toast.success(`${user.name} has been assigned the ${role} role`);
        refetch();
      } else {
        toast.warn("No update role has been selected");
      }
    } catch (error) {
      console.error("Failed to update role:", error);
    } finally {
      document.getElementById(`confirm_modal-${user?._id}`).close();
    }
  };
  return (
    <div>
      <button
        onClick={() =>
          document.getElementById(`confirm_modal-${user?._id}`).showModal()
        }
        className="btn"
        disabled={authUsers?.email === user?.email}
      >
        Update
      </button>

      {/* modal */}
      <dialog id={`confirm_modal-${user?._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-3xl">Are you absolutely sure?</h3>

          {/* modal content */}
          {confirmUpdate[user._id] ? (
            <>
              <p className="text-base pt-4 pb-2">Update Role Below:</p>
              <select
                defaultValue={user?.role}
                className="select input-bordered text-sm w-44"
                disabled={authUsers?.email === user?.email}
                ref={selectRef}
              >
                <option value={user?.role} disabled>
                  {user?.role}
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </>
          ) : (
            <p className="py-4">
              This action is irreversible. It will update the user role and
              provide access to servers with permissions to modify.
            </p>
          )}

          <div className="flex gap-2 justify-end mt-2">
            {/* confirm buttons */}
            {confirmUpdate[user._id] ? (
              <button
                onClick={() => handleUpdateRole(user._id)}
                className="btn bg-[#174434] hover:bg-[#13382b] text-white"
              >
                Update
              </button>
            ) : (
              <button
                onClick={() => confirmClick(user._id)}
                className="btn bg-[#174434] hover:bg-[#13382b] text-white"
              >
                Yes, Update Role
              </button>
            )}

            {/* cancel button */}
            <form method="dialog">
              <button
                onClick={() =>
                  setConfirmUpdate((prev) => ({
                    ...prev,
                    [user._id]: false,
                  }))
                }
                className="btn"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditRole;
