import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeSection = () => {
  return (
    <section className="w-full bg-[#0f172a] text-white py-20 overflow-hidden"> {/* Added overflow-hidden to prevent scroll issues */}
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h5 className='text-yellow-400 font-bold text-lg animate-fadeInSlideUp'>
            Hello..!
          </h5>
          <h2 className="text-4xl sm:text-7xl font-extrabold mb-6 animate-fadeInSlideUp animation-delay-200"> {/* Add a slight delay */}
            I'm <span className="text-yellow-400">Vishmith Suranjaya.</span>
          </h2>
          <p className="text-gray-300 mb-8 text-lg animate-fadeInSlideUp animation-delay-400"> {/* Add another delay */}
            Nothing is impossible ...
          </p>
          <Link
           to='contact'
           className="inline-block bg-yellow-400 text-[#0f172a] font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-300 transition duration-300 animate-scaleIn animation-delay-600 italic"
          >
             Hire Me →
          </Link>

          {/* Social Icons - Under Hire Me Button */}
          <div className="flex gap-6 justify-center mt-8 animate-fadeInSlideUp animation-delay-700">
            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/vishmithsuranjaya/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </a>

            {/* GitHub Icon */}
            <a
              href="https://github.com/vishmithSuranjaya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className="text-gray-300 hover:text-white transition-colors duration-200 hover:scale-110 transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.125-.305-.535-1.53.115-3.19 0 0 1.005-.322 3.295 1.23A11.5 11.5 0 0112 5.8c1.02.005 2.045.138 3.005.405 2.285-1.555 3.29-1.23 3.29-1.23.655 1.66.245 2.885.12 3.19.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.62-5.475 5.915.43.37.815 1.1.815 2.22 0 1.605-.015 2.9-.015 3.295 0 .32.215.695.825.575C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
              </svg>
            </a>

            {/* HackerRank Icon (official-like) */}
            <a
              href="https://www.hackerrank.com/profile/Vishmith0327"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit HackerRank profile"
              className="transition-transform duration-200 hover:scale-110"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="24" height="24" rx="3" fill="#0b1117"/>
                  <rect x="4" y="6" width="3.5" height="12" rx="0.3" fill="#ffffff"/>
                  <rect x="10" y="6" width="3.5" height="12" rx="0.3" fill="#ffffff"/>
                  <rect x="4" y="11" width="9.5" height="2.5" rx="0.3" fill="#ffffff"/>
                  <rect x="14.5" y="6" width="5.5" height="12" rx="0.3" fill="#00E676"/>
                </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;