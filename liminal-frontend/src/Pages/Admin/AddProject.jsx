import { FaCloudUploadAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";

const AddProject = () => {
  // form handling hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // state to store the selected file
  const [bannerImage, setBannerImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  // state to store the preview URL of the selected
  const [previewBannerImage, setPreviewBannerImage] = useState(null);
  const [previewAdditionalImages, setPreviewAdditionalImages] = useState([]);

  // handleBannerImage
  const handleBannerImage = (event) => {
    const file = event.target.files[0];
    // store the selected file in state
    setBannerImage(file);

    // generate & store a preview URL of the selected image
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewBannerImage(previewUrl);
    }
  };

  // removeBannerImage
  const removeBannerImage = () => {
    if (previewBannerImage) {
      URL.revokeObjectURL(previewBannerImage);
    }
    setBannerImage(null);
    setPreviewBannerImage(null);
    document.getElementById("bannerImage").value = "";
  };

  // handleAdditionalImages
  const handleAdditionalImages = (event) => {
    const files = Array.from(event.target.files);

    // filter out duplicate files
    const filteredFiles = files.filter(
      (newFile) =>
        !additionalImages.some(
          (existingFile) =>
            existingFile.name === newFile.name &&
            existingFile.lastModified === newFile.lastModified
        )
    );

    if (filteredFiles.length === 0) {
      return;
    }

    // store the selected files in state
    setAdditionalImages((prev) => [...prev, ...filteredFiles]);

    // generate & store preview URLs of the selected images
    const previewURLs = filteredFiles.map((file) => URL.createObjectURL(file));
    setPreviewAdditionalImages((prev) => [...prev, ...previewURLs]);
  };

  // removeAdditionalImage
  const removeAdditionalImage = (index) => {
    URL.revokeObjectURL(previewAdditionalImages[index]);
    setAdditionalImages(additionalImages.filter((_, idx) => idx !== index));
    setPreviewAdditionalImages(
      previewAdditionalImages.filter((_, idx) => idx !== index)
    );
  };

  const onSubmit = (formData) => console.log(formData);
  return (
    <div className="container mx-auto py-20 mt-4 max-w-4xl sm:px-10 px-4">
      {/* intro */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Add New Project</h2>
        <p className="py-1">Enter the details to create your new project</p>
      </div>

      {/* form */}
      <div className="card bg-base-100 w-full border mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                  {...register("bannerImage", {
                    required: "banner image is required",
                  })}
                  onChange={handleBannerImage}
                />

                {bannerImage ? (
                  <div className="relative">
                    <img
                      src={previewBannerImage}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded"
                    />
                    <button
                      type="button"
                      onClick={removeBannerImage}
                      className="absolute top-1 right-1 bg-red-500 text-white p-2 rounded-full"
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="bannerImage"
                    className="cursor-pointer flex flex-col items-center justify-center py-6"
                  >
                    <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                    <span className="text-gray-500">
                      Click to upload banner image
                    </span>
                  </label>
                )}
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

            <div className="flex gap-5">
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

              {/*  status */}
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
                className="textarea textarea-md w-full input-bordered"
                rows={4}
                {...register("description", {
                  required: "description is required",
                })}
              ></textarea>
              {errors.description && (
                <p className="text-red-600 text-sm pt-2">
                  * {errors.description.message}
                </p>
              )}
            </div>

            {/* Additional  images */}
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
                  {...register("additionalImages", {
                    required: "additional images are required",
                  })}
                  onChange={handleAdditionalImages}
                />

                <label
                  htmlFor="additionalImages"
                  className="cursor-pointer flex items-center justify-center py-4 bg-gray-100 dark:bg-gray-800 rounded-md"
                >
                  <FaPlus className="mr-2" />
                  <span>Add Images</span>
                </label>

                {additionalImages.length > 0 && (
                  <div className="flex flex-wrap gap-5 pt-5">
                    {previewAdditionalImages.map((previewURL, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={previewURL}
                          className="max-h-32 object-cover rounded"
                          alt={`preview-${idx}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1.5 text-xs rounded-full"
                        >
                          <FaTrash></FaTrash>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {errors.additionalImages && (
                <p className="text-red-600 text-sm pt-2">
                  * {errors.additionalImages.message}
                </p>
              )}
            </div>

            <div>
              <button className="btn bg-[#154434] hover:bg-[#0d2c22] text-white text-base mt-6 w-full">
                Add Project
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
