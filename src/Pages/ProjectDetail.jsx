import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeft, Github, Globe, ExternalLink, Cpu } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setProject(data);
          // Set initial active image from media1 or image field
          setActiveImage(data.image || data.media1 || '');
        } else {
          setError('Project not found.');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  // Scroll to top on mount/id change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#0f172a] min-h-screen text-white flex flex-col justify-center items-center p-8">
        <div className="max-w-4xl w-full animate-pulse space-y-8">
          {/* Back button skeleton */}
          <div className="h-6 bg-gray-800 w-32 rounded"></div>
          
          {/* Main Layout Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <div className="bg-gray-800 h-80 rounded-xl w-full"></div>
              <div className="flex gap-2">
                <div className="bg-gray-800 h-16 w-16 rounded-lg"></div>
                <div className="bg-gray-800 h-16 w-16 rounded-lg"></div>
                <div className="bg-gray-800 h-16 w-16 rounded-lg"></div>
              </div>
            </div>
            {/* Details Skeleton */}
            <div className="space-y-6">
              <div className="h-10 bg-gray-800 w-3/4 rounded-lg"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-800 w-16 rounded-full"></div>
                <div className="h-6 bg-gray-800 w-20 rounded-full"></div>
                <div className="h-6 bg-gray-800 w-24 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-800 w-full rounded"></div>
                <div className="h-4 bg-gray-800 w-full rounded"></div>
                <div className="h-4 bg-gray-800 w-5/6 rounded"></div>
              </div>
              <div className="flex gap-4 pt-4">
                <div className="h-12 bg-gray-800 w-36 rounded-full"></div>
                <div className="h-12 bg-gray-800 w-36 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="bg-[#0f172a] min-h-screen text-white flex flex-col justify-center items-center p-8">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-red-500 text-6xl font-bold">!</div>
          <h2 className="text-2xl font-bold">{error || 'Project not found.'}</h2>
          <p className="text-gray-400">The project you are looking for doesn't exist or there was a problem loading it.</p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#0f172a] font-bold py-3 px-6 rounded-full transition-all duration-300 italic shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Extract variables with support for both Firestore models
  const title = project.title || 'Untitled Project';
  const description = project.description || project.description1 || '';
  const description2 = project.description2 || '';
  const techStack = project.tech_stack || [];
  const githubLink = project.github_link || project.github_url || '';
  const liveLink = project.live_link || project.url || '';
  
  // Extract all valid media strings
  const mediaList = [
    project.image || project.media1,
    project.media2,
    project.media3,
    project.media4
  ].filter(Boolean);

  return (
    <div className="bg-[#0f172a] min-h-screen text-white flex flex-col">
      <Helmet>
        <title>{`${title} — Vishmith Suranjaya`}</title>
        <meta name="description" content={description.substring(0, 155)} />
        <meta property="og:title" content={`${title} — Vishmith Suranjaya`} />
        <meta property="og:description" content={description.substring(0, 155)} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${import.meta.env.VITE_SITE_URL || 'https://vishmithsuranjaya.dev'}/projects/${project.id}`} />
        {activeImage && <meta property="og:image" content={activeImage} />}
      </Helmet>

      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-12 md:py-16">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group font-medium"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Media Section: Left (7 cols on LG) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#1e293b] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl flex items-center justify-center p-3 relative min-h-[300px] md:min-h-[420px] transition-transform duration-300 hover:scale-[1.01]">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={`${title} Preview`}
                  className="w-full h-auto max-h-[500px] object-contain rounded-xl"
                  loading="eager"
                />
              ) : (
                <div className="text-gray-500 flex flex-col items-center gap-2">
                  <span className="text-4xl">🖼️</span>
                  <span>No image preview available</span>
                </div>
              )}
            </div>

            {/* Thumbnails (Only show if multiple images exist) */}
            {mediaList.length > 1 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {mediaList.map((mediaUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(mediaUrl)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden bg-[#1e293b] border-2 transition-all duration-300 cursor-pointer ${
                      activeImage === mediaUrl 
                        ? 'border-yellow-400 scale-105 shadow-md shadow-yellow-400/20' 
                        : 'border-transparent hover:border-gray-600 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={mediaUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section: Right (5 cols on LG) */}
          <div className="lg:col-span-5 space-y-8 animate-fadeInSlideUp">
            {/* Title & Metadata */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {title}
              </h1>
              
              {/* Tech Stack */}
              {techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 bg-[#1e293b]/70 border border-gray-800 text-blue-300 font-medium px-3.5 py-1.5 rounded-full text-xs hover:border-blue-500/30 transition-colors"
                    >
                      <Cpu className="w-3 h-3 text-blue-400" />
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <hr className="border-gray-800" />

            {/* Description paragraphs */}
            <div className="space-y-5 text-gray-300 text-base md:text-lg leading-relaxed font-light">
              {description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {description2 && description2.split('\n').map((para, i) => (
                <p key={`d2-${i}`}>{para}</p>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#0f172a] font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 hover:-translate-y-0.5"
                >
                  <Globe className="w-5 h-5" />
                  Visit Live Site
                  <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                </a>
              )}
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 border border-gray-700 hover:-translate-y-0.5"
                >
                  <Github className="w-5 h-5" />
                  View Code
                </a>
              )}
            </div>
          </div>

        </div>
      </main>

      <footer className="text-sm text-gray-500 text-center p-6 border-t border-gray-900 mt-12">
        © 2026 Vishmith Suranjaya. All Rights Reserved.
      </footer>
    </div>
  );
};

export default ProjectDetail;
