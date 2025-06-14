import right from "/assets/right.jpeg";
import left from "/assets/left.jpeg";
import studio from "/assets/studio.jpeg";
import g1 from "/assets/g1.jpeg";
import g2 from "/assets/g2.jpeg";
import g3 from "/assets/g3.jpg";
import g4 from "/assets/g4.jpg";
import g5 from "/assets/g5.jpg";
import g6 from "/assets/g6.jpg";
import g7 from "/assets/g7.jpg";
import g8 from "/assets/g8.jpg";
import g9 from "/assets/g9.jpg";
import g10 from "/assets/g10.jpg";
import g11 from "/assets/g11.jpg";
import g12 from "/assets/g12.jpg";
import g13 from "/assets/g13.jpg";
import g14 from "/assets/g14.jpg";

const About = () => {
  return (
    <>
      <div className="px-5">
        {/* top */}
        <div className="grid md:grid-cols-2 gap-20 relative">
          {/* left */}
          <div className="order-1">
            <h2 className="sm:text-5xl text-4xl md:my-16 mb-5">About Us</h2>
            <div>
              <h3 className="sm:text-3xl text-2xl">Our Philosophy</h3>
              <br />
              <p>
                We believe that exceptional design is more than just
                aesthetics—its about crafting experiences that resonate and
                inspire. With over 15 years of industry expertise, our talented
                team of designers, strategists, and storytellers is dedicated to
                transforming ideas into impactful visual narratives. <br />
                <br />
                Our philosophy is rooted in collaboration and innovation. By
                closely partnering with our clients, we delve deep into their
                vision, understanding their unique challenges and aspirations.
                This enables us to create tailored design solutions that not
                only meet objectives but also engage audiences on a profound
                level. <br />
                <br />
                Our diverse portfolio showcases a commitment to quality and
                creativity. We stay ahead of industry trends, ensuring that our
                work is not only relevant today but also future-ready. <br />
                <br />
                Join us on a journey where creativity knows no bounds and every
                project is an opportunity to push the envelope. Together, lets
                bring your vision to life. Welcome to Stones and Walls
              </p>
            </div>

            <div className="md:mt-24 mt-12">
              <h3 className="text-3xl">Why Choose Us?</h3>
              <div className="space-y-3 mt-3">
                <li>
                  ⁠Expertise: With over 15 years of experience in the industry,
                  we bring a wealth of knowledge and skills to every project.
                </li>
                <li>
                  ⁠Personalized Approach: We take the time to understand your
                  specific needs and goals, ensuring that our designs reflect
                  your brand’s unique personality.
                </li>
                <li>
                  ⁠Commitment to Quality: We strive for excellence in every
                  aspect of our work, from initial concepts to final execution.
                </li>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="md:sticky md:order-1 top-0  pt-6 md:self-start">
            <img src={right} alt="img" />
          </div>
        </div>

        {/* bottom */}
        <div className="grid md:grid-cols-2 gap-20 mt-16 relative">
          {/* left */}
          <div className="md:sticky md:order-1 top-0 md:pt-16 pt-4 md:self-start">
            <img src={left} alt="img" />
          </div>

          {/* right */}
          <div className="order-1 md:pt-16">
            <div>
              <h3 className="text-3xl">Our Team</h3>
              <br />
              <p>
                Our team of experienced architects and designers is dedicated to
                pushing boundaries and exploring new ideas while ensuring that
                each project aligns with your vision and brand identity.
              </p>
            </div>
            <br />
            <br />
            <br />

            <div className="space-y-9">
              {/* 1 */}
              <div>
                <h4 className="text-xl font-medium">Afroditi Bonatsou</h4>
                <p>Design Director | Co Founder</p>
              </div>

              {/* 2 */}
              <div>
                <h4 className="text-xl font-medium">Konstantinos Kounelis</h4>
                <p>Managing Director | Co Founder</p>
              </div>

              {/* 3 */}
              <div>
                <h4 className="text-xl font-medium">Villy Rapanta</h4>
                <p>Architect Engineer</p>
              </div>

              {/* 4 */}
              <div>
                <h4 className="text-xl font-medium">Eleutheria Sidiropoulou</h4>
                <p>Interior Designer</p>
              </div>

              {/* 5 */}
              <div>
                <h4 className="text-xl font-medium">Konstantinos Tharenos</h4>
                <p>Construction Engineer</p>
              </div>

              {/* 6 */}
              <div>
                <h4 className="text-xl font-medium">Maria Maridaki</h4>
                <p>Architect Engineer</p>
              </div>

              {/* 7 */}
              <div>
                <h4 className="text-xl font-medium">Natassa Aslani</h4>
                <p>Interior Architect</p>
              </div>

              {/* 8 */}
              <div>
                <h4 className="text-xl font-medium">Sotiria Fasoi</h4>
                <p>Interior Architect</p>
              </div>

              {/* 9 */}
              <div>
                <h4 className="text-xl font-medium">Pavlos Karagiannis</h4>
                <p>Interior Architectr</p>
              </div>

              {/* 10 */}
              <div>
                <h4 className="text-xl font-medium">Dimitra Antoniou</h4>
                <p>Architect Engineer</p>
              </div>

              {/* 11 */}
              <div>
                <h4 className="text-xl font-medium">Myrsini Syrigou</h4>
                <p>Interior Designer</p>
              </div>

              {/* 12 */}
              <div>
                <h4 className="text-xl font-medium">Stavros Tsiplakos</h4>
                <p>Interior Architect</p>
              </div>

              {/* 13 */}
              <div>
                <h4 className="text-xl font-medium">Vasiliki Gkini</h4>
                <p>Interior Architect</p>
              </div>

              {/* 14 */}
              <div>
                <h4 className="text-xl font-medium">Giannis Antwnopoulos</h4>
                <p>Junior Architect</p>
              </div>

              {/* 15 */}
              <div>
                <h4 className="text-xl font-medium">Yanna Chasandra</h4>
                <p>Procurement | Purchasing</p>
              </div>

              {/* 16 */}
              <div>
                <h4 className="text-xl font-medium">Fay Kontoria</h4>
                <p>Administrative Assistant</p>
              </div>

              {/* 17 */}
              <div>
                <h4 className="text-xl font-medium">Efi Katri</h4>
                <p>Accounting</p>
              </div>

              {/* 18 */}
              <div>
                <h4 className="text-xl font-medium">Penny Chatzopoulou</h4>
                <p>Press | Social Media Associate</p>
              </div>
            </div>
          </div>
        </div>

        {/* studio */}
        <div className="grid md:grid-cols-2 gap-20 md:pt-28 pt-20">
          <div>
            <img src={studio} alt="" />
          </div>

          <div className="md:flex items-end">
            <div>
              <h3 className="text-3xl mb-6">The Studio</h3>
              <p>
                Our workspace is not just a physical location.. it’s an integral
                part of the creative process that can significantly impact the
                outcome of design projects. A well-designed environment can
                significantly influence the quality of work produced and the
                collaboration among team members. <br />
                <br />
                The design studios workspace acts as a hub for inspiration,
                encouraging teamwork and inventive thinking!
              </p>
            </div>
          </div>
        </div>

        {/* gallery */}
        <div>
          {/* g-1 */}
          <div className="grid sm:grid-cols-2 mt-10 gap-6">
            <div>
              <img src={g1} alt="" />
            </div>

            <div className="lg:mt-5">
              <img src={g2} alt="" />
            </div>
          </div>

          {/* g-2 */}
          <div className="mt-7 grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
            {/* 1 */}
            <div className=" space-y-6">
              <img src={g3} alt="" />
              <img src={g6} alt="" />
            </div>

            {/* 2 */}
            <div className=" space-y-6">
              <img src={g4} alt="" />
              <img src={g7} alt="" />
            </div>

            {/* 3 */}
            <div className="space-y-6">
              <img src={g5} alt="" />
              <img src={g8} alt="" />
            </div>

            {/* 4 */}
            <div className="space-y-6">
              <img src={g9} alt="" />
              <img src={g10} alt="" />
            </div>

            {/* 5 */}
            <div className="space-y-6">
              <img src={g11} alt="" />
              <img src={g12} alt="" />
            </div>

            {/* 6 */}
            <div className="space-y-6">
              <img src={g13} alt="" />
              <img src={g14} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* contact */}
      <div className="py-20 text-center bg-base-200 lg:mt-36 sm:mt-28 mt-24 px-4">
        <h2 className="text-4xl">Let’s Create Together</h2>
        <p className=" pt-8">
          We invite you to explore the possibilities of your space with STONES
          AND WALLS. <br /> Our diverse portfolio encompasses a wide range of
          projects, from hospitality and leisure venues to residential and
          office spaces.
        </p>

        <p className="pt-4 pb-10">
          Contact us today to schedule your consultation and let’s bring your
          vision to life!
        </p>
        <button className="btn border-gray-300 rounded-full px-10">
          Contact
        </button>
      </div>
    </>
  );
};

export default About;
