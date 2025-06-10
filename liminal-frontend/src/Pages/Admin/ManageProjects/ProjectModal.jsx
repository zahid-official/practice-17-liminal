/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaPlus, FaTrash } from "react-icons/fa";
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
  const [additionalImages, setAdditionalImages] = useState([]);

  // state to store the preview URL of the selected
  const [previewBannerImage, setPreviewBannerImage] = useState(null);
  const [previewAdditionalImages, setPreviewAdditionalImages] = useState([]);

  // ref to reset input field
  const bannerImageRef = useRef(null);
  const additionalImagesRef = useRef(null);

  // state for project uploading
  const [uploading, setUploading] = useState(false);

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

  // removeBannerImage
  const removeBannerImage = () => {
    if (previewBannerImage) {
      URL.revokeObjectURL(previewBannerImage);
    }
    setBannerImage(null);
    setPreviewBannerImage(null);
    setValue("bannerImage", null, { shouldValidate: true, shouldDirty: true });

    // reset input field
    if (bannerImageRef.current) {
      bannerImageRef.current.value = "";
    }
  };

  // handleAdditionalImages
  const handleAdditionalImages = (event) => {
    const files = Array.from(event.target.files);

    // filter out duplicate files
    const filteredFiles = files.filter(
      (newFile) =>
        !additionalImages.some(
          (existingFile) =>
            existingFile instanceof File &&
            existingFile.name === newFile.name &&
            existingFile.lastModified === newFile.lastModified
        )
    );

    const updatedFiles = [...additionalImages, ...filteredFiles];
    const previewURLs = filteredFiles.map((file) => URL.createObjectURL(file));

    setAdditionalImages(updatedFiles);
    setPreviewAdditionalImages((prev) => [...prev, ...previewURLs]);

    setValue("additionalImages", updatedFiles, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // removeAdditionalImage
  const removeAdditionalImage = (index) => {
    const newFiles = additionalImages.filter((_, idx) => idx !== index);
    const newPreviews = previewAdditionalImages.filter(
      (_, idx) => idx !== index
    );

    // revoke only if it's a File
    if (additionalImages[index] instanceof File) {
      URL.revokeObjectURL(previewAdditionalImages[index]);
    }

    setAdditionalImages(newFiles);
    setPreviewAdditionalImages(newPreviews);
    setValue("additionalImages", newFiles, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // reset input field
    if (additionalImagesRef.current) {
      additionalImagesRef.current.value = "";
    }
  };

  // formSubmit
  const formSubmit = async (formData) => {
    // validation & setLoading
    if (
      (!bannerImage && !projectData?.bannerImage) ||
      !additionalImages?.length
    )
      return;
    setUploading(true);

    // filter files & urls from additionalImages
    const newlyAddedFiles = additionalImages.filter(
      (item) => typeof item === "object"
    );
    const defaultValueURLs = additionalImages.filter(
      (item) => typeof item === "string"
    );

    // imageForm for upload in cloudinary
    const imageForm = new FormData();
    imageForm.append("bannerImage", bannerImage);
    newlyAddedFiles?.forEach((img) =>
      imageForm.append("additionalImages", img)
    );

    try {
      // Step 1: Upload images
      const uploadImagesRes = await axiosPublic.post(
        "/uploadImages",
        imageForm,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { bannerURL, additionalURLs } = uploadImagesRes.data;
      console.log(bannerURL, additionalURLs);
    } catch (uploadError) {
      console.error("Image upload failed:", uploadError);
      toast.error(
        "Image upload failed. Please check your files or connection."
      );
    } finally {
      setUploading(false);
    }

    setUploading(false);
    document.getElementById(`modal_${projectData._id}`).close();
  };

  // useEffect to required bannerImage & additionalImages
  useEffect(() => {
    register("bannerImage", { required: "banner image is required" });

    register("additionalImages", {
      required: "additional images are required",
      validate: (files) =>
        files.length === 5 || "Exactly 5 images are required",
    });

    // set default value
    if (projectData?.bannerImage) {
      setPreviewBannerImage(projectData.bannerImage);
      setValue("bannerImage", projectData.bannerImage);
      clearErrors("bannerImage");
    }

    if (projectData?.additionalImages) {
      setPreviewAdditionalImages(projectData.additionalImages);
      setAdditionalImages(projectData.additionalImages);
      setValue("additionalImages", projectData.additionalImages);
      clearErrors("additionalImages");
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
              </div>

              {errors.bannerImage && (
                <p className="text-red-600 text-sm pt-2">
                  * {errors.bannerImage.message}
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
                  id={`additionalImages${projectData._id}`}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImages}
                  ref={additionalImagesRef}
                />

                <label
                  htmlFor={`additionalImages${projectData._id}`}
                  className="cursor-pointer flex items-center justify-center py-4 bg-gray-100 dark:bg-gray-800 rounded-md"
                >
                  <FaPlus className="mr-2" />
                  <span>Add Images</span>
                </label>

                {previewAdditionalImages.length > 0 && (
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
                          <FaTrash />
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
