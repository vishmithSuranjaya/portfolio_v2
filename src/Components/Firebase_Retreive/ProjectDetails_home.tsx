import React, { useEffect, useState } from 'react';
import ProjectTile from '../Tile/ProjectTile';
import { getProjects } from './getProjects';

interface Project {
  id: string;
  title: string;
  description1: string;
  media1: string;
  [key: string]: any;
}

const ProjectsDetails = ({ setLoading }: { setLoading?: (loading: boolean) => void }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState(true); // local loading for skeleton

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading?.(true);
      setLoadingState(true);
      try {
        const data = await getProjects(); // your helper
        setProjects(data.slice(0, 3)); // first 3 projects
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects.");
      } finally {
        setLoading?.(false);
        setLoadingState(false);
      }
    };

    fetchProjects();
  }, [setLoading]);

  const renderSkeleton = () =>
    Array.from({ length: 3 }).map((_, idx) => (
      <div
        key={idx}
        className="h-64 rounded-xl bg-gray-800 animate-pulse shadow-lg p-4" // Added p-4 for padding
      >
        <div className="h-2/3 bg-gray-700 rounded-lg mb-2"></div> {/* Adjusted for direct image */}
        <div className="p-2"> {/* Added padding for text below image */}
          <div className="h-4 bg-gray-600 w-3/4 mb-2 rounded"></div>
          <div className="h-3 bg-gray-600 w-2/3 rounded"></div>
        </div>
      </div>
    ));

  if (error) return <p className="text-red-400 text-center mt-4">{error}</p>;

  return (
    <div className="bg-[#0f172a] p-5">
      <div className="flex-grow relative m-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {loadingState
            ? renderSkeleton()
            : projects.map((project) => (
                <div
                  key={project.id}
                  className="relative h-100 rounded-xl overflow-hidden shadow-lg group cursor-pointer bg-[#1e293b] p-4 flex flex-col" // Added bg color, padding, and flex for layout
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex-grow text-white"> {/* Text content below the image */}
                    <h2 className="text-lg font-bold mb-1">{project.title}</h2>
                    {/* <p className="text-sm text-gray-200 line-clamp-2">{project.description1}</p> line-clamp for description */}
                  </div>
                  <div className="flex-shrink-0 mb-4 h-2/3 overflow-hidden rounded-lg"> {/* Container for the image */}
                    <img
                      src={project.media1}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" // Image styles
                    />
                  </div>
                  <div className="flex-grow text-white"> {/* Text content below the image */}
                    <h2 className="text-lg font-bold mb-1">{project.title}</h2>
                    <p className="text-sm text-gray-200 line-clamp-2">{project.description1}</p> {/* line-clamp for description */}
                  </div>
                </div>
              ))}
        </div>

        {selectedProject && (
          <ProjectTile
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsDetails;