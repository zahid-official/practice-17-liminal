import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";

const Contact = () => {
  return (
    <div className="bg-[url(/assets/contact.jpg)]  bg-fixed">
      <div className="flex min-h-[87.8vh] py-20 container mx-auto items-center">
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
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* left */}
            <div>
              <h3 className="text-xl border-b pb-1 mb-4"> Visit Us </h3>
              <p>
                1A (Ground Floor), House 34 (near 12/13 more), Road 03, Sector
                12, Uttara, Dhaka, Bangladesh
              </p>
            </div>

            {/* right */}
            <div>
              <h3 className="text-xl border-b pb-1 mb-4"> Talk with Us </h3>
              <p>
                <Link
                  className="link link-hover"
                  to={"https://wa.me/%2B8801955464625"}
                >
                  Call Us: 01955-464625
                </Link>
                <br />
                <br />
                <Link
                  className="link link-hover"
                  to={
                    "https://mail.google.com/mail/?view=cm&fs=1&to=interiorliminal%40gmail.com"
                  }
                >
                  Email: interiorliminal@gmail.com
                </Link>
              </p>
            </div>
          </div>

          {/* 3 */}
          <div className="text-center">
            <h3 className="text-xl border-b pb-1 mb-5"> Follow Us </h3>
            <ul className="flex items-center gap-2 mt-2 justify-center">
              <li>
                <Link
                  to={
                    "https://www.facebook.com/liminalinterior?mibextid=qi2Omg&rdid=5UrJaMM7lOWvHNYd&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1293aDinBYe%2F%3Fmibextid%3Dqi2Omg#"
                  }
                >
                  <span className="hover:text-[#0866ff]">
                    <FaFacebookSquare size={30} />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={
                    "https://www.instagram.com/liminalinterior?igsh=anRlYm1ubWNmcXVw"
                  }
                >
                  <span className="hover:text-[#e0084b]">
                    <RiInstagramFill size={30} />
                  </span>
                </Link>
              </li>
              <li>
                <Link to={"https://wa.me/%2B8801955464625"}>
                  <span className="hover:text-[#36c035]">
                    <IoLogoWhatsapp size={30} />
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
