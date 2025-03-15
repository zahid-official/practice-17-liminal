import upcoming1 from "/assets/upcoming1.jpeg";
import upcoming2 from "/assets/upcoming2.jpeg";
import upcoming3 from "/assets/upcoming3.jpeg";
import upcoming4 from "/assets/upcoming4.jpeg";
import upcoming5 from "/assets/upcoming5.jpeg";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { useState } from "react";
import { Link } from "react-router-dom";

const Upcomming = () => {
  // innerWidth state
  const [screenWidth, setScreenWidth] = useState(3);

  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      setScreenWidth(1);
    } else if (window.innerWidth > 768 && window.innerWidth < 1200) {
      setScreenWidth(2);
    } else {
      setScreenWidth(3);
    }
  });

  return (
    <div className="lg:w-11/12 mx-auto lg:px-10">
      {/* carousel */}
      <div className="md:px-12 px-9 relative">
        <h2 className="text-3xl font-semibold custom-title mb-2.5">
          Upcomming
        </h2>

        {/* banner */}
        <Swiper
          // loop={true}
          slidesPerView={screenWidth}
          spaceBetween={30}
          freeMode={true}
          navigation={{
            prevEl: ".custom-prev-btn",
            nextEl: ".custom-next-btn",
          }}
          // autoplay={{
          //   delay: 6200,
          //   disableOnInteraction: false,
          // }}
          modules={[Autoplay, FreeMode, Navigation]}
          className="mySwiper"
        >
          {/* banner-1 */}
          <SwiperSlide>
            <Link to={"/upcoming1"}>
              <div className="flex justify-center h-[75vh] group relative">
                <img
                  src={upcoming1}
                  className="h-full w-full object-cover"
                  alt=""
                />
                {/* overflow */}
                <div className="bg-[#1544349c] absolute w-full -bottom-20 group-hover:bottom-0 duration-300 text-white text-center py-5 font-semibold">
                  <p> BK House Complex | Paros </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>

          {/* banner-2 */}
          <SwiperSlide>
            <div className="flex justify-center h-[75vh] group relative">
              <img
                src={upcoming2}
                className="h-full w-full object-cover"
                alt=""
              />
              {/* overflow */}
              <div className="bg-[#15443486] absolute w-full -bottom-20 group-hover:bottom-0 duration-300 text-white text-center py-5 font-semibold">
                <p>N16 Residence | Palaio Pchyhiko</p>
              </div>
            </div>
          </SwiperSlide>

          {/* banner-3 */}
          <SwiperSlide>
            <div className="flex justify-center h-[75vh] group relative">
              <img
                src={upcoming3}
                className="h-full w-full object-cover"
                alt=""
              />
              {/* overflow */}
              <div className="bg-[#15443485] absolute w-full -bottom-20 group-hover:bottom-0 duration-300 text-white text-center py-5 font-semibold">
                <p>Boutique hotel | Paxos Island</p>
              </div>
            </div>
          </SwiperSlide>

          {/* banner-4 */}
          <SwiperSlide>
            <div className="flex justify-center h-[75vh] group relative">
              <img
                src={upcoming4}
                className="h-full w-full object-cover"
                alt=""
              />
              {/* overflow */}
              <div className="bg-[#1544349c] absolute w-full -bottom-20 group-hover:bottom-0 duration-300 text-white text-center py-5 font-semibold">
                <p>Villa | Paros</p>
              </div>
            </div>
          </SwiperSlide>

          {/* banner-5 */}
          <SwiperSlide>
            <div className="flex justify-center h-[75vh] group relative">
              <img
                src={upcoming5}
                className="h-full w-full object-cover"
                alt=""
              />
              {/* overflow */}
              <div className="bg-[#1544349c] absolute w-full -bottom-20 group-hover:bottom-0 duration-300 text-white text-center py-5 font-semibold">
                <p>Boutique Hotel | Andros</p>
              </div>
            </div>
          </SwiperSlide>

          {/* navigation */}
          <div className="flex justify-between w-full px-6 absolute top-1/2 z-50">
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

export default Upcomming;
