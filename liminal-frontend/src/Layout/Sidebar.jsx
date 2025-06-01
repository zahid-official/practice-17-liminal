import useAuth from "../Auth/Hook/useAuth";
import profile from "/assets/profile.png";

const Sidebar = () => {
  const { users } = useAuth();
  return (
    <>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-[#f9f9f9] pt-14 shadow-md min-h-screen w-64 p-4">
          {/* profile info */}
          <div>
            <div className="h-16 w-16 mx-auto p-0.5 border-[#154434] border-2 rounded-full">
              <img
                src={users?.photoURL || profile}
                className="w-full h-full object-cover rounded-full"
                alt=""
              />
            </div>
            <h2 className="text-2xl font-semibold text-center py-2">
              {users?.displayName}
            </h2>
          </div>

          {/* navigation */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
