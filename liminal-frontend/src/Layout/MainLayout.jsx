import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import ContactUs from "../Pages/Home/ContactUs";

const MainLayout = () => {
  const location = useLocation();

  let heading = "Are you ready to Start?";
  let paragraph = "Join us on this creative journey.";

  if (location.pathname === "/about") {
    heading = "Let’s Create Together";
    paragraph =
      "We invite you to explore the possibilities of your space with STONES AND WALLS. Our diverse portfolio encompasses a wide range of projects, from hospitality and leisure venues to residential and office spaces.";
  }
  return (
    <div className="duration-500">
      <div
        className={
          location.pathname !== "/contact" && "max-w-7xl mx-auto sm:px-3"
        }
      >
        <header
          className={
            location.pathname === "/contact" && "max-w-7xl mx-auto sm:px-3"
          }
        >
          <Navbar></Navbar>
        </header>

        <main className="min-h-[45vh]">
          <Outlet></Outlet>
        </main>
      </div>

      <footer>
        {/* contact */}
        {location.pathname !== "/contact" && (
          <div className={location.pathname !== "/projects" && "lg:mt-40 sm:mt-32 mt-28"}>
            <ContactUs heading={heading} paragraph={paragraph}></ContactUs>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          <Footer></Footer>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
