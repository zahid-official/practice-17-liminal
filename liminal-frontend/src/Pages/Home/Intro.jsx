import icon from "/assets/icon.png";

const Intro = () => {
  return (
    <div className=" my-36">
      <div className="max-w-32 mx-auto">
        <img src={icon} className="h-full w-full" alt="" />
      </div>
      <h2 className="text-center my-6 custom-title text-[2.5rem] font">Interior | Design Studio</h2>
      <p className="max-w-screen-xl px-6 mx-auto text-2xl">We are a creative design studio based in Athens, crafting interiors since 2023. We believe thoughtful design transforms spaces and enriches lives. Our work blends innovation and timeless aesthetics to create meaningful, inspiring environments that reflect the unique stories of those who inhabit them.</p>
    </div>
  );
};

export default Intro;
