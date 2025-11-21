import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../Components/Navbar/Navbar'
import AboutMe from '../Components/about_me/AboutMe'
import WelcomeSection from '../Components/welcome_section/WelcomeSection'
import RunningPhrase from '../Components/RunningPhrase/RunningPhrase'
import Experience from '../Components/experience/Experiences'
import ProjectsDetails_home from '../Components/Firebase_Retreive/ProjectDetails_home'

const Home = () => {
  return (
    <div className='bg-[#0f172a]'>
      <Helmet>
        <title>Vishmith Suranjaya — Frontend Engineer</title>
        <meta name="description" content="Vishmith Suranjaya — Frontend engineer building accessible React + Tailwind apps. Available for hire." />
        <meta property="og:title" content="Vishmith Suranjaya — Frontend Engineer" />
        <meta property="og:description" content="Frontend engineer building accessible React + Tailwind apps. Available for hire." />
        <meta property="og:type" content="website" />
        {
          /* Use VITE_SITE_URL (set in .env or deployment) and fall back to production URL */
        }
        <meta property="og:url" content={`${import.meta.env.VITE_SITE_URL || 'https://vishmithsuranjaya.dev'}/`} />
        <meta property="og:image" content={`${import.meta.env.VITE_SITE_URL || 'https://vishmithsuranjaya.dev'}/og-home.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`${import.meta.env.VITE_SITE_URL || 'https://vishmithsuranjaya.dev'}/`} />
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Vishmith Suranjaya",
          "url": "${import.meta.env.VITE_SITE_URL || 'https://vishmithsuranjaya.dev'}",
          "sameAs": ["https://github.com/vishmithSuranjaya","https://www.linkedin.com/in/vishmithsuranjaya/","https://www.hackerrank.com/vishmith0327"],
          "jobTitle": "Frontend Engineer"
        }`}</script>
      </Helmet>
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