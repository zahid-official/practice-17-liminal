import About from "./About";
import Banner from "./Banner";
import Contact from "./Contact";
import Intro from "./Intro";
import Studio from "./Studio";
import Upcomming from "./Upcomming";

const Home = () => {
  return (
    <>
      {/* banner */}
      <div>
        <Banner></Banner>
      </div>

      {/* intro */}
      <div>
        <Intro></Intro>
      </div>

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
