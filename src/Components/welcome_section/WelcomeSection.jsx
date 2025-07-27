import React from 'react';

const WelcomeSection = () => {
  return (
    <section className="w-full bg-[#0f172a] text-white py-20">
      <div className="container mx-auto px-6 text-center"> {/* Added text-center here */}
        <div className="max-w-5xl mx-auto"> {/* Added mx-auto to center the max-width div */}
          <h5 className='text-yellow-400 font-bold text-lg'>Hello..!</h5>
          <h2 className="text-4xl sm:text-7xl font-extrabold mb-6">
            I'm <span className="text-yellow-400">Vishmith Suranjaya.</span> 
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Nothing is impossible ... 
          </p>
          <a
            href="#contact"
            className="inline-block bg-yellow-400 text-[#0f172a] font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-300 transition duration-300"
          >
            Hire Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;