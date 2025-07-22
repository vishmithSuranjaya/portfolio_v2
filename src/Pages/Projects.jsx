import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import ProjectTile from '../Components/Tile/ProjectTile';
import Navbar from '../Components/Navbar/Navbar';


const ProjectsDetails = ({ setLoading }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading?.(true);
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
      }
    };

    fetchProjects();
  }, [setLoading]);

  if (error) return <p className="text-red-400 text-center mt-4">{error}</p>;

  return (
    <div className='bg-[#0f172a] min-h-screen p-5'>
      <Navbar />
      <div className="relative m-10">
      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
            onClick={() => setSelectedProject(project)}
            style={{
              backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.3)), url(${project.media1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute bottom-0 p-4 w-full text-white bg-gradient-to-t from-[#0f172a]/90 to-transparent">
              <h2 className="text-lg font-bold">{project.title}</h2>
              <p className="text-sm text-gray-200">{project.description1}</p>
            </div>
          </div>
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
    <p className="text-sm text-gray-400 text-center mt-8">
        © 2025 Vishmith Suranjaya. All Rights Reserved.
      </p>
    </div>
  );
};

export default ProjectsDetails;
