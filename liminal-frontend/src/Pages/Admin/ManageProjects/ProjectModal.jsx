/* eslint-disable react/prop-types */

import { FaCloudUploadAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import useAxios from "../../../Auth/Hook/useAxios";
import { toast } from "react-toastify";

const ProjectModal = ({ projectData }) => {
  // set default values for form inputs using useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      title: projectData?.title || "",
      category: projectData?.category || "",
      status: projectData?.status || "",
      description: projectData?.description || "",
    },
  });

  const axiosPublic = useAxios();

  // state for bannerImage & additionalImages with default values
  const [bannerImage, setBannerImage] = useState(
    projectData?.bannerImage || null
  );
  const [additionalImages, setAdditionalImages] = useState(
    projectData?.additionalImages || []
  );

  // state for previewBannerImage & previewAdditionalImages with default values
  const [previewBannerImage, setPreviewBannerImage] = useState(
    projectData?.bannerImage || null
  );
  const [previewAdditionalImages, setPreviewAdditionalImages] = useState(
    projectData?.additionalImages || []
  );

  // state for project uploading
  const [uploading, setUploading] = useState(false);

  // observer for status
  const watchStatus = watch("status");

  // handleBannerImage
  const handleBannerImage = (event) => {
    const file = event.target.files[0];
    setBannerImage(file);

    // Revoke old URL when a new file is uploaded
    if (previewBannerImage && typeof previewBannerImage !== "string") {
      URL.revokeObjectURL(previewBannerImage);
    }

    setPreviewBannerImage(URL.createObjectURL(file));
    setValue("bannerImage", file, { shouldValidate: true });
  };

  // removeBannerImage
  const removeBannerImage = () => {
    if (previewBannerImage && typeof previewBannerImage !== "string") {
      URL.revokeObjectURL(previewBannerImage);
    }
    setBannerImage(null);
    setPreviewBannerImage(null);
    setValue("bannerImage", null, { shouldValidate: true });

    document.getElementById("bannerImage").value = "";
  };

  // handleAdditionalImages - নতুন ফাইলগুলো যোগ করবে
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

    const updatedFiles = [...additionalImages, ...filteredFiles];
    setAdditionalImages(updatedFiles);
    setValue("additionalImages", updatedFiles, { shouldValidate: true });

    // generate & store preview URLs of the selected images
    const previewURLs = filteredFiles.map((file) => URL.createObjectURL(file));
    setPreviewAdditionalImages((prev) => [...prev, ...previewURLs]);
  };

  // removeAdditionalImage
  const removeAdditionalImage = (index) => {
    if (
      previewAdditionalImages[index] &&
      typeof previewAdditionalImages[index] !== "string"
    ) {
      URL.revokeObjectURL(previewAdditionalImages[index]);
    }

    const newFiles = additionalImages.filter((_, idx) => idx !== index);
    const newPreviews = previewAdditionalImages.filter(
      (_, idx) => idx !== index
    );

    setAdditionalImages(newFiles);
    setPreviewAdditionalImages(newPreviews);
    setValue("additionalImages", newFiles, { shouldValidate: true });
  };

  // onSubmit
  const onSubmit = async (formData) => {
    // validation & setLoading
    if (!bannerImage || !additionalImages.length) return;
    setUploading(true);

    // uploading bannerImage in cloudinary
    let bannerURL = "";
    try {
      // Use old URL if present; else upload new file to Cloudinary
      if (typeof bannerImage === "string") {
        bannerURL = bannerImage;
      } else {
        const bannerForm = new FormData();
        bannerForm.append("file", bannerImage);
        bannerForm.append("upload_preset", "liminal");
        const bannerRes = await axios.post(
          "https://api.cloudinary.com/v1_1/drgjpteya/image/upload",
          bannerForm
        );
        bannerURL = bannerRes.data.secure_url;
      }
    } catch (error) {
      console.error("Banner upload failed:", error);
      toast.error("Banner upload failed. Please try again.");
      setUploading(false);
      return;
    }

    // uploading additionalImages in cloudinary
    let additionalURLs = [];
    try {
      // If it's a string, assume it's an old URL; if it's a file, upload it in cloudinary
      if (typeof additionalImages[0] === "string") {
        additionalURLs = additionalImages;
      } else {
        const uploadPromises = additionalImages.map((image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "liminal");

          return axios.post(
            "https://api.cloudinary.com/v1_1/drgjpteya/image/upload",
            formData
          );
        });

        const responses = await Promise.all(uploadPromises);
        additionalURLs = responses.map((res) => res.data.secure_url);
      }
    } catch (error) {
      console.error("Additional image upload failed:", error);
      toast.error("Additional images upload failed. Please try again.");
      setUploading(false);
      return;
    }

    // updated data
    const updatedData = {
      ...formData,
      bannerImage: bannerURL,
      additionalImages: additionalURLs,
    };

    // send updated data to backend via updateProject-(dynamic) API
    try {
      const res = await axiosPublic.patch(
        `/updateProject/${projectData._id}`,
        updatedData
      );
      if (res.data.modifiedCount) {
        setUploading(false);
        toast.success("Project Updated Successfully");

        // reset states & form
        setBannerImage(null);
        setPreviewBannerImage(null);
        setAdditionalImages([]);
        setPreviewAdditionalImages([]);
        document.getElementById("bannerImage").value = "";
        document.getElementById("additionalImages").value = "";
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update project. Please try again.");
      setUploading(false);
    }
  };

  // useEffect to initialize form fields & image previews using existing project data
  useEffect(() => {
    if (projectData) {
      reset({
        title: projectData.title || "",
        category: projectData.category || "",
        status: projectData.status || "",
        description: projectData.description || "",
      });

      setBannerImage(projectData.bannerImage || null);
      setPreviewBannerImage(projectData.bannerImage || null);

      setAdditionalImages(projectData.additionalImages || []);
      setPreviewAdditionalImages(projectData.additionalImages || []);
    }
  }, [projectData, reset]);

  // useEffect to required bannerImage & additionalImages
  useEffect(() => {
    register("bannerImage", { required: "banner image is required" });

    register("additionalImages", {
      required: "additional images are required",
      validate: (files) =>
        files.length === 4 || "Exactly 4 images are required",
    });

    if (watchStatus !== "Completed") {
      clearErrors("description");
      setValue("description", "");
    }
  }, [register, watchStatus, setValue, clearErrors]);

  return (
    <div className="">
      {/* intro */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Update Project Details</h2>
        <p className="py-1">Enter the details to update your project</p>
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
