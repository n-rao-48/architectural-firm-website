import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { uploadProjectImage } from '../../lib/api';

export default function UploadsPage() {
  const { token } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async () => {
    setError('');
    if (!token) {
      setError('Unauthorized. Please login again.');
      return;
    }

    if (!file) {
      setError('Please select an image.');
      return;
    }

    setUploading(true);
    try {
      const response = await uploadProjectImage(file, token);
      setImageUrl(response.image_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[#2B2B2B]" style={{ fontSize: '2rem', fontWeight: 400 }}>
        Uploads
      </h2>
      <div className="bg-white border border-[#EDEDED] p-6 space-y-4 max-w-2xl">
        <p className="text-[#2B2B2B]/70" style={{ fontSize: '0.95rem', fontWeight: 400 }}>
          Upload an image to Cloudinary and copy the returned URL.
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full px-4 py-3 border border-[#EDEDED]"
        />

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="px-8 py-3 bg-[#2B2B2B] text-white hover:bg-[#f3e218] hover:text-[#2B2B2B] transition-colors disabled:opacity-60"
          style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>

        {error && <p className="text-red-600" style={{ fontSize: '0.875rem', fontWeight: 400 }}>{error}</p>}

        {imageUrl && (
          <div className="space-y-3">
            <p className="text-[#2B2B2B]" style={{ fontSize: '0.95rem', fontWeight: 400 }}>
              Uploaded URL:
            </p>
            <input
              readOnly
              value={imageUrl}
              className="w-full px-4 py-3 border border-[#EDEDED] text-[#2B2B2B]"
            />
            <img src={imageUrl} alt="Uploaded preview" className="w-full max-w-md h-64 object-cover border border-[#EDEDED]" />
          </div>
        )}
      </div>
    </div>
  );
}
