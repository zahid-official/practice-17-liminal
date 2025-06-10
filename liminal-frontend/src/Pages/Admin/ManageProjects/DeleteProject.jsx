/* eslint-disable react/prop-types */
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteProject = ({ projectId }) => {
  // handleDelete

  return (
    <div>
      <button
        onClick={() =>
          document.getElementById(`delete_modal-${projectId}`).showModal()
        }
        className="btn text-red-600/90 btn-sm text-xl h-10"
      >
        <FaRegTrashAlt></FaRegTrashAlt>
      </button>

      {/* delete modal */}
      <dialog id={`delete_modal-${projectId}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-3xl">Are you absolutely sure?</h3>
          <p className="py-4">
            This action cannot be undone. This will permanently delete your
            project and remove your data from our servers.
          </p>

          <div className="flex gap-2 justify-end mt-2">
            {/* delete buttons */}
            <button className="btn bg-red-700 hover:bg-red-800 text-white">
              Yes, Delete it!
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

export default DeleteProject;
