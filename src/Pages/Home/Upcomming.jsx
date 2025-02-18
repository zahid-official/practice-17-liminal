import banner1 from "/assets/banner1.jpeg";
import banner2 from "/assets/banner2.jpeg";
import banner3 from "/assets/banner3.jpeg";
import banner4 from "/assets/banner4.jpeg";
import banner5 from "/assets/banner5.jpeg";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";

const Upcomming = () => {
  return (
    <div>
      {/* carousel */}
      <div className="px-12 relative">
        <h2 className="text-3xl font-semibold custom-title mb-2.5">
          Upcomming
        </h2>

        {/* banner */}
        <Swiper
          loop={true}
          slidesPerView={3}
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
            <div className="flex justify-center h-[75vh] group relative">
              <img
                src={banner1}
                className="h-full w-full object-cover"
                alt=""
              />
              {/* overflow */}
              <div className="bg-[#154434cb] absolute w-full -bottom-20 group-hover:bottom-0 duration-300 text-white text-center py-5 font-semibold">
                <p>N16 Residence | Palaio Pchyhiko</p>
              </div>
            </div>
          </SwiperSlide>

          {/* banner-2 */}
          <SwiperSlide>
            <div className="flex justify-center h-[75vh] group relative">
              <img
                src={banner2}
                className="h-full w-full object-cover"
                alt=""
              />
              {/* overflow */}
              <div className="bg-[#154434cb] absolute w-full -bottom-20 group-hover:bottom-0 duration-300 text-white text-center py-5 font-semibold">
                <p>N16 Residence | Palaio Pchyhiko</p>
              </div>
            </div>
          </SwiperSlide>

          {/* banner-3 */}
          <SwiperSlide>
            <div className="flex justify-center h-[75vh] group relative">
              <img
                src={banner3}
                className="h-full w-full object-cover"
                alt=""
              />
              {/* overflow */}
              <div className="bg-[#154434cb] absolute w-full -bottom-20 group-hover:bottom-0 duration-300 text-white text-center py-5 font-semibold">
                <p>N16 Residence | Palaio Pchyhiko</p>
              </div>
            </div>
          </SwiperSlide>

          {/* banner-4 */}
          <SwiperSlide>
            <div className="flex justify-center h-[75vh] group relative">
              <img
                src={banner4}
                className="h-full w-full object-cover"
                alt=""
              />
              {/* overflow */}
              <div className="bg-[#154434cb] absolute w-full -bottom-20 group-hover:bottom-0 duration-300 text-white text-center py-5 font-semibold">
                <p>N16 Residence | Palaio Pchyhiko</p>
              </div>
            </div>
          </SwiperSlide>

          {/* banner-5 */}
          <SwiperSlide>
            <div className="flex justify-center h-[75vh] group relative">
              <img
                src={banner5}
                className="h-full w-full object-cover"
                alt=""
              />
              {/* overflow */}
              <div className="bg-[#154434cb] absolute w-full -bottom-20 group-hover:bottom-0 duration-300 text-white text-center py-5 font-semibold">
                <p>N16 Residence | Palaio Pchyhiko</p>
              </div>
            </div>
          </SwiperSlide>

          {/* navigation */}
          <div className="flex justify-between w-full px-6 absolute top-1/2 z-50">
            <div className="hover:bg-white hover:text-black duration-200 inline-block p-2 rounded-full custom-prev-btn cursor-pointer text-white bg-[#154434]">
              <FaArrowLeft size={22}></FaArrowLeft>
            </div>
            <div className="hover:bg-white hover:text-black duration-200 inline-block p-2 rounded-full custom-next-btn cursor-pointer text-white bg-[#154434]">
              <FaArrowRight size={22}></FaArrowRight>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Upcomming;
