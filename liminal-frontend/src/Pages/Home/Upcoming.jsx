import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Upcoming = () => {
  const axiosPublic = useAxiosPublic();

  // state for innerWidth & upcoming projects
  const [screenWidth, setScreenWidth] = useState(0);
  const [upcomingProjects, setUpcomingProjects] = useState([]);

  // useEffect for upcoming projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPublic.get("/upcomingProjects");
        setUpcomingProjects(res.data);

        // Set screenWidth based on project count
        if (res.data.length === 1) {
          setScreenWidth(1);
        } else if (res.data.length === 2) {
          setScreenWidth(2);
        } else {
          setScreenWidth(3);
        }
      } catch (error) {
        console.error("Error fetching upcoming projects:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  // useEffect for innerWidth
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenWidth(1);
      } else if (window.innerWidth < 1200) {
        setScreenWidth(2);
      } else {
        setScreenWidth(3);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="">
      {/* carousel */}
      <div className="px-5 lg:mt-7 sm:mt-12 mt-16 relative">
        <h2 className="sm:text-4xl text-3xl font-semibold custom-title mb-2.5">
          Upcomming
        </h2>

        {/* banner */}
        <Swiper
          slidesPerView={screenWidth}
          spaceBetween={30}
          freeMode={true}
          navigation={{
            prevEl: ".custom-prev-btn",
            nextEl: ".custom-next-btn",
          }}
          modules={[Autoplay, FreeMode, Navigation]}
          className="mySwiper"
        >
          {upcomingProjects?.map((project) => (
            <SwiperSlide key={project?._id}>
              <Link to={`/projectDetails/${project?._id}`}>
                <div className="flex justify-center h-[60vh] group relative">
                  <img
                    src={project?.bannerImage}
                    className="h-full w-full object-cover"
                    alt=""
                  />

                  {/* overflow */}
                  <div className="bg-[#1544349c] absolute w-full -bottom-20 group-hover:bottom-0 duration-300 text-white text-center py-5 font-semibold">
                    <p> {project?.title} </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}

          {/* navigation */}
          <div className="flex justify-between w-full px-2.5 absolute top-1/2 z-50">
            <div className="hover:bg-[#ffffff73] hover:text-black duration-200 inline-block p-2 rounded-full custom-prev-btn cursor-pointer text-white bg-[#15443481]">
              <FaArrowLeft size={22}></FaArrowLeft>
            </div>
            <div className="hover:bg-[#ffffff73] hover:text-black duration-200 inline-block p-2 rounded-full custom-next-btn cursor-pointer text-white bg-[#15443481]">
              <FaArrowRight size={22}></FaArrowRight>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Upcoming;
