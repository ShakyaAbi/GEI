import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2, AlertCircle, Upload, Image as ImageIcon } from 'lucide-react';
import { useFaculty } from '../../hooks/useFaculty';
import type { FacultyMember } from '../../types/faculty';
import ImageUpload from '../../components/admin/ImageUpload';
import { imageUploadService } from '../../lib/imageUpload';

interface FacultyFormState {
  name: string;
  title: string;
  photoFile?: File | null;
  photoUrl?: string;
  linkedin?: string;
  orderIndex?: number;
}

const FacultyAdminPage: React.FC = () => {
  const { facultyMembers, loading, error: hookError, refreshFaculty, addFaculty, updateFaculty, deleteFaculty } = useFaculty();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState<FacultyMember | null>(null);
  const [formData, setFormData] = useState<FacultyFormState>({
    name: '',
    title: '',
    photoFile: null,
    photoUrl: undefined,
    linkedin: '',
    orderIndex: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (currentFaculty) {
      setFormData({
        name: currentFaculty.name,
        title: currentFaculty.title,
        photoFile: null,
        photoUrl: currentFaculty.photo,
        linkedin: currentFaculty.linkedin || '',
        orderIndex: currentFaculty.orderIndex ?? 0,
      });
    } else {
      setFormData({
        name: '',
        title: '',
        photoFile: null,
        photoUrl: undefined,
        linkedin: '',
        orderIndex: 0,
      });
    }
  }, [currentFaculty]);

  const openModal = (member?: FacultyMember) => {
    if (member) {
      setCurrentFaculty(member);
      setFormData({
        name: member.name,
        title: member.title,
        photoFile: null,
        photoUrl: member.photo || undefined,
        linkedin: member.linkedin || '',
        orderIndex: member.orderIndex ?? 0,
      });
    } else {
      setCurrentFaculty(null);
      setFormData({
        name: '',
        title: '',
        photoFile: null,
        photoUrl: undefined,
        linkedin: '',
        orderIndex: 0,
      });
    }
    setIsModalOpen(true);
    setUploadProgress(0);
    setUploading(false);
    setLocalError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFaculty(null);
    setFormData({
      name: '',
      title: '',
      photoFile: null,
      photoUrl: undefined,
      linkedin: '',
      orderIndex: 0,
    });
    setLocalError(null);
  };

  const handleImageSelect = (file: File) => {
    setFormData(prev => ({ ...prev, photoFile: file, photoUrl: URL.createObjectURL(file) }));
    setUploading(false);
    setUploadProgress(0);
  };

  const handleImageRemove = () => {
    setFormData(prev => ({ ...prev, photoFile: null, photoUrl: undefined }));
    setUploading(false);
    setUploadProgress(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'orderIndex' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLocalError(null);

    try {
      let finalPhotoUrl = formData.photoUrl;

      // Handle image upload if there's a new file
      if (formData.photoFile) {
        setUploading(true);
        const uploadResult = await imageUploadService.uploadImage(
          formData.photoFile,
          'faculty',
          (progress: number) => {
            setUploadProgress(progress);
          }
        );
        finalPhotoUrl = uploadResult.url;
        setUploading(false);
      }

      // If editing and photo was removed (no new upload and no existing URL)
      if (currentFaculty && !formData.photoFile && !formData.photoUrl) {
        finalPhotoUrl = '/faculty/placeholder.jpg';
      }
      // If adding new faculty and no photo provided
      else if (!currentFaculty && !formData.photoFile && !formData.photoUrl) {
        finalPhotoUrl = '/faculty/placeholder.jpg';
      }
      // If editing and keeping existing photo
      else if (currentFaculty && !formData.photoFile) {
        finalPhotoUrl = formData.photoUrl || '/faculty/placeholder.jpg';
      }

      const facultyData = {
        name: formData.name,
        title: formData.title,
        photo: finalPhotoUrl || '/faculty/placeholder.jpg',  // Ensure photo is always a string
        linkedin: formData.linkedin || undefined,  // Use undefined instead of null
        orderIndex: formData.orderIndex ?? 0,
      };

      if (currentFaculty) {
        await updateFaculty(currentFaculty.id, facultyData);
      } else {
        await addFaculty(facultyData);
      }

      closeModal();
      refreshFaculty();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setUploading(false);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      setLocalError(null);
      try {
        await deleteFaculty(id);
        refreshFaculty();
      } catch (err) {
        setLocalError(err instanceof Error ? err.message : 'Failed to delete faculty member');
      }
    }
  };

  const displayError = hookError || localError;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
        <p className="ml-2 text-gray-700">Loading faculty...</p>
      </div>
    );
  }

  if (displayError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <p className="ml-2 text-red-700">Error: {displayError}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Faculty Members</h1>

      <button
        onClick={() => openModal()}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
      >
        <Plus className="w-5 h-5 mr-2" /> Add New Faculty Member
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full border-b bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Photo</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">LinkedIn</th>
              <th className="py-3 px-6 text-left">Order</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {[...facultyMembers].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0)).map((member) => (
              <tr key={member.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  <img src={member.photo} alt={member.name} className="w-12 h-12 rounded-full object-cover" onError={(e) => { e.currentTarget.src = '/faculty/placeholder.jpg'; }} />
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{member.name}</td>
                <td className="py-3 px-6 text-left">{member.title}</td>
                <td className="py-3 px-6 text-left">
                  {member.linkedin ? (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.041 0 3.603 2.003 3.603 4.605v5.591z"/></svg>
                      LinkedIn
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="py-3 px-6 text-left">{member.orderIndex ?? 0}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => openModal(member)}
                      className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors mr-2"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {currentFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="linkedin" className="block text-gray-700 text-sm font-bold mb-2">LinkedIn URL:</label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="https://www.linkedin.com/in/username"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Order</label>
                <input
                  type="number"
                  name="orderIndex"
                  value={formData.orderIndex ?? 0}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={0}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Photo:</label>
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  onImageRemove={handleImageRemove}
                  selectedImage={formData.photoFile ?? null}
                  currentImageUrl={currentFaculty?.photo}
                  uploadProgress={uploadProgress}
                  uploading={uploading}
                />
                {formData.photoUrl && !formData.photoFile && (
                  <div className="mt-2 text-sm text-gray-500">Current photo will be used unless a new one is uploaded.</div>
                )}
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors mr-2"
                >
                  <X className="w-4 h-4 inline-block mr-1" /> Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  disabled={isSubmitting || uploading}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  ) : (
                    <Save className="w-5 h-5 mr-2" />
                  )}
                  {currentFaculty ? 'Update' : 'Add'} Faculty
                </button>
              </div>
              {displayError && (
                <p className="text-red-500 text-sm mt-4 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" /> {displayError}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyAdminPage; 