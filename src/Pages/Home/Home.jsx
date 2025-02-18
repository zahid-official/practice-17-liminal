import About from "./About";
import Banner from "./Banner";
import Intro from "./Intro";
import Studio from "./Studio";

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
    </>
  );
};

export default Home;
