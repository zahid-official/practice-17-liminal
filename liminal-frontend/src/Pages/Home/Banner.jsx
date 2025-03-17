import banner1 from "/assets/banner1.jpeg";
import banner2 from "/assets/banner2.jpeg";
import banner3 from "/assets/banner3.jpeg";
import banner4 from "/assets/banner4.jpeg";
import banner5 from "/assets/banner5.jpeg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay, EffectFade } from "swiper/modules";

const Banner = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-6">
      <h2 className="text-3xl font-semibold custom-title mb-2.5">Latest Projects</h2>

      {/* banner */}
      <Swiper
        loop={true}
        effect={"fade"}
        autoplay={{
          delay: 2200,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper max-h-[73vh]"
      >
        {/* banner-1 */}
        <SwiperSlide>
          <div className="flex justify-center">
            <img src={banner1} className="h-full w-full" alt="" />
          </div>
        </SwiperSlide>

        {/* banner-2 */}
        <SwiperSlide>
          <div className="flex justify-center">
            <img src={banner2} className="h-full w-full" alt="" />
          </div>
        </SwiperSlide>

        {/* banner-3 */}
        <SwiperSlide>
          <div className="flex justify-center">
            <img src={banner3} className="h-full w-full" alt="" />
          </div>
        </SwiperSlide>

        {/* banner-4 */}
        <SwiperSlide>
          <div className="flex justify-center">
            <img src={banner4} className="h-full w-full" alt="" />
          </div>
        </SwiperSlide>

        {/* banner-5 */}
        <SwiperSlide>
          <div className="flex justify-center">
            <img src={banner5} className="h-full w-full" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
