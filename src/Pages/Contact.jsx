import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import Navbar from "../Components/Navbar/Navbar";

const Contact = () => {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      <Navbar />

      {/* Freelancing Banner */}
      <section className="py-20 bg-[#1e293b] text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          I'm <span className="text-blue-400">Available</span> for Freelancing
        </h2>
        <p className="mb-6 text-gray-300 max-w-2xl mx-auto">
          A small river named Duden flows by their place and supplies it with
          the necessary regelialia.
        </p>
      </section>

      {/* Contact Info */}
      <section id="contact" className="py-20 px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-gray-700 opacity-10">
            Contact
          </h1>
          <h2 className="text-3xl font-bold mb-3">Contact Me</h2>
          <p className="text-gray-400">
            I'd love to hear from you. Feel free to reach out via any method
            below!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Phone */}
          <div className="bg-[#1e293b] p-6 rounded-xl text-center shadow-md">
            <FaPhoneAlt className="text-3xl text-green-400 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-1">Phone</h3>
            <p className="text-gray-300">
              <a href="tel:+94771234567">+94 76 966 2495</a>
            </p>
          </div>

          {/* Email */}
          <div className="bg-[#1e293b] p-6 rounded-xl text-center shadow-md">
            <FaEnvelope className="text-3xl text-yellow-400 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-1">Email</h3>
            <p className="text-gray-300">
              <a href="mailto:yourname@email.com">suranjaya0327@gmail.com</a>
            </p>
          </div>

          {/* GitHub */}
          <div className="bg-[#1e293b] p-6 rounded-xl text-center shadow-md">
            <FaGithub className="text-3xl text-white mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-1">GitHub</h3>
            <p className="text-gray-300">
              <a
                href="https://github.com/vishmithSuranjaya"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/vishmithSuranjaya
              </a>
            </p>
          </div>

          {/* LinkedIn */}
          <div className="bg-[#1e293b] p-6 rounded-xl text-center shadow-md col-span-1 sm:col-span-2 lg:col-span-1">
            <FaLinkedin className="text-3xl text-blue-500 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-1">LinkedIn</h3>
            <p className="text-gray-300">
              <a
                href="www.linkedin.com/in/vishmithsuranjaya"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/vishmithsuranjaya
              </a>
            </p>
          </div>
        </div>
      </section>

      <p className="text-sm text-gray-400 text-center mt-8">
        © 2025 Vishmith Suranjaya. All Rights Reserved.
      </p>
    </div>
  );
};

export default Contact;
