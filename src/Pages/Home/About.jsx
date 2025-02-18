import { Link } from "react-router-dom";
import image1 from "/assets/image1.jpeg";
import { FaArrowRight } from "react-icons/fa";

const About = () => {
  return (
    <>
      <div className="flex lg:flex-row flex-col xl:gap-32 gap-10 xl:w-10/12 w-11/12 mx-auto px-3 text-lg">
        <div>
          <img src={image1} alt="" />
        </div>
        <div className="lg:w-[70%] flex items-center justify-center">
          <div>
            <h2 className="custom-title text-4xl mb-3">About Us</h2>
            <p>
              We believe exceptional design transcends aesthetics—it’s about
              shaping experiences that resonate and inspire. Our team of
              designers, strategists, and storytellers is dedicated to
              transforming visions into meaningful realities.
            </p>
            <Link>
              <p className="relative group inline-block pt-4">
                Read More
                <span className="w-full group-hover:w-0 duration-500 h-[2px] bg-[#154434] inline-block absolute -bottom-0.5 left-0"></span>
                <span className="h-9 scale-0 transition-all duration-500 w-9 ml-1.5 absolute rounded-full bg-[#154434] group-hover:scale-100 -translate-x-8 group-hover:translate-x-0 inline-flex items-center justify-center ">
                  <FaArrowRight
                    color="white"
                    className="-translate-x-8 group-hover:translate-x-0 duration-500"
                  ></FaArrowRight>
                </span>
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* part-2 Services */}
      <div className="flex lg:flex-row-reverse flex-col xl:gap-32 gap-10 xl:w-10/12 w-11/12 mx-auto px-3 text-lg mt-24">
        <div>
          <img src={image1} alt="" />
        </div>
        <div className="lg:w-[70%] flex items-center justify-center">
          <div>
            <h2 className="custom-title text-4xl mb-3">Services</h2>
            <p>
              Interior design services encompass the planning, designing, and
              execution of interior spaces in residential, commercial, and
              industrial settings. We work with clients to create functional,
              aesthetically pleasing spaces that meet their needs and
              preferences.
            </p>
            <Link>
              <p className="relative group inline-block pt-4">
                Explore Services
                <span className="w-full group-hover:w-0 duration-500 h-[2px] bg-[#154434] inline-block absolute -bottom-0.5 left-0"></span>
                <span className="h-9 scale-0 transition-all duration-500 w-9 ml-1.5 absolute rounded-full bg-[#154434] group-hover:scale-100 -translate-x-8 group-hover:translate-x-0 inline-flex items-center justify-center ">
                  <FaArrowRight
                    color="white"
                    className="-translate-x-8 group-hover:translate-x-0 duration-500"
                  ></FaArrowRight>
                </span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
