import { Link } from "react-router-dom";
import { FaDiscord, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Contact = () => {
  return (
    <div className="bg-[url(/assets/contact.jpg)]  bg-fixed">
      <div className="flex h-[87.8vh] container mx-auto items-center">
        <div className="bg-[#154434] text-white max-w-screen-sm px-8 py-14">
          {/* 1 */}
          <div>
            <h2 className="text-4xl"> Let’s Create Together </h2>
            <p className="pt-4 pb-8 text-xl">
              Whether you have a specific project in mind or just an idea you’d
              like to explore, we invite you to reach out and start a
              conversation.
            </p>
          </div>

          {/* 2 */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* left */}
            <div>
              <h3 className="text-xl border-b pb-1 mb-4"> Visit Us </h3>
              <p>
                Kifisias Avenue 228, Kifisia, Greece 145-62 <br />
                Mon - Fri: 9:00 am-6:00 pm
              </p>
            </div>

            {/* right */}
            <div>
              <h3 className="text-xl border-b pb-1 mb-4"> Talk with Us </h3>
              <p>
                T: +30 210 7296492 <br />
                E: info@stonesandwalls.com
              </p>
            </div>
          </div>

          {/* 3 */}
          <div className="text-center">
            <h3 className="text-xl border-b pb-1 mb-5"> Follow Us </h3>
            <ul className="flex items-center gap-2 mt-2 justify-center">
              <li>
                <Link to={"https://www.facebook.com/"}>
                  <span className="hover:text-[#0866ff]">
                    <FaFacebookSquare size={30} />
                  </span>
                </Link>
              </li>
              <li>
                <Link to={"https://www.linkedin.com/"}>
                  <span className="hover:text-[#0a66c2]">
                    <FaLinkedin size={30} />
                  </span>
                </Link>
              </li>
              <li>
                <Link to={"https://www.instagram.com/"}>
                  <span className="hover:text-[#e0084b]">
                    <RiInstagramFill size={30} />
                  </span>
                </Link>
              </li>
              <li>
                <Link to={"https://discord.com/"}>
                  <span className="hover:text-[#5866f1]">
                    <FaDiscord size={30} />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
