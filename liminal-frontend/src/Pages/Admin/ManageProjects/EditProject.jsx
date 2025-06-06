/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaPen } from "react-icons/fa";

const EditProject = ({ projectId }) => {
  // state for projectData
  const [projectData, setProjectData] = useState({});
  // handleEdit
  const handleEdit = async (id) => {
    const res = await fetch(`http://localhost:5000/projectDetails/${id}`);
    const data = await res.json();
    setProjectData(data);
    document.getElementById(`modal_${id}`).showModal();
  };

  const {
    additionalImages,
    bannerImage,
    category,
    status,
    title,
    description,
    _id,
  } = projectData;

  return (
    <>
      <div>
        <button
          onClick={() => handleEdit(projectId)}
          className="btn text-[#054b32] btn-sm text-xl h-10"
        >
          <FaPen></FaPen>
        </button>
      </div>

      {/* modal */}
      <dialog id={`modal_${projectId}`} className="modal">
        <div className="modal-box">
          {/* close modal */}
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">Modal-{projectId}</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  );
};

export default EditProject;
