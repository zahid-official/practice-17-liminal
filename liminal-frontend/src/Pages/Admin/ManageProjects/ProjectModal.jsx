import { useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaPlus } from "react-icons/fa";

const ProjectModal = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // observer for status
  const watchStatus = watch("status");

  // formSubmit
  const formSubmit = (formData) => {
    console.log("submit :", formData);
  };
  return (
    <div className="py-4">
      {/* intro */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Update Project</h2>
        <p className="py-1">Enter the details to update your project</p>
      </div>

      {/* form */}
      <div className="card bg-base-100 w-full border mt-6">
        <form onSubmit={handleSubmit(formSubmit)} className="card-body">
          <fieldset className="fieldset space-y-4">
            {/* banner image */}
            <div>
              <label className="label font-semibold text-lg">
                Banner Image
              </label>
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
              {errors.bannerImage && (
                <p className="text-red-600 text-sm pt-2">
                  * {errors.bannerImage.message}
                </p>
              )}
            </div>

            {/* title */}
            <div>
              <label className="label font-semibold text-lg">Title</label>
              <input
                type="text"
                className="input input-bordered w-full text-sm"
                placeholder="Enter project title"
                {...register("title", { required: "title is required" })}
              />
              {errors.title && (
                <p className="text-red-600 text-sm pt-2">
                  * {errors.title.message}
                </p>
              )}
            </div>

            <div className="flex sm:flex-row flex-col gap-5">
              {/* category */}
              <div className="w-full">
                <label className="label font-semibold text-lg">Category</label>
                <input
                  type="text"
                  className="input input-bordered w-full text-sm"
                  placeholder="Enter the category this project belongs to"
                  {...register("category", {
                    required: "category is required",
                  })}
                />
                {errors.category && (
                  <p className="text-red-600 text-sm pt-2">
                    * {errors.category.message}
                  </p>
                )}
              </div>

              {/* status */}
              <div className="w-full">
                <label className="label font-semibold text-lg">Status</label>
                <select
                  defaultValue=""
                  className="select select-md w-full input-bordered text-sm"
                  {...register("status", {
                    required: "status is required",
                  })}
                >
                  <option value="" disabled>
                    Select Current Status
                  </option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>

                {errors.status && (
                  <p className="text-red-600 text-sm pt-2">
                    * {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            {/* description if completed */}
            <div>
              <label className="label font-semibold text-lg">Description</label>
              <textarea
                placeholder="Write a short description about your project"
                className={`textarea textarea-md w-full input-bordered ${
                  watchStatus !== "Completed"
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : ""
                }`}
                rows={4}
                disabled={watchStatus !== "Completed"}
                {...register("description", {
                  validate: (value) => {
                    if (watchStatus === "Completed" && !value) {
                      return "description is required for completed projects";
                    }
                    return true;
                  },
                })}
              />

              {errors.description && (
                <p className="text-red-600 text-sm pt-2">
                  * {errors.description.message}
                </p>
              )}
            </div>

            {/* Additional Images */}
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Additional Images
              </label>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <input
                  type="file"
                  id="additionalImages"
                  className="hidden"
                  accept="image/*"
                  multiple
                />

                <label
                  htmlFor="additionalImages"
                  className="cursor-pointer flex items-center justify-center py-4 bg-gray-100 dark:bg-gray-800 rounded-md"
                >
                  <FaPlus className="mr-2" />
                  <span>Add Images</span>
                </label>
              </div>

              {errors.additionalImages && (
                <p className="text-red-600 text-sm pt-2">
                  * {errors.additionalImages.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div>
              <button className="btn bg-[#154434] hover:bg-[#0d2c22] text-white text-base mt-6 w-full">
                Update Project
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
