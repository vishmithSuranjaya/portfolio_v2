import React from 'react';

const CertificationCard = ({ certification, onView }) => {
  return (
    <article
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onView(certification); }}
      onClick={() => onView(certification)}
      className="group cursor-pointer bg-[#1e293b] rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full"
    >
      <div className="h-44 md:h-56 w-full bg-gray-800 overflow-hidden">
        {certification.image ? (
          <img
            src={certification.image}
            alt={certification.title || 'Certification image'}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
        )}
      </div>

      <div className="p-4 text-white flex flex-col gap-3 flex-grow">
        <div>
          <h3 className="text-lg font-semibold">{certification.title}</h3>
          <p className="text-sm text-gray-300 mt-1 line-clamp-2">{certification.description1 || certification.description}</p>
        </div>

        {certification.tech_stack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {certification.tech_stack.slice(0,4).map((tech, i) => (
              <span key={i} className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full">{tech}</span>
            ))}
            {certification.tech_stack.length > 4 && (
              <span className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full">+{certification.tech_stack.length - 4}</span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onView(certification); }}
            className="inline-block bg-yellow-400 text-[#0f172a] font-semibold py-2 px-4 rounded-full shadow hover:bg-yellow-300 transition duration-200 italic"
            aria-label={`Open details for ${certification.title}`}
          >
            View
          </button>

          {certification.verification_link && (
            <a
              href={certification.verification_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-full transition duration-200"
            >
              Verify
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default CertificationCard;
