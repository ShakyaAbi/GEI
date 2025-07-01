import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: globalThis.File) => void;
  onImageRemove: () => void;
  selectedImage: globalThis.File | null;
  currentImageUrl?: string;
  uploading?: boolean;
  uploadProgress?: number;
  error?: string;
  maxSize?: number; // in MB
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  onImageRemove,
  selectedImage,
  currentImageUrl,
  uploading = false,
  uploadProgress = 0,
  error,
  maxSize = 5,
  label = 'Upload Image'
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelection = (file: globalThis.File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return;
    }

    // Validate file size
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return;
    }

    onImageSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const hasImage = selectedImage || currentImageUrl;

  return (
    <div className="w-full">
      {!hasImage ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-gray-600" />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {label}
            </h3>
            
            <p className="text-gray-600 mb-4">
              Drag and drop your image here, or click to browse
            </p>
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Choose Image
            </button>
            
            <p className="text-xs text-gray-500 mt-4">
              JPEG, PNG, or WebP files only, max {maxSize}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {/* Image Preview */}
          <div className="relative">
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : currentImageUrl}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            {!uploading && (
              <button
                onClick={onImageRemove}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* File Info */}
          <div className="p-4">
            {selectedImage && (
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <ImageIcon className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {selectedImage.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {formatFileSize(selectedImage.size)}
                </span>
              </div>
            )}
            
            {uploading && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {uploading && (
              <div className="flex items-center mt-2 text-sm text-blue-600">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading to secure storage...
              </div>
            )}
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;