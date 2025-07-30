import React, { useState } from 'react';
import { Plus, Image as ImageIcon, X, Eye } from 'lucide-react';
import ImageUpload from '../admin/ImageUpload';
import { projectsApi } from '../../lib/projectsApi';

interface ProjectMedia {
  id: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  caption?: string;
}

interface ProjectMediaGalleryProps {
  projectId: string;
  media: ProjectMedia[];
  isEditable?: boolean;
  onMediaUpdate?: (media: ProjectMedia[]) => void;
}

const ProjectMediaGallery: React.FC<ProjectMediaGalleryProps> = ({
  projectId,
  media,
  isEditable = false,
  onMediaUpdate
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string>('');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  // Effect to handle media changes while viewer is open
  useEffect(() => {
    if (viewerOpen && selectedMediaIndex >= media.length) {
      if (media.length > 0) {
        setSelectedMediaIndex(0); // Reset to first image if media still exists
      } else {
        setViewerOpen(false); // Close viewer if no media left
      }
    }
  }, [media, selectedMediaIndex, viewerOpen]);

  const handleImageSelect = async (file: File) => {
    try {
      setSelectedImage(file);
      setUploading(true);
      setError('');

      const formData = new FormData();
      formData.append('file', file);
      
      const response = await projectsApi.uploadProjectMedia(projectId, file);
      
      if (response && onMediaUpdate) {
        // Add the new media to the existing list
        onMediaUpdate([...media, response]);
      }

      setSelectedImage(null);
      setUploading(false);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      setUploading(false);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setError('');
  };

  const handleMediaDelete = async (mediaId: string) => {
    try {
      await projectsApi.deleteProjectMedia(projectId, mediaId);
      if (onMediaUpdate) {
        onMediaUpdate(media.filter(m => m.id !== mediaId));
      }
    } catch (err) {
      console.error('Failed to delete media:', err);
    }
  };

  const openViewer = (index: number) => {
    if (media.length === 0) return; // Don't open if no media
    setSelectedMediaIndex(Math.min(index, media.length - 1)); // Ensure index is valid
    setViewerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {media.map((item, index) => (
          <div key={item.id} className="relative group aspect-w-16 aspect-h-9">
            <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100">
              <img
                src={item.fileUrl}
                alt={item.fileName}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                  <button
                    onClick={() => openViewer(index)}
                    className="p-2 bg-white rounded-full text-gray-900 hover:bg-blue-50 transition-colors"
                    title="View image"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  {isEditable && (
                    <button
                      onClick={() => handleMediaDelete(item.id)}
                      className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete image"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            {item.caption && (
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-sm text-white truncate">{item.caption}</p>
              </div>
            )}
          </div>
        ))}

        {/* Upload Button for Editable Mode */}
        {isEditable && (
          <div className="relative aspect-w-16 aspect-h-9">
            <div className="w-full h-full rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
              <ImageUpload
                onImageSelect={handleImageSelect}
                onImageRemove={handleImageRemove}
                selectedImage={selectedImage}
                uploading={uploading}
                uploadProgress={uploadProgress}
                error={error}
                label="Add Media"
              />
            </div>
          </div>
        )}
      </div>

      {/* Full Screen Viewer */}
      {viewerOpen && media.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={() => setViewerOpen(false)}
            className="absolute top-6 right-6 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Navigation */}
          <div className="absolute inset-y-0 left-4 flex items-center">
            <button
              onClick={() => setSelectedMediaIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1))}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              disabled={media.length <= 1}
            >
              ←
            </button>
          </div>
          
          <div className="absolute inset-y-0 right-4 flex items-center">
            <button
              onClick={() => setSelectedMediaIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0))}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              disabled={media.length <= 1}
            >
              →
            </button>
          </div>
          
          {/* Main Image */}
          <div className="max-w-7xl mx-auto px-4 relative">
            <img
              src={media[selectedMediaIndex].fileUrl}
              alt={media[selectedMediaIndex].fileName}
              className="max-h-[85vh] max-w-full object-contain mx-auto"
            />
            
            {/* Caption */}
            {media[selectedMediaIndex].caption && (
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-white/90 text-center text-lg">
                  {media[selectedMediaIndex].caption}
                </p>
              </div>
            )}
            
            {/* Image counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full">
              <p className="text-white text-sm">
                {selectedMediaIndex + 1} / {media.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectMediaGallery; 