/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import axios from "axios";
import useAxios from "../../../Auth/Hook/useAxios";
import { toast } from "react-toastify";

const ProjectModal = ({ projectData }) => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm();

  // axios from useAxios hook
  const axiosPublic = useAxios();

  // state to store the selected file
  const [bannerImage, setBannerImage] = useState(null);

  // state to store the preview URL of the selected
  const [previewBannerImage, setPreviewBannerImage] = useState(null);

  // state for project uploading
  const [uploading, setUploading] = useState(false);

  // ref to reset input field
  const bannerImageRef = useRef(null);

  // handleBannerImage
  const handleBannerImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setBannerImage(file);
    setPreviewBannerImage(URL.createObjectURL(file));
    setValue("bannerImage", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  console.log("banner ", bannerImage);
  console.log("preview ", previewBannerImage);

  // removeBannerImage
  const removeBannerImage = () => {
    if (previewBannerImage) {
      URL.revokeObjectURL(previewBannerImage);
    }
    setBannerImage(null);
    setPreviewBannerImage(null);
    setValue("bannerImage", null, { shouldValidate: true });

    // reset input field
    if (bannerImageRef.current) {
      bannerImageRef.current.value = "";
    }
  };

  // formSubmit
  const formSubmit = async (formData) => {
    // validation & setLoading
    if (!bannerImage && !projectData.bannerImage) return;
    setUploading(true);

    // uploading bannerImage in cloudinary
    let bannerURL = "";
    if (bannerImage) {
      try {
        const bannerForm = new FormData();
        bannerForm.append("file", bannerImage);
        bannerForm.append("upload_preset", "liminal");
        const bannerRes = await axios.post(
          "https://api.cloudinary.com/v1_1/drgjpteya/image/upload",
          bannerForm
        );
        bannerURL = bannerRes.data.secure_url;
      } catch (error) {
        console.error("Banner upload failed:", error);
        toast.error("Banner upload failed. Please try again.");
        setUploading(false);
        return;
      }
    }

    // updatedData
    const updatedData = {
      ...formData,
      bannerImage: bannerURL || projectData.bannerImage,
    };

    // send project data to backend via addProject API
    try {
      const res = await axiosPublic.patch(
        `/updateProject/${projectData._id}`,
        updatedData
      );
      if (res.data.modifiedCount) {
        setUploading(false);
        toast.success("Project Added Successfully");

        // reset states
        setBannerImage(null);
        setPreviewBannerImage(null);

        // form input field
        if (bannerImageRef.current) {
          bannerImageRef.current.value = "";
        }
        reset();
      } else {
        setUploading(false);
        toast.warn("No Updating Data Found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add project. Please try again.");
      setUploading(false);
    }

    // close modal
    document.getElementById(`modal_${projectData._id}`).close();
  };

  // useEffect to required bannerImage & additionalImages
  useEffect(() => {
    register("bannerImage", { required: "banner image is required" });

    // set default value
    if (projectData?.bannerImage) {
      setPreviewBannerImage(projectData.bannerImage);
      setValue("bannerImage", projectData.bannerImage);
      clearErrors("bannerImage");
    }
  }, [register, setValue, projectData, clearErrors]);

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
                  id={`bannerImage_${projectData._id}`}
                  accept="image/*"
                  className="hidden"
                  onChange={handleBannerImage}
                  ref={bannerImageRef}
                />

                {/* banner preview */}
                <>
                  {previewBannerImage ? (
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
                      htmlFor={`bannerImage_${projectData._id}`}
                      className="cursor-pointer flex flex-col items-center justify-center py-6"
                    >
                      <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                      <span className="text-gray-500">
                        Click to upload banner image
                      </span>
                    </label>
                  )}
                </>
              </div>

              {errors.bannerImage && (
                <p className="text-red-600 text-sm pt-2">
                  * {errors.bannerImage.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div>
              <button
                disabled={uploading}
                className="btn bg-[#154434] hover:bg-[#0d2c22] text-white text-base mt-6 w-full"
              >
                {uploading ? (
                  <>
                    Uploading
                    <span className="loading loading-spinner loading-md"></span>
                  </>
                ) : (
                  "Update Project"
                )}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
