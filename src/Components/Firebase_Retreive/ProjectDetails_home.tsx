import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectTile from '../Tile/ProjectTile';
import { getProjects } from './getProjects';
import ProjectCard from './ProjectCard';

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
        className="rounded-xl bg-gray-800 animate-pulse shadow-lg overflow-hidden"
      >
        <div className="h-44 bg-gray-700 w-full"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-600 w-3/4 mb-3 rounded"></div>
          <div className="h-3 bg-gray-600 w-5/6 mb-2 rounded"></div>
          <div className="h-3 bg-gray-600 w-1/2 rounded"></div>
        </div>
      </div>
    ));

  if (error) return <p className="text-red-400 text-center mt-4">{error}</p>;

  return (
    <div className="bg-[#0f172a] p-5">
      <div className="flex-grow relative m-10">
        {/* Projects Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">My Projects</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 items-stretch">
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

        {/* View All Projects Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/projects"
            className="inline-block bg-yellow-400 text-[#0f172a] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-300 transition duration-300 italic"
          >
            View All Projects →
          </Link>
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