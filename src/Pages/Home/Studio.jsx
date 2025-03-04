import image3 from "/assets/image3.jpeg";
import image4 from "/assets/image4.jpeg";
import image5 from "/assets/image5.jpeg";

import { motion } from "motion/react";

const Studio = () => {
  return (
    <div className="py-36 sm:px-0 px-6 xl:w-10/12 w-11/12 mx-auto ">
      <div className="grid lg:grid-cols-12 gap-10 overflow-hidden">
        {/* left */}
        <motion.div
          initial={{ translateX: -200, opacity: 0 }}
          whileInView={{ translateX: 0, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="lg:col-span-3 flex lg:flex-col gap-8 sm:flex-row flex-col lg:items-start lg:justify-start items-center justify-center"
        >
          <div className="">
            <img src={image3} className="h-full"></img>
          </div>
          <div className="sm:text-7xl text-5xl lg:text-right text-center font-extralight ">
            Our Team
          </div>
        </motion.div>

        {/* middle */}
        <motion.div
          initial={{ translateY: 200, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-6"
        >
          <img src={image4}></img>
        </motion.div>

        {/* right */}
        <motion.div
          initial={{ translateX: 200, opacity: 0 }}
          whileInView={{ translateX: 0, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="lg:col-span-3 flex lg:flex-col gap-8 sm:flex-row flex-col lg:items-end lg:justify-end  items-center justify-center"
        >
          <div className="sm:text-7xl text-5xl lg:text-left text-center font-extralight">
            Our Studio
          </div>
          <div>
            <img src={image5}></img>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Studio;
