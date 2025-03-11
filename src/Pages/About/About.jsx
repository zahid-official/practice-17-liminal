import right from '/assets/right.jpeg';

const About = () => {
  return (
    <div className="grid grid-cols-2 container mx-auto px-6 pt-16">
      {/* left */}
      <div>About Us</div>

      {/* right */}
      <div>
        <div><img src={right} alt="img" /></div>
      </div>
    </div>
  );
};

export default About;
