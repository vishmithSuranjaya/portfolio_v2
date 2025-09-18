import React from "react";


const AboutMe = () => {
  return (
    <div className="flex justify-center items-center bg-[#0f172a] m-10 mb-20">
      <div className="flex flex-col md:flex-row items-center max-w-5xl space-y-2 md:space-y-0 md:space-x-1">
        {/* Image */}
        <img
          src='/vs_profile.jpg'
          alt="Profile"
          className="w-80 h-80 md:w-100 md:h-100 rounded-4xl object-cover"
        />

        {/* Paragraph */}
        <div className="text-white ml-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">About Me</h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
            👋 Greetings! I am a passionate and curious Computer Science undergraduate following 
            <span className="text-cyan-400 font-semibold"> BSc. (Hons) in Computer Science and Technology </span> 
            and firmly believe that <span className="italic text-pink-400 font-semibold">nothing is impossible</span>.
            With a strong interest in software development, I enjoy building meaningful digital experiences where 
            creativity meets functionality. I’m deeply intrigued by technologies like 
            <span className="text-emerald-400 font-medium"> React.js</span> and 
            <span className="text-emerald-400 font-medium"> Python and Next.js</span>, and I’m always striving to grow — not just as a developer, but as a thinker.
            <br /><br />
            Overthinking may be my habit, but I see it as a strength that lets me design with intention. As I journey forward, 
           <br></br> I live by my motto: <span className="text-pink-400 font-semibold">&lt;/&gt; push -ur limits</span> — because growth begins where comfort ends.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
