import icon from "/assets/icon.png";

const Introduce = () => {
  return (
    <div className="px-6 sm:my-36 my-24">
      <div className="sm:max-w-32 max-w-24 mx-auto">
        <img src={icon} className="h-full w-full" alt="" />
      </div>
      <h2 className="text-center my-4 custom-title sm:text-[2.5rem] text-4xl font">Interior | Design Studio</h2>
      <p className="sm:text-2xl text-lg">We are a creative design studio based in Athens, crafting interiors since 2023. We believe thoughtful design transforms spaces and enriches lives. Our work blends innovation and timeless aesthetics to create meaningful, inspiring environments that reflect the unique stories of those who inhabit them.</p>
    </div>
  );
};

export default Introduce;
