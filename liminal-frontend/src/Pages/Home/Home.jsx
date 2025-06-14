import About from "./Introduction";
import Banner from "./Banner";
import Contact from "./Contact";
import Intro from "./Intro";
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

      {/* intro */}
      <motion.div
        initial={{ translateY: 100, opacity: 0 }}
        whileInView={{
          translateY: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.75, delay: 0.2 }}
      >
        <Intro></Intro>
      </motion.div>

      {/* about */}
      <div>
        <About></About>
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
        <Contact></Contact>
      </div>
    </>
  );
};

export default Home;
