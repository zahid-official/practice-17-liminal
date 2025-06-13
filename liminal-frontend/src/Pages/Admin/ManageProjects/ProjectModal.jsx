/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaPlus, FaTrash } from "react-icons/fa";
import useAxiosPublic from "../../../Auth/Hook/useAxiosPublic";
import { toast } from "react-toastify";

const ProjectModal = ({ projectData, refetchProjects }) => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    clearErrors,
  } = useForm({
    defaultValues: {
      title: projectData?.title || "",
      category: projectData?.category || "",
      status: projectData?.status || "",
      description: projectData?.description || "",
    },
  });

  // axios from useAxiosPublic hook
  const axiosPublic = useAxiosPublic();

  // state to store the selected file
  const [bannerImage, setBannerImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  // state to store the preview URL of the selected
  const [previewBannerImage, setPreviewBannerImage] = useState(null);
  const [previewAdditionalImages, setPreviewAdditionalImages] = useState([]);

  // state for duplicateURL & project uploading
  const [duplicateURLError, setDuplicateURLError] = useState("");
  const [uploading, setUploading] = useState(false);

  // ref to reset input field
  const bannerImageRef = useRef(null);
  const additionalImagesRef = useRef(null);

  // observer for status
  const watchStatus = watch("status");

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
      (item) => item instanceof File
    );
    const defaultValueURLs = additionalImages.filter(
      (item) => typeof item === "string"
    );

    // upload banner image in cloudinary
    let bannerURL = "";
    if (bannerImage) {
      try {
        const bannerForm = new FormData();
        bannerForm.append("bannerImage", bannerImage);
        const bannerRes = await axiosPublic.post(
          "/uploadBannerImage",
          bannerForm,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        bannerURL = bannerRes.data.bannerURL;
      } catch (bannerUploadError) {
        console.error("Banner Image upload failed:", bannerUploadError);
        toast.error("Banner Image upload failed. Please try again.");
      }
    }

    // upload additional images in cloudinary
    let additionalURLs = [];
    if (newlyAddedFiles.length) {
      try {
        const additionalForm = new FormData();
        newlyAddedFiles.forEach((img) =>
          additionalForm.append("additionalImages", img)
        );
        const additionalRes = await axiosPublic.post(
          "/uploadAdditionalImages",
          additionalForm,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        additionalURLs = additionalRes.data.additionalURLs;
      } catch (additionalUploadError) {
        console.error(
          "Additional Images upload failed:",
          additionalUploadError
        );
        toast.error("Additional Images upload failed. Please try again.");
      }
    }

    // prevent duplicate url
    const duplicateURLs = additionalURLs.filter((url) =>
      defaultValueURLs.includes(url)
    );
    if (duplicateURLs.length > 0) {
      setDuplicateURLError(
        "Some images are already exist. Please select different ones"
      );
      setUploading(false);
      return;
    }
    setDuplicateURLError("");

    // Submit project data with uploaded URLs
    try {
      const newAdditionalURLs = [...defaultValueURLs, ...additionalURLs];
      const updatedData = {
        ...formData,
        bannerImage: bannerURL || projectData.bannerImage,
        additionalImages: newAdditionalURLs,
      };

      const res = await axiosPublic.patch(
        `/updateProject/${projectData._id}`,
        updatedData
      );
      if (res.data.modifiedCount) {
        toast.success("Project Updated Successfully");

        // reset states
        setBannerImage(null);
        setPreviewBannerImage(null);
        setAdditionalImages([]);
        setPreviewAdditionalImages([]);

        // form input field
        if (bannerImageRef.current) {
          bannerImageRef.current.value = "";
        }
        if (additionalImagesRef.current) {
          additionalImagesRef.current.value = "";
        }
        reset();

        // refetch project to update UI
        refetchProjects();
      } else {
        setUploading(false);
        toast.warn("No Updating Data Found");
      }
    } catch (projectError) {
      console.error("Project submission failed:", projectError);
      toast.error("Project data submission failed. Please try again.");
    } finally {
      setUploading(false);
    }

    // close modal
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
    if (projectData) {
      reset({
        title: projectData?.title || "",
        category: projectData?.category || "",
        status: projectData?.status || "",
        description: projectData?.description || "",
      });
    }

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
  }, [register, setValue, projectData, clearErrors, reset]);

  // useEffect for description to update it's value based on status
  useEffect(() => {
    if (watchStatus === "Completed") {
      setValue("description", projectData?.description || "");
    } else {
      setValue("description", "");
    }
  }, [watchStatus, projectData?.description, setValue]);

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
                  <option value="Ongoing">Ongoing Project</option>
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

              {/* duplicateURL error */}
              {duplicateURLError && (
                <p className="text-red-600 text-sm pt-2">
                  * <strong>Duplicate image detected:</strong>{" "}
                  {duplicateURLError}
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
