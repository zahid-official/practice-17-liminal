import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay, EffectFade } from "swiper/modules";
import { useEffect, useState } from "react";

const Banner = () => {
  const axiosPublic = useAxiosPublic();

  // state for latest projects
  const [latestProjects, setLatestProjects] = useState([]);

  // useEffect for upcoming projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPublic.get("/latestProjects");
        setLatestProjects(res.data);
      } catch (error) {
        console.error("Error fetching latest projects:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  return (
    <div className="px-6">
      <h2 className="text-3xl font-semibold custom-title mb-2.5">
        Latest Projects
      </h2>

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
        {latestProjects?.map((project) => (
          <SwiperSlide key={project?._id}>
            <div className="flex justify-center">
              <img
                src={project?.bannerImage}
                className="h-full w-full"
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
