import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../Components/Navbar/Navbar';

const Certifications = ({ setLoading }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading?.(true);
      setLoadingState(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'certifications'));
        const projectsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsList);
        console.log(projectsList);
      } catch (err) {
        console.error('Error fetching certifications:', err);
        setError("Failed to load certifications.");
      } finally {
        setLoading?.(false);
        setLoadingState(false);
      }
    };

    fetchProjects();
  }, [setLoading]);

  const renderSkeleton = () =>
    Array.from({ length: 6 }).map((_, idx) => (
      <div
        key={idx}
        className="h-64 rounded-xl bg-gray-800 animate-pulse shadow-lg"
      >
        <div className="h-2/3 bg-gray-700 rounded-t-xl"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-600 w-3/4 mb-2 rounded"></div>
          <div className="h-3 bg-gray-600 w-2/3 rounded"></div>
        </div>
      </div>
    ));

  if (error) return <p className="text-red-400 text-center mt-4">{error}</p>;

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col">
      <div className="flex-grow p-5">
        <div className="relative m-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {loadingState
              ? renderSkeleton()
              : projects.map((project) => (
                  <div
                    key={project.id}
                    className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.3)), url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute bottom-0 p-4 w-full text-white bg-gradient-to-t from-[#0f172a]/90 to-transparent">
                      <h2 className="text-lg font-bold">{project.title}</h2>
                      <p className="text-sm text-gray-200">
                        {project.description1 || project.description}
                      </p>
                    </div>
                  </div>
                ))}
          </div>

          {/* Modal */}
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="bg-[#1e293b] text-white rounded-xl shadow-xl max-w-3xl w-full mx-4 p-6 relative animate-fadeIn overflow-y-auto max-h-[90vh]">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>

                <h2 className="text-3xl font-bold mb-4">
                  {selectedProject.title || "Certification"}
                </h2>

                {selectedProject.image && (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title || "Certification Image"}
                    className="w-full h-auto object-cover rounded-lg mb-6"
                  />
                )}

                {(selectedProject.description1 || selectedProject.description) && (
                  <p className="text-gray-300 mb-4 text-base leading-relaxed">
                    {selectedProject.description1 || selectedProject.description}
                  </p>
                )}

                {selectedProject.tech_stack && (
                  <>
                    <h4 className="font-semibold text-lg mt-4 mb-2">
                      Skills/Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech_stack.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 px-2 py-1 rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="text-sm text-gray-400 text-center py-4">
        © 2025 Vishmith Suranjaya. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Certifications;
