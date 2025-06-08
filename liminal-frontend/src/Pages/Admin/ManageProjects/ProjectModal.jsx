/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

const ProjectModal = ({ projectData }) => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // state to store the selected file
  const [bannerImage, setBannerImage] = useState(null);

  // state to store the preview URL of the selected
  const [previewBannerImage, setPreviewBannerImage] = useState(null);

  // handleBannerImage
  const handleBannerImage = (event) => {
    const file = event.target.files[0];

    if (!file) return;
    setBannerImage(file);
    setPreviewBannerImage(URL.createObjectURL(file));
    setValue("bannerImage", file, { shouldValidate: true });
  };

  // removeBannerImage
  const removeBannerImage = () => {
    if (previewBannerImage) {
      URL.revokeObjectURL(previewBannerImage);
    }
    setBannerImage(null);
    setPreviewBannerImage(null);
    setValue("bannerImage", null, { shouldValidate: true });

    document.getElementById("bannerImage").value = "";
  };

  // formSubmit
  const formSubmit = (formData) => {
    console.log("submit :", formData);

    // after submit
    reset();
    setBannerImage(null);
    setPreviewBannerImage(null);
    document.getElementById(`bannerImage`).value = "";

    // close modal
    document.getElementById(`modal_${projectData._id}`).close();
  };

  // useEffect to required bannerImage & additionalImages
  useEffect(() => {
    register("bannerImage", { required: "banner image is required" });
  }, [register]);

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
                      <FaTrash />
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
