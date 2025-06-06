import { FaRegTrashAlt } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import EditProject from "./EditProject";

const ManageProjects = () => {
  const projects = useLoaderData();
  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-36 grid grid-cols-3 gap-x-10 gap-y-32">
      {projects?.map((project) => (
        <div className="min-h-[57vh] w-full" key={project._id}>
          <img
            src={project.bannerImage}
            className="h-full w-full object-cover"
            alt={`Image of ${project.title}`}
          />
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="text-lg pt-3">{project.title}</h3>

            <div className="flex gap-2 pt-3">
              {/* edit button */}
              <EditProject projectId={project._id}></EditProject>

              {/* delete button */}
              <button className="btn text-red-600/90 btn-sm text-xl h-10">
                <FaRegTrashAlt></FaRegTrashAlt>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageProjects;
