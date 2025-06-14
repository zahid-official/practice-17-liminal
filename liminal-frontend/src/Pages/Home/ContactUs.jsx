import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <div className="py-20 text-center bg-base-200 lg:mt-40 sm:mt-32 mt-28 mx-6 rounded-lg">
      <h2 className="text-4xl">Are you ready to Start?</h2>
      <p className="text-lg py-8">Join us on this creative journey.</p>
      <Link to={"/contact"}>
        <button className="btn border-gray-300 rounded-full px-10">
          Contact
        </button>
      </Link>
    </div>
  );
};

export default ContactUs;
