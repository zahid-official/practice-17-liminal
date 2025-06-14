import AboutUs from "./AboutUs";
import Banner from "./Banner";
import ContactUs from "./ContactUs";
import Introduce from "./Introduce";
import Studio from "./Studio";
import Upcoming from "./Upcoming";

import { motion } from "motion/react";

const Home = () => {
  return (
    <>
      {/* banner */}
      <div>
        <Banner></Banner>
      </div>

      {/* introduce */}
      <motion.div
        initial={{ translateY: 100, opacity: 0 }}
        whileInView={{
          translateY: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.75, delay: 0.2 }}
      >
        <Introduce></Introduce>
      </motion.div>

      {/* AboutUs */}
      <div>
        <AboutUs></AboutUs>
      </div>

      {/* studio */}
      <div>
        <Studio></Studio>
      </div>

      {/* upcomming */}
      <div>
        <Upcoming></Upcoming>
      </div>

      {/* contact */}
      <div>
        <ContactUs></ContactUs>
      </div>
    </>
  );
};

export default Home;
