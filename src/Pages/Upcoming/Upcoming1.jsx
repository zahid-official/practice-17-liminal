import upcomingA from "/assets/upcoming1-a.jpeg";
import upcomingB from "/assets/upcoming1-b.jpeg";
import upcomingC from "/assets/upcoming1-c.jpeg";
import upcomingD from "/assets/upcoming1-d.jpeg";
import upcomingE from "/assets/upcoming1-e.jpeg";

const Upcoming1 = () => {
  return (
    <>
      {/* banner */}
      <div className="lg:w-10/12 sm:w-11/12 mx-auto px-3 pt-6">
        <div>
          <img src={upcomingA} alt="" />
        </div>

        {/* overlay */}
        <div className="sm:flex justify-end sm:-translate-y-20 sm:translate-x-10">
          <div className="bg-[#154434] text-white sm:inline-block p-5 sm:pr-20">
            <p className="sm:text-xl">Residence</p>
            <h2 className="sm:text-2xl text-xl">BK House Complex | Paros</h2>
          </div>
        </div>
      </div>

      {/* status */}
      <div className="container mx-auto px-3 text-right mt-6">
        <p>
          <b>Status:</b> Upcomming
        </p>
        <button className="btn rounded-full border-2 border-[#1544348e] text-[#154434] my-10">
          Back to Project
        </button>
      </div>

      {/* gallery */}
      <div className="grid md:grid-cols-2 container mx-auto gap-6 px-3 pb-28">
        {/* 1 */}
        <div className="space-y-6 md:sticky top-0 self-start md:mb-0 mb-6">
          <img src={upcomingB} alt="" />
          <img src={upcomingC} alt="" />
        </div>

        {/* 2 */}
        <div className="space-y-6">
          <img src={upcomingD} alt="" />
          <img src={upcomingE} alt="" />
          <img src={upcomingB} alt="" />
        </div>
      </div>
    </>
  );
};

export default Upcoming1;
