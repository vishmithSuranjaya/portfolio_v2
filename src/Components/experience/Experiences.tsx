"use client";
import React from "react";
import { Link } from "react-router-dom";

const Experiences = () => {
  return (
    <div className="flex justify-center items-center w-full px-4 py-8 bg-[#0f172a]">
      <div className="w-full max-w-6xl border border-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl text-center text-white font-semibold mb-6">
          My Work <span className="text-yellow-400">Experiences</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-3">
          <img
            src="https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white"
            alt="C"
          />
          <img
            src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"
            alt="HTML5"
          />
          <img
            src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white"
            alt="Java"
          />
          <img
            src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
            alt="JavaScript"
          />
          <img
            src="https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white"
            alt="Kotlin"
          />
          <img
            src="https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white"
            alt="PHP"
          />
          <img
            src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"
            alt="Python"
          />
          <img
            src="https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white"
            alt="Bootstrap"
          />
          <img
            src="https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white"
            alt="Django"
          />
          <img
            src="https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white"
            alt="Flutter"
          />
          <img
            src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
            alt="React"
          />
          <img
            src="https://img.shields.io/badge/apache%20tomcat-%23F8DC75.svg?style=for-the-badge&logo=apache-tomcat&logoColor=black"
            alt="Apache Tomcat"
          />
          <img
            src="https://img.shields.io/badge/apache-%23D42029.svg?style=for-the-badge&logo=apache&logoColor=black"
            alt="Apache"
          />
          <img
            src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white"
            alt="MySQL"
          />
          <img
            src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white"
            alt="Hibernate"
          />
          <img
            src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"
            alt="Next.js"
          />
        </div>

        <div className="flex justify-center items-center p-4">
          <h1 className="text-white text-2xl p-4">Here is my CV</h1>
          <a
            href="/Vishmith_Suranjaya_CV.pdf"
            download="Vishmith_Suranjaya_CV.pdf"
            className="inline-block bg-yellow-400 text-[#0f172a] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-300 transition duration-300 italic"
          >
            Download CV →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
