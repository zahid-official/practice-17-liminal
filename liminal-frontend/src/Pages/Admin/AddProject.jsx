import { useState } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

const AddProject = () => {
  const [bannerPreview, setBannerPreview] = useState(null);
  return (
    <div className="container mx-auto py-20 mt-4 max-w-4xl sm:px-10 px-4">
      {/* intro */}
      <div>
        <h2 className="text-3xl font-semibold">Add New Project</h2>
        <p className="py-1">Enter the details to create your new project</p>
      </div>

      {/* form */}
      <div className="card bg-base-100 w-full border mt-6">
        <div className="card-body">
          <fieldset className="fieldset">

            {/* banner image */}
            <label className="label font-semibold text-xl">Banner Image</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
              <input
                type="file"
                id="bannerImage"
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="bannerImage"
                className="cursor-pointer flex flex-col items-center justify-center py-6"
              >
                <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                <span className="text-gray-500">
                  Click to upload banner image
                </span>
              </label>
            </div>

            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
