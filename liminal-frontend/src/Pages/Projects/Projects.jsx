import { Link, useLoaderData } from "react-router-dom";

const Projects = () => {
  const projects = useLoaderData();
  return (
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-32 grid grid-cols-3 gap-x-10 gap-y-28">
      {projects?.map((project) => (
        <Link to={`/projectDetails/${project._id}`} className="min-h-[57vh] w-full" key={project._id}>
          <img
            src={project.bannerImage}
            className="h-full w-full object-cover"
            alt={`Image of ${project.title}`}
          />
          <h3 className="text-lg pt-3">{project.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default Projects;