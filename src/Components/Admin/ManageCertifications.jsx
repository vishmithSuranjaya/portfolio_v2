import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, ExternalLink, Award } from 'lucide-react';

const ManageCertifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tech_stack: '',
    verification_link: ''
  });

  const fetchCertifications = async () => {
    const snapshot = await getDocs(collection(db, 'certifications'));
    setCertifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(editingId ? 'Updating certification...' : 'Adding certification...');
    
    try {
      let imageUrl = formData.image;
      
      if (imageFile) {
        toast.loading('Uploading image...', { id: toastId });
        const imageRef = ref(storage, `certifications/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const formattedData = {
        ...formData,
        image: imageUrl,
        tech_stack: formData.tech_stack ? formData.tech_stack.split(',').map(item => item.trim()).filter(Boolean) : []
      };

      if (editingId) {
        await updateDoc(doc(db, 'certifications', editingId), formattedData);
        toast.success('Certification updated successfully!', { id: toastId });
      } else {
        await addDoc(collection(db, 'certifications'), formattedData);
        toast.success('Certification added successfully!', { id: toastId });
      }
      
      setFormData({ title: '', description: '', image: '', tech_stack: '', verification_link: '' });
      setImageFile(null);
      setEditingId(null);
      fetchCertifications();
    } catch (error) {
      console.error("Error saving certification: ", error);
      toast.error(error.message || "Failed to save certification", { id: toastId });
    }
  };

  const handleEdit = (cert) => {
    setEditingId(cert.id);
    setImageFile(null);
    setFormData({
      title: cert.title || '',
      description: cert.description || cert.description1 || '',
      image: cert.image || '',
      tech_stack: cert.tech_stack ? cert.tech_stack.join(', ') : '',
      verification_link: cert.verification_link || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      const toastId = toast.loading('Deleting certification...');
      try {
        await deleteDoc(doc(db, 'certifications', id));
        toast.success('Certification deleted successfully!', { id: toastId });
        fetchCertifications();
      } catch (error) {
        toast.error(error.message || "Failed to delete certification", { id: toastId });
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
          <h3 className="text-xl font-bold">{editingId ? 'Edit Certification' : 'Add New Certification'}</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
              <input className="w-full bg-[#0f172a] text-white px-4 py-2.5 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Certification Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Skills Covered (comma separated)</label>
              <input className="w-full bg-[#0f172a] text-white px-4 py-2.5 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="React, Node.js" value={formData.tech_stack} onChange={e => setFormData({...formData, tech_stack: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">Verification Link</label>
              <input className="w-full bg-[#0f172a] text-white px-4 py-2.5 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="https://..." value={formData.verification_link} onChange={e => setFormData({...formData, verification_link: e.target.value})} />
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
            <textarea className="w-full bg-[#0f172a] text-white px-4 py-2.5 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all min-h-[100px] resize-y" placeholder="Describe the certification..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium">
            {editingId ? <><Pencil className="w-4 h-4" /> Save Changes</> : <><Plus className="w-4 h-4" /> Add Certification</>}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setImageFile(null); setFormData({ title: '', description: '', image: '', tech_stack: '', verification_link: '' }); }} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg transition-colors font-medium">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certifications.map(cert => (
          <div key={cert.id} className="bg-[#1e293b] rounded-xl border border-gray-800 overflow-hidden flex flex-col transition-all hover:border-gray-700 hover:shadow-lg hover:shadow-black/20">
            {cert.image && (
              <div className="relative h-48 overflow-hidden bg-black/40 flex items-center justify-center p-4 border-b border-gray-800">
                <img src={cert.image} alt={cert.title} className="max-w-full max-h-full object-contain" />
              </div>
            )}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-xl font-bold text-white pr-4 break-words" title={cert.title}>{cert.title}</h4>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEdit(cert)} className="p-1.5 bg-gray-700/50 hover:bg-blue-500/20 hover:text-blue-400 text-gray-300 rounded transition-colors" title="Edit">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4 flex-grow whitespace-pre-wrap">{cert.description || cert.description1}</p>
              
              <div className="flex flex-col gap-3 mt-auto">
                {cert.tech_stack && cert.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {cert.tech_stack.map((tech, i) => (
                      <span key={i} className="text-[11px] font-medium bg-[#0f172a] text-blue-300 px-2 py-1 rounded-md border border-gray-800">{tech}</span>
                    ))}
                  </div>
                )}
                
                {cert.verification_link && (
                  <div className="pt-3 border-t border-gray-800 overflow-hidden">
                    <a href={cert.verification_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors truncate" title={cert.verification_link}>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">{cert.verification_link}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {certifications.length === 0 && (
          <div className="col-span-full bg-[#1e293b]/50 border border-gray-800 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center">
            <div className="bg-[#0f172a] p-4 rounded-full mb-4">
              <Award className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-300 mb-2">No certifications yet</h3>
            <p className="text-gray-500 max-w-md">You haven't added any certifications to your portfolio. Fill out the form above to add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCertifications;
