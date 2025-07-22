// src/Components/Firebase_Retreive/CertificationTile.jsx
import React from 'react';

const CertificationTile = ({ project, onClose }) => {
    console.log(project)
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

        {/* Project Title fallback if missing */}
        <h2 className="text-3xl font-bold mb-4">{project.title || "Certification"}</h2>

        {/* Main Image */}
        {project.image && (
          <img
            src={project.image}
            alt={project.title || "certification image"}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        {/* Description fallback to `description` */}
        <p className="text-gray-300 mb-6 text-base leading-relaxed">
          {project.description1 || project.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default CertificationTile;
