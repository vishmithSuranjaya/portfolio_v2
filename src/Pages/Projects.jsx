import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ProjectCard from '../Components/Firebase_Retreive/ProjectCard';
import Navbar from '../Components/Navbar/Navbar'; // Assuming Navbar is used elsewhere

const ProjectsDetails = ({ setLoading }) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loadingState, setLoadingState] = useState(true); // local loading state for skeletons

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading?.(true);
      setLoadingState(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsList.reverse());
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError("Failed to load projects.");
      } finally {
        setLoading?.(false);
        setLoadingState(false);
      }
    };

    fetchProjects();
  }, [setLoading]);

  const renderLoadingAnimation = () => (
    <div className="flex-grow flex flex-col justify-center items-center h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-yellow-400 font-semibold animate-pulse">Loading...</p>
    </div>
  );

  if (error) return <p className="text-red-400 text-center mt-4">{error}</p>;

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col">
      <Helmet>
        <title>Projects — Vishmith Suranjaya</title>
        <meta name="description" content="Selected projects from Vishmith Suranjaya demonstrating React, Tailwind, and Firebase work." />
        <meta property="og:title" content="Projects — Vishmith Suranjaya" />
        <meta property="og:description" content="Selected projects demonstrating React, Tailwind, and Firebase work." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${import.meta.env.VITE_SITE_URL || 'https://vishmithsuranjaya.dev'}/projects`} />
        <meta property="og:image" content={`${import.meta.env.VITE_SITE_URL || 'https://vishmithsuranjaya.dev'}/og-projects.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`${import.meta.env.VITE_SITE_URL || 'https://vishmithsuranjaya.dev'}/projects`} />
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Projects — Vishmith Suranjaya",
          "description": "Selected projects from Vishmith Suranjaya demonstrating React, Tailwind, and Firebase work.",
          "url": "${import.meta.env.VITE_SITE_URL || 'https://vishmithsuranjaya.dev'}/projects"
        }`}</script>
      </Helmet>
      <main className="flex-grow p-5 flex flex-col justify-center">
        <div className="relative mx-10 my-4 flex-grow flex flex-col justify-center">
          {loadingState ? (
            renderLoadingAnimation()
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="text-sm text-gray-400 text-center p-6">
        © 2025 Vishmith Suranjaya. All Rights Reserved.
      </footer>
    </div>
  );
};

export default ProjectsDetails;