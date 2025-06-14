// import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../Auth/Hook/useAuth";
import icon from "/assets/icon.png";
import logo from "/assets/logo.png";

const Navbar = () => {
  // useContext
  const { users, logout } = useAuth();

  // handleSignOut
  const handleSignOut = () => {
    logout()
      .then(() => {
        toast.success("Sign Out Successfully");
      })
      .catch((error) => toast.error(error.message));
  };

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
      <div className="navbar justify-between xl:w-11/12 mx-auto py-6 px-6">
        {/* start */}
        <div className="navbar-start sm:w-1/2 w-fit">
          <Link to={"/"}>
            <div className="text-4xl xl:ml-10 font-bold flex gap-2 justify-center items-center">
              <img
                src={icon}
                alt=""
                className="sm:h-12 h-10 -mt-2.5 hidden xl:flex"
              />
              <img src={logo} alt="" className="sm:h-16 h-14 xl:hidden flex " />
            </div>
          </Link>
        </div>

        {/* center */}
        <div className="navbar-center hidden xl:flex">
          <img src={logo} alt="" className="sm:h-16 h-14" />
        </div>

        {/* end */}
        <div className="navbar-end gap-2">
          {users?.email && (
            <div className="relative rounded-full profilePhoto">
              <div className="dropdown dropdown-hover  rounded-full">
                <div tabIndex={0} role="button" className="rounded-full m-1">
                  <img
                    src={`${users?.photoURL}`}
                    alt="profile photo"
                    className="h-10 w-10 rounded-[50%] object-cover"
                  />
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 dark:bg-[#0a1020] rounded-box z-30 w-44 px-2 py-5 border dark:border-none text-center text-base font-bold space-y-3 -right-14"
                >
                  <li className="px-3 border-b pb-4">{users?.displayName}</li>
                  <li className="px-3">
                    <button
                      onClick={handleSignOut}
                      className="btn bg-[#154434] dark:bg-base-200 dark:text-black dark:hover:bg-base-300 hover:bg-[#154434] text-white text-lg font-bold min-w-28"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

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
