import React from "react";

const RainbowLogo = () => {
  return (
    <span className="relative inline-block text-5xl md:text-6xl font-extrabold lowercase leading-none">
      <span
        className="bg-gradient-to-r from-red-500 via-orange-400 via-yellow-300 via-green-400 via-cyan-400 via-blue-500 via-purple-500 to-red-500 
                   bg-[length:400%_100%] bg-clip-text text-transparent 
                   animate-[rainbow_6s_linear_infinite]"
      >
        vs
      </span>

      <style jsx>{`
        @keyframes rainbow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 400% 50%;
          }
        }
      `}</style>
    </span>
  );
};

export default RainbowLogo;
