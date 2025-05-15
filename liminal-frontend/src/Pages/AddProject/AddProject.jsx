
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../Auth/Hook/useAxios";
import useAuth from "../../Auth/Hook/useAuth";
import { FaCloudUploadAlt, FaPlus, FaTrash } from "react-icons/fa";

const AddProject = () => {
    const { users } = useAuth();
    const axiosPublic = useAxios();
    const [loading, setLoading] = useState(false);
    const [subImages, setSubImages] = useState([]);
    const [subImagePreviews, setSubImagePreviews] = useState([]);
    const [bannerImage, setBannerImage] = useState(null);
   const [bannerPreview, setBannerPreview] = useState(null);


    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // console.log(bannerPreview)
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        setBannerImage(file) // Store the actual file object, not just the name
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle sub-images
    const handleSubImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setSubImages([...subImages, ...files]);

            // Create previews for the new images
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSubImagePreviews(prev => [...prev, reader.result]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    // Remove sub-image
    const removeSubImage = (index) => {
        setSubImages(subImages.filter((_, i) => i !== index));
        setSubImagePreviews(subImagePreviews.filter((_, i) => i !== index));
    };

    // Form submission
const onSubmit = async (data) => {
    setLoading(true);

    console.log(bannerImage, subImages);

    try {
        let bannerImageUrl = '';
        let subImageUrls = [];

        // 1. Upload banner image
        if (bannerImage) {
            const bannerForm = new FormData();
            bannerForm.append('image', bannerImage);

            const bannerRes = await axiosPublic.post("/upload-single-image", bannerForm, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            bannerImageUrl = bannerRes.data.imageUrl;
        }

        // 2. Upload sub images
        if (subImages.length > 0) {
            const subForm = new FormData();
            subImages.forEach(file => {
                subForm.append('images', file);
            });

            const subRes = await axiosPublic.post('/upload-multiple-images', subForm, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            subImageUrls = subRes.data.imageUrls;
        }

        console.log(bannerImageUrl, subImageUrls);

        // 3. Prepare project data
        const projectData = {
            title: data.title,
            description: data.description,
            status: data.status,
            bannerImage: bannerImageUrl,
            subImages: subImageUrls,
            addedBy: users?.email,
            addedDate: new Date()
        };

        // 4. Save project
        await axiosPublic.post("/projects", projectData);

        toast.success("Project added successfully!");
        reset();
        setBannerPreview(null);
        setSubImages([]);
        setSubImagePreviews([]);
        setBannerImage(null);
    } catch (error) {
        console.error(error);
        toast.error("Failed to add project: " + error.message);
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="w-11/12 max-w-4xl mx-auto py-10">
            <h2 className="text-3xl font-bold mb-8 custom-title">Add New Project</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-[#0a1020] p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                {/* Banner Image */}
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Banner Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                        <input
                            type="file"
                            id="bannerImage"
                            className="hidden"
                            accept="image/*"
                            {...register("bannerImage", { required: "Banner image is required" })}
                            onChange={handleBannerChange}
                        />
                        {bannerPreview ? (
                            <div className="relative">
                                <img
                                    src={bannerPreview}
                                    alt="Banner preview"
                                    className="max-h-64 mx-auto rounded-md"
                                />
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                                    onClick={() => {
                                        setBannerPreview(null);
                                        document.getElementById('bannerImage').value = '';
                                    }}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ) : (
                            <label htmlFor="bannerImage" className="cursor-pointer flex flex-col items-center justify-center py-6">
                                <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                                <span className="text-gray-500">Click to upload banner image</span>
                            </label>
                        )}
                        {errors.bannerImage && (
                            <p className="text-red-500 mt-1">{errors.bannerImage.message}</p>
                        )}
                    </div>
                </div>

                {/* Title */}
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Project Title
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md dark:bg-[#010313] dark:border-gray-700"
                        placeholder="Enter project title"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                        <p className="text-red-500 mt-1">{errors.title.message}</p>
                    )}
                </div>

                {/* Status */}
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Project Status
                    </label>
                    <select
                        className="w-full px-4 py-2 border rounded-md dark:bg-[#010313] dark:border-gray-700"
                        {...register("status", { required: "Status is required" })}
                    >
                        <option value="">Select status</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Upcoming">Upcoming</option>
                    </select>
                    {errors.status && (
                        <p className="text-red-500 mt-1">{errors.status.message}</p>
                    )}
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Project Description
                    </label>
                    <textarea
                        className="w-full px-4 py-2 border rounded-md dark:bg-[#010313] dark:border-gray-700"
                        placeholder="Enter project description"
                        rows="5"
                        {...register("description", { required: "Description is required" })}
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 mt-1">{errors.description.message}</p>
                    )}
                </div>

                {/* Sub Images */}
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Additional Images
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                        <input
                            type="file"
                            id="subImages"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleSubImageChange}
                        />
                        <label htmlFor="subImages" className="cursor-pointer flex items-center justify-center py-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                            <FaPlus className="mr-2" />
                            <span>Add Images</span>
                        </label>

                        {subImagePreviews.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                {subImagePreviews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={preview}
                                            alt={`Sub image ${index + 1}`}
                                            className="h-32 w-full object-cover rounded-md"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                                            onClick={() => removeSubImage(index)}
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                    <button
                        type="submit"
                        className="btn bg-[#154434] hover:bg-[#0d2c22] text-white w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            "Add Project"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProject;