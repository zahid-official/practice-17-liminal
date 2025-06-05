import { useLoaderData } from "react-router-dom";

const ProjectDetails = () => {
  const projectDetails = useLoaderData();
  console.log(projectDetails)
  return <div className="max-w-6xl mx-auto px-6 pt-6 pb-32 ">sfd</div>;
};

export default ProjectDetails;
