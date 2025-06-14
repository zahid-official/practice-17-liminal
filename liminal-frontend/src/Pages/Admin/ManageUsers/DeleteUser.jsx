/* eslint-disable react/prop-types */

import { useState } from "react";
import useAxiosSecure from "../../../Auth/Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteUser = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();

  // state for deleting
  const [deleting, setDeleting] = useState(false);

  // handleDelete
  const handleDelete = async (id) => {
    setDeleting(true);

    try {
      const res = await axiosSecure.delete(`/deleteUser/${id}`);
      if (res.data.deletedCount) {
        toast.success("Project Deleted Successfully");
        refetch();
      }
    } catch (error) {
      console.error("Failed to Delete project:", error);
      toast.error("Failed to Delete project. Please try again.");
    } finally {
      setDeleting(false);
      document.getElementById(`delete_modal-${id}`).close();
    }
  };
  return (
    <div>
      <button
        onClick={() =>
          document.getElementById(`delete_modal-${user?._id}`).showModal()
        }
        className="btn text-red-600/90 btn-sm text-xl h-10"
      >
        <FaRegTrashAlt></FaRegTrashAlt>
      </button>

      {/* delete modal */}
      <dialog id={`delete_modal-${user?._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-3xl">Are you absolutely sure?</h3>
          <p className="py-4">
            This action cannot be undone. This will permanently delete the user
            and remove the data from our servers.
          </p>

          <div className="flex gap-2 justify-end mt-2">
            {/* delete buttons */}
            <button
              disabled={deleting}
              onClick={() => handleDelete(user?._id)}
              className="btn bg-red-700 hover:bg-red-800 text-white"
            >
              {deleting ? (
                <>
                  Deleting
                  <span className="loading loading-spinner loading-md"></span>
                </>
              ) : (
                "Yes, Delete it!"
              )}
            </button>

            {/* cancel button */}
            <form method="dialog">
              <button className="btn bg-[#174434] hover:bg-[#13382b] text-white">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteUser;
