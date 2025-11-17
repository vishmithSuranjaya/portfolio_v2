import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import AboutMe from '../Components/about_me/AboutMe'
import WelcomeSection from '../Components/welcome_section/WelcomeSection'
import RunningPhrase from '../Components/RunningPhrase/RunningPhrase'
import Experience from '../Components/experience/Experiences'
import ProjectsDetails_home from '../Components/Firebase_Retreive/ProjectDetails_home'

const Home = () => {
  return (
    <div className='bg-[#0f172a]'>
  <WelcomeSection />
  <RunningPhrase text="I build clean, accessible UIs — React, Tailwind, Firebase. Let's build something together!" />
  <AboutMe />
      <Experience />
      <ProjectsDetails_home />
      <p className="text-sm text-gray-400 text-center p-6">
        © 2025 Vishmith Suranjaya. All Rights Reserved.
      </p>
    </div>
  )
}

export default Home