import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ProjectTile from '../Components/Tile/ProjectTile';
import ProjectCard from '../Components/Firebase_Retreive/ProjectCard';
import Navbar from '../Components/Navbar/Navbar'; // Assuming Navbar is used elsewhere

const ProjectsDetails = ({ setLoading }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
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
        setProjects(projectsList);
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

  const renderSkeleton = () => (
    Array.from({ length: 6 }).map((_, idx) => (
      <div
        key={idx}
        className="h-64 rounded-xl bg-gray-800 animate-pulse shadow-lg p-4 flex flex-col"
      >
        <div className="h-2/3 bg-gray-700 rounded-lg mb-4"></div>
        <div className="flex-grow">
          <div className="h-4 bg-gray-600 w-3/4 mb-2 rounded"></div>
          <div className="h-3 bg-gray-600 w-2/3 rounded"></div>
        </div>
      </div>
    ))
  );

  if (error) return <p className="text-red-400 text-center mt-4">{error}</p>;

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col">
      <main className="flex-grow p-5">
        <div className="relative m-10">
          {/* Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {loadingState
              ? renderSkeleton()
              : projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onView={() => setSelectedProject(project)}
                    />
                  ))}
          </div>

          {/* Modal Tile Component */}
          {selectedProject && (
            <ProjectTile
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
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