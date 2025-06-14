/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const ContactUs = ({ heading, paragraph }) => {
  return (
    <div className="py-20 text-center bg-base-200">
      <div className="max-w-4xl px-6 mx-auto">
        <h2 className="text-4xl">{heading}</h2>
        <p className="text-lg py-8">{paragraph}</p>
        <Link to={"/contact"}>
          <button className="btn border-gray-300 rounded-full px-10">
            Contact
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactUs;
