import About from "./About";
import Banner from "./Banner";
import Intro from "./Intro";

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
    </>
  );
};

export default Home;
