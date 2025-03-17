import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import logo from "/assets/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-white lg:justify-around py-20 text-base px-10 relative">
        <aside>
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold">
              <img src={logo} alt="" className="sm:h-16 h-14" />
            </h1>
          </div>
          <p>
            Liminal Industries Ltd.
            <br />
            Providing reliable tech since 2015
          </p>
          <ul className="flex items-center gap-2 mt-2">
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
        </aside>

        <nav>
          <h6 className="text-black dark:text-white font-bold text-xl">
            Help Center
          </h6>
          <Link className="link link-hover">Support</Link>
          <Link className="link link-hover">Get Help</Link>
          <Link className="link link-hover">Privacy Policy</Link>
        </nav>

        <nav>
          <h6 className="text-black dark:text-white font-bold text-xl">
            Contact Info
          </h6>
          <Link className="link link-hover" to="https://wa.me/%2B8801955464625">
            <b>Call Us:</b> 01955-464625
          </Link>
          <Link className="link link-hover">
            <b>Address:</b> 1A (Ground Floor), House 34 (near 12/13 more),
            <br /> Road 03, Sector 12, Uttara, Dhaka, Bangladesh
          </Link>
          <Link
            className="link link-hover"
            to="https://mail.google.com/mail/?view=cm&fs=1&to=interiorliminal%40gmail.com"
          >
            <b>Mail Us:</b> interiorliminal@gmail.com
          </Link>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
