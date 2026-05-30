import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Github, Globe, FolderOpen } from 'lucide-react';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    github_link: '',
    live_link: '',
    tech_stack: ''
  });

  const fetchProjects = async () => {
    const snapshot = await getDocs(collection(db, 'projects'));
    setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(editingId ? 'Updating project...' : 'Adding project...');
    
    try {
      let imageUrl = formData.image;
      
      if (imageFile) {
        toast.loading('Uploading image...', { id: toastId });
        const imageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Convert comma-separated string to an array for tech_stack
      const formattedData = {
        ...formData,
        image: imageUrl,
        tech_stack: formData.tech_stack ? formData.tech_stack.split(',').map(item => item.trim()).filter(Boolean) : []
      };

      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), formattedData);
        toast.success('Project updated successfully!', { id: toastId });
      } else {
        await addDoc(collection(db, 'projects'), formattedData);
        toast.success('Project added successfully!', { id: toastId });
      }
      
      setFormData({ title: '', description: '', image: '', github_link: '', live_link: '', tech_stack: '' });
      setImageFile(null);
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project: ", error);
      toast.error(error.message || "Failed to save project", { id: toastId });
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setImageFile(null);
    setFormData({
      ...project,
      tech_stack: project.tech_stack ? project.tech_stack.join(', ') : ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const toastId = toast.loading('Deleting project...');
      try {
        await deleteDoc(doc(db, 'projects', id));
        toast.success('Project deleted successfully!', { id: toastId });
        fetchProjects();
      } catch (error) {
        toast.error(error.message || "Failed to delete project", { id: toastId });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-[#1e293b] p-6 rounded-xl mb-8 border border-gray-800">
        <div className="flex items-center gap-2 mb-6">
          <div className={`p-2 rounded-lg ${editingId ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {editingId ? <Pencil className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </div>
          <h3 className="text-xl font-bold">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
              <input className="w-full bg-[#0f172a] text-white px-4 py-2.5 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Project Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Tech Stack (comma separated)</label>
              <input className="w-full bg-[#0f172a] text-white px-4 py-2.5 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="React, Node.js, Firebase" value={formData.tech_stack} onChange={e => setFormData({...formData, tech_stack: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">GitHub Link</label>
              <input className="w-full bg-[#0f172a] text-white px-4 py-2.5 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="https://github.com/..." value={formData.github_link} onChange={e => setFormData({...formData, github_link: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Live Demo Link</label>
              <input className="w-full bg-[#0f172a] text-white px-4 py-2.5 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="https://..." value={formData.live_link} onChange={e => setFormData({...formData, live_link: e.target.value})} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Image Upload</label>
            <div className="flex gap-3">
              <input key={imageFile ? imageFile.name : editingId} type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0] || null)} className="flex-1 bg-[#0f172a] text-gray-400 px-4 py-2.5 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/20 file:text-blue-400 hover:file:bg-blue-500/30" required={!editingId && !formData.image} />
              {(imageFile || formData.image) && (
                <img src={imageFile ? URL.createObjectURL(imageFile) : formData.image} alt="Preview" className="w-16 h-11 object-cover rounded-md border border-gray-700 bg-[#0f172a]" onError={(e) => e.target.style.display='none'} onLoad={(e) => e.target.style.display='block'} />
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea className="w-full bg-[#0f172a] text-white px-4 py-2.5 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all min-h-[100px] resize-y" placeholder="Describe the project..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium">
            {editingId ? <><Pencil className="w-4 h-4" /> Save Changes</> : <><Plus className="w-4 h-4" /> Add Project</>}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setImageFile(null); setFormData({ title: '', description: '', image: '', github_link: '', live_link: '', tech_stack: '' }); }} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg transition-colors font-medium">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-[#1e293b] rounded-xl border border-gray-800 overflow-hidden flex flex-col transition-all hover:border-gray-700 hover:shadow-lg hover:shadow-black/20">
            {project.image && (
              <div className="relative h-48 overflow-hidden bg-black/40 border-b border-gray-800 flex items-center justify-center p-2">
                <img src={project.image} alt={project.title} className="max-w-full max-h-full object-contain" />
              </div>
            )}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-xl font-bold text-white pr-4 break-words" title={project.title}>{project.title}</h4>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEdit(project)} className="p-1.5 bg-gray-700/50 hover:bg-blue-500/20 hover:text-blue-400 text-gray-300 rounded transition-colors" title="Edit">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4 flex-grow whitespace-pre-wrap">{project.description}</p>
              
              <div className="flex flex-col gap-3 mt-auto">
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech_stack.map((tech, i) => (
                      <span key={i} className="text-[11px] font-medium bg-[#0f172a] text-blue-300 px-2 py-1 rounded-md border border-gray-800">{tech}</span>
                    ))}
                  </div>
                )}
                
                {(project.github_link || project.live_link) && (
                  <div className="flex flex-col gap-2 pt-3 border-t border-gray-800 overflow-hidden">
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-gray-300 hover:text-white transition-colors truncate" title={project.github_link}>
                        <Github className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">{project.github_link}</span>
                      </a>
                    )}
                    {project.live_link && (
                      <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors truncate" title={project.live_link}>
                        <Globe className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">{project.live_link}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <div className="col-span-full bg-[#1e293b]/50 border border-gray-800 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center">
            <div className="bg-[#0f172a] p-4 rounded-full mb-4">
              <FolderOpen className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-300 mb-2">No projects yet</h3>
            <p className="text-gray-500 max-w-md">You haven't added any projects to your portfolio. Fill out the form above to create your first project!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProjects;