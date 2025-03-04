import About from "./About";
import Banner from "./Banner";
import Contact from "./Contact";
import Intro from "./Intro";
import Studio from "./Studio";
import Upcomming from "./Upcomming";

import { motion } from "motion/react"

const Home = () => {
  return (
    <>
      {/* banner */}
      <div>
        <Banner></Banner>
      </div>

      {/* intro */}
      <motion.div
      initial={{translateY: 100, opacity: 0}}
      whileInView={{
        translateY: 0,
        opacity: 1,
      }}
      transition={{duration: .75, delay: .5}}
      className="my-44"
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
        <Upcomming></Upcomming>
      </div>

      {/* contact */}
      <div>
        <Contact></Contact>
      </div>
    </>
  );
};

export default Home;
