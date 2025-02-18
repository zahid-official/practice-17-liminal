import image3 from "/assets/image3.jpeg";
import image4 from "/assets/image4.jpeg";
import image5 from "/assets/image5.jpeg";

const Studio = () => {
  return (
    <div className="py-36 px-6 w-11/12 mx-auto">
      <div className="grid grid-cols-12 gap-10">
        {/* left */}
        <div className="col-span-3">
          <div className="max-h-[345px] overflow-hidden">
            <img src={image3} className="h-full"></img>
          </div>
          <div className="text-7xl text-right font-extralight pt-6">Our Team</div>
        </div>

        {/* middle */}
        <div className="col-span-6">
            <img src={image4}></img>
        </div>

        {/* right */}
        <div className="col-span-3 content-end">
          <div className="text-7xl font-extralight pb-6">Our Studio</div>
          <div>
            <img src={image5}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;
