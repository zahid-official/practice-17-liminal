import { Link, useLoaderData } from "react-router-dom";

const ProjectDetails = () => {
  const projectDetails = useLoaderData();
  const {
    title,
    category,
    status,
    description,
    bannerImage,
    additionalImages,
  } = projectDetails || {};
  return (
    <>
      {/* banner */}
      <div className="lg:w-10/12 sm:w-11/12 mx-auto px-3 pt-3">
        <div>
          <img src={bannerImage} alt={`Image of ${title}`} />
        </div>

        {/* overlay */}
        <div className="sm:flex justify-end sm:-mt-14 mb-8 sm:translate-x-10">
          <div className="bg-[#154434] text-white sm:inline-block p-5 sm:pr-20">
            <p className="sm:text-xl">{category}</p>
            <h2 className="sm:text-2xl text-xl">{title}</h2>
          </div>
        </div>
      </div>

      {/* status */}
      <div className="container mx-auto px-3 text-right">
        <p className="text-xl">
          <b>Status:</b> {status}
        </p>
        <p className="max-w-[50%] text-right ml-auto pt-5">{description}</p>
        <Link to={'/projects'}>
          <button className="btn rounded-full border-2 border-[#1544348e] text-[#154434] my-9">
            Back to Project
          </button>
        </Link>
      </div>

      {/* gallery */}
      <div className="grid md:grid-cols-2 container mx-auto gap-6 px-3 pb-28">
        {/* Left Column (first two images) */}
        <div className="space-y-6 md:sticky top-0 self-start md:mb-0 mb-6">
          {additionalImages.slice(0, 2).map((src, index) => (
            <img key={index} src={src} alt={`Image ${index + 1}`} />
          ))}
        </div>

        {/* Right Column (rest of the images) */}
        <div className="space-y-6">
          {additionalImages.slice(1).map((src, index) => (
            <img key={index + 2} src={src} alt={`Image ${index + 3}`} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
