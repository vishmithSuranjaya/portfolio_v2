// src/Components/Firebase_Retreive/ProjectTile.jsx
import React from 'react';

const ProjectTile = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e293b] text-white rounded-xl shadow-xl max-w-4xl w-full mx-4 p-6 relative animate-fadeIn overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>

        {/* Project Title */}
        <h2 className="text-3xl font-bold mb-4">{project.title}</h2>

        {/* Main Image */}
        {project.media1 && (
          <img
            src={project.media1}
            alt="project-main"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        {/* Description */}
        <p className="text-gray-300 mb-6 text-base leading-relaxed">
          {project.description1}
        </p>

        

        {/* Tech Stack */}
        {project.tech_stack?.length > 0 && (
          <>
            <h4 className="font-semibold text-lg mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech_stack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectTile;
