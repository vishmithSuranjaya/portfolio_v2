import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../Components/Navbar/Navbar'; // Assuming Navbar is used elsewhere
import CertificationCard from '../Components/Firebase_Retreive/CertificationCard';

const Certifications = ({ setLoading }) => {
  const [certifications, setCertifications] = useState([]); // Renamed from 'projects' for clarity
  const [selectedCertification, setSelectedCertification] = useState(null); // Renamed for clarity
  const [error, setError] = useState(null);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => { // Renamed function
      setLoading?.(true);
      setLoadingState(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'certifications'));
        const certificationsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCertifications(certificationsList); // Set to new state variable
        console.log(certificationsList);
      } catch (err) {
        console.error('Error fetching certifications:', err);
        setError("Failed to load certifications.");
      } finally {
        setLoading?.(false);
        setLoadingState(false);
      }
    };

    fetchCertifications();
  }, [setLoading]);

  const renderLoadingAnimation = () => (
    <div className="flex-grow flex flex-col justify-center items-center h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-yellow-400 font-semibold animate-pulse">Loading...</p>
    </div>
  );

  if (error) return <p className="text-red-400 text-center mt-4">{error}</p>;

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col">
      <div className="flex-grow p-5 flex flex-col justify-center">
        <div className="relative mx-10 my-4 flex-grow flex flex-col justify-center">
          {loadingState ? (
            renderLoadingAnimation()
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 items-stretch">
              {certifications.map((certification) => (
                <CertificationCard
                  key={certification.id}
                  certification={certification}
                  onView={(c) => setSelectedCertification(c)}
                />
              ))}
            </div>
          )}

          {/* Modal Tile Component (simplified, assuming 'ProjectTile' isn't needed here) */}
          {selectedCertification && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="bg-[#1e293b] text-white rounded-xl shadow-xl max-w-3xl w-full mx-4 p-6 relative animate-fadeIn overflow-y-auto max-h-[90vh]">
                <button
                  onClick={() => setSelectedCertification(null)} // Set to new state variable
                  className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>

                <h2 className="text-3xl font-bold mb-4">
                  {selectedCertification.title || "Certification"}
                </h2>

                {selectedCertification.image && (
                  <img
                    src={selectedCertification.image}
                    alt={selectedCertification.title || "Certification Image"}
                    className="w-full h-auto object-cover rounded-lg mb-6"
                  />
                )}

                {(selectedCertification.description1 || selectedCertification.description) && (
                  <p className="text-gray-300 mb-4 text-base leading-relaxed">
                    {selectedCertification.description1 || selectedCertification.description}
                  </p>
                )}

                {selectedCertification.tech_stack && (
                  <>
                    <h4 className="font-semibold text-lg mt-4 mb-2">
                      Skills/Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertification.tech_stack.map((tech, index) => (
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
                {/* You can add more fields if your certifications have them */}
                {selectedCertification.verification_link && (
                    <a
                      href={selectedCertification.verification_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                      Verify Credential
                    </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="text-sm text-gray-400 text-center p-6">
        © 2025 Vishmith Suranjaya. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Certifications;