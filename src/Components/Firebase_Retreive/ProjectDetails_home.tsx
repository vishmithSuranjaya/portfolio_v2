import React, { useEffect, useState } from 'react';
import ProjectTile from '../Tile/ProjectTile';
import { getProjects } from './getProjects'

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

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading?.(true);
      try {
        const data = await getProjects(); // 👈 call your helper function
        setProjects(data.slice(0, 3)); // take first 3 projects
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects.");
      } finally {
        setLoading?.(false);
      }
    };

    fetchProjects();
  }, [setLoading]);

  if (error) return <p className="text-red-400 text-center mt-4">{error}</p>;

  return (
    <div className="bg-[#0f172a]  p-5">
    
      <div className="relative m-10">
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
