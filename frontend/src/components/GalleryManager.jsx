import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('file'); // 'file' or 'url'
  const [formData, setFormData] = useState({
    url: '',
    alt: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${API}/gallery`);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to load gallery images');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, WebP, or GIF)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      url: '',
      alt: ''
    });
    setSelectedFile(null);
    setPreviewUrl(null);
    setShowForm(false);
    setUploadMethod('file');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    setIsUploading(true);

    try {
      if (uploadMethod === 'file' && selectedFile) {
        // Upload file
        const formDataToSend = new FormData();
        formDataToSend.append('file', selectedFile);
        formDataToSend.append('alt', formData.alt || 'Gallery image');

        await axios.post(`${API}/gallery/upload`, formDataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Image uploaded successfully!');
      } else if (uploadMethod === 'url' && formData.url) {
        // Add by URL
        await axios.post(`${API}/gallery`, formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        toast.success('Image added successfully!');
      } else {
        toast.error('Please select a file or provide a URL');
        setIsUploading(false);
        return;
      }
      
      fetchImages();
      resetForm();
    } catch (error) {
      console.error('Error adding image:', error);
      toast.error(error.response?.data?.detail || 'Failed to add image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    const token = localStorage.getItem('admin_token');

    try {
      await axios.delete(`${API}/gallery/${imageId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Image deleted successfully!');
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading gallery...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Add Image Button */}
      {!showForm && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-maroon-800">Manage Gallery</h2>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-maroon-700 hover:bg-maroon-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Image
          </Button>
        </div>
      )}

      {/* Image Form */}
      {showForm && (
        <Card className="border-2 border-maroon-200 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-maroon-800">Add New Image</CardTitle>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Upload Method Toggle */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setUploadMethod('file')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    uploadMethod === 'file'
                      ? 'bg-maroon-700 text-white'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Upload from Device
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod('url')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    uploadMethod === 'url'
                      ? 'bg-maroon-700 text-white'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Add by URL
                </button>
              </div>

              {/* File Upload Section */}
              {uploadMethod === 'file' && (
                <div>
                  <Label htmlFor="file">Select Image File *</Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={handleFileChange}
                    required
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: JPEG, PNG, WebP, GIF (Max 5MB)
                  </p>
                </div>
              )}

              {/* URL Input Section */}
              {uploadMethod === 'url' && (
                <div>
                  <Label htmlFor="url">Image URL *</Label>
                  <Input
                    id="url"
                    name="url"
                    type="url"
                    required
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="https://images.example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the full URL of the image (from Unsplash, Pexels, or your hosting)
                  </p>
                </div>
              )}

              <div>
                <Label htmlFor="alt">Image Description *</Label>
                <Input
                  id="alt"
                  name="alt"
                  required
                  value={formData.alt}
                  onChange={handleChange}
                  placeholder="Classical dance performance"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Provide a brief description for accessibility
                </p>
              </div>

              {/* Preview */}
              {(previewUrl || (uploadMethod === 'url' && formData.url)) && (
                <div className="border-2 border-maroon-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-maroon-700 mb-2">Preview:</p>
                  <img
                    src={previewUrl || formData.url}
                    alt={formData.alt || "Preview"}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      if (uploadMethod === 'url') {
                        e.target.style.display = 'none';
                        toast.error('Invalid image URL');
                      }
                    }}
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={isUploading}
                  className="bg-maroon-700 hover:bg-maroon-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Add Image'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="border-2 border-maroon-200 overflow-hidden group relative">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(image.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
              <div className="p-3 bg-white">
                <p className="text-xs text-gray-600 truncate">{image.alt}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No images in gallery yet. Add your first image!</p>
        </div>
      )}
    </div>
  );
};
