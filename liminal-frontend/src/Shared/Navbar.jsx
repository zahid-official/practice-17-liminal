// import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import icon from "/assets/icon.png";
import logo from "/assets/logo.png";

const Navbar = () => {
  const links = (
    <>
      <li className="text-lg font-bold">
        <NavLink to={"/"} className={"dark:hover:bg-slate-800"}>
          Home
        </NavLink>
      </li>
      <li className="text-lg font-bold">
        <NavLink to={"/about"} className={"dark:hover:bg-slate-800"}>
          About Us
        </NavLink>
      </li>
      <li className="text-lg font-bold">
        <NavLink to={"/projects"} className={"dark:hover:bg-slate-800"}>
          Projects
        </NavLink>
      </li>
      <li className="text-lg font-bold">
        <NavLink to={"/contact"} className={"dark:hover:bg-slate-800"}>
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar justify-between py-6 w-full">
        {/* start */}
        <div className="navbar-start sm:w-1/2 w-fit">
          <Link to={"/"}>
            <div className="flex ml-3 items-center">
              <img src={icon} alt="" className="h-12 hidden sm:flex" />
              <img src={logo} alt="" className="sm:h-16 h-14 sm:hidden flex " />
            </div>
          </Link>
        </div>

        {/* center */}
        <div className="navbar-center hidden sm:flex">
          <Link to={"/"}>
            <img src={logo} alt="" className="sm:h-16 h-14" />
          </Link>
        </div>

        {/* end */}
        <div className="navbar-end">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost ">
              <p className="text-xl sm:block hidden">Menu</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="z-20 dark:bg-[#0a1020] right-2 py-4 menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow gap-2"
            >
              {links}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
