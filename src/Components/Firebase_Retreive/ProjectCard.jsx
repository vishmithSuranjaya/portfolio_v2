import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, onView }) => {
  return (
    <article
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onView(project); }}
      onClick={() => onView(project)}
      className="group cursor-pointer bg-[#1e293b] rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full"
    >
      {/* Image */}
      <div className="h-44 md:h-56 w-full bg-gray-800 overflow-hidden">
        {project.media1 ? (
          <img
            src={project.media1}
            alt={project.title || 'project image'}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 text-white flex flex-col gap-3 flex-grow">
        <div>
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="text-sm text-gray-300 mt-1 line-clamp-2">{project.description1}</p>
        </div>

        {/* Tech tags */}
        {project.tech_stack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tech_stack.slice(0, 4).map((tech, i) => (
              <span key={i} className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full">{tech}</span>
            ))}
            {project.tech_stack.length > 4 && (
              <span className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full">+{project.tech_stack.length - 4}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex items-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onView(project); }}
            className="inline-block bg-yellow-400 text-[#0f172a] font-semibold py-2 px-4 rounded-full shadow hover:bg-yellow-300 transition duration-200 italic"
            aria-label={`Open details for ${project.title}`}
          >
            View
          </button>

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open GitHub repository for ${project.title}`}
              className="text-gray-300 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.125-.305-.535-1.53.115-3.19 0 0 1.005-.322 3.295 1.23A11.5 11.5 0 0112 5.8c1.02.005 2.045.138 3.005.405 2.285-1.555 3.29-1.23 3.29-1.23.655 1.66.245 2.885.12 3.19.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.62-5.475 5.915.43.37.815 1.1.815 2.22 0 1.605-.015 2.9-.015 3.295 0 .32.215.695.825.575C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
