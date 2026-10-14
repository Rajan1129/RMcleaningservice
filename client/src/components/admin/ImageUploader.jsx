import { useState, useRef } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Check,
  X,
  RefreshCw,
  Eye,
  Link as LinkIcon,
  Sparkles,
} from 'lucide-react';
import apiClient from '../../services/api';

const defaultPresets = [
  { label: 'Living Room', url: '/images/living-room-cleaning.jpg' },
  { label: 'Kitchen Deep Clean', url: '/images/kitchen-cleaning.jpg' },
  { label: 'Kitchen Before', url: '/images/kitchen-before.jpg' },
  { label: 'Kitchen After', url: '/images/kitchen-after.jpg' },
  { label: 'Bathroom Deep Clean', url: '/images/bathroom-cleaning.jpg' },
  { label: 'Bathroom Before', url: '/images/bathroom-before.jpg' },
  { label: 'Bathroom After', url: '/images/bathroom-after.jpg' },
  { label: 'Sofa Shampooing', url: '/images/sofa-cleaning.jpg' },
  { label: 'Floor Scrubbing', url: '/images/floor-scrubbing.jpg' },
  { label: 'Window Glass Clean', url: '/images/window-glass-cleaning.jpg' },
  { label: 'Balcony Mopping', url: '/images/balcony-cleaning.jpg' },
  { label: 'Water Tank Clean', url: '/images/water-tank-cleaning.jpg' },
  { label: 'Move-in Detailing', url: '/images/move-in-cleaning.jpg' },
  { label: 'Office Deep Clean', url: '/images/office-cleaning.jpg' },
];

const ImageUploader = ({
  value = '',
  onChange,
  label = 'Upload Image',
  required = false,
  helperText = 'PNG, JPG, WebP up to 15MB. Drag & drop or click to select.',
  aspectRatio = 'aspect-[16/10]',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP, etc.)');
      return;
    }
    setErrorMsg('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await apiClient.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.imageUrl) {
        onChange(res.data.imageUrl);
      } else {
        throw new Error('Image URL missing in response');
      }
    } catch (err) {
      console.error('File upload failed, attempting Base64 fallback:', err);
      // Fallback: Base64 dataURL upload
      try {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const b64Res = await apiClient.post('/upload/base64', {
              dataUrl: reader.result,
              filename: file.name,
            });
            if (b64Res.data?.imageUrl) {
              onChange(b64Res.data.imageUrl);
            }
          } catch (b64Err) {
            setErrorMsg(b64Err.response?.data?.message || 'Failed to upload image. Please try again.');
          } finally {
            setUploading(false);
          }
        };
        reader.readAsDataURL(file);
        return;
      } catch (e) {
        setErrorMsg('Upload error. Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      {/* Header Label */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-navy-950 flex items-center gap-1.5">
          <ImageIcon size={14} className="text-skyline-600" />
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPresets((s) => !s)}
            className="text-[11px] font-semibold text-skyline-600 hover:text-skyline-700 flex items-center gap-1 transition-colors"
          >
            <Sparkles size={12} />
            <span>{showPresets ? 'Hide Presets' : 'Choose Preset'}</span>
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() => setShowManualUrl((m) => !m)}
            className="text-[11px] font-semibold text-navy-800/60 hover:text-navy-900 flex items-center gap-1 transition-colors"
          >
            <LinkIcon size={11} />
            <span>{showManualUrl ? 'Hide URL' : 'Paste URL'}</span>
          </button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
          e.target.value = '';
        }}
      />

      {/* Main Drag & Drop / Active Preview Zone */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-skyline-200 bg-slate-50 group">
          <div className={`${aspectRatio} w-full overflow-hidden bg-slate-900/5 relative flex items-center justify-center`}>
            <img
              src={value}
              alt="Selected photo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/images/living-room-cleaning.jpg';
              }}
            />
            {uploading && (
              <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2">
                <RefreshCw size={24} className="animate-spin text-skyline-400" />
                <span className="text-xs font-semibold">Uploading new image...</span>
              </div>
            )}
          </div>

          {/* Active Overlay Controls */}
          <div className="p-3 bg-white border-t border-skyline-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-bold bg-skyline-50 text-skyline-700 border border-skyline-200 px-2 py-0.5 rounded-md shrink-0">
                {value.startsWith('/uploads')
                  ? 'Uploaded File'
                  : value.startsWith('/images')
                  ? 'Indian Preset'
                  : 'Image Link'}
              </span>
              <p className="text-xs text-navy-800/70 truncate font-mono">{value}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-skyline-700 bg-skyline-50 hover:bg-skyline-100 transition-colors border border-skyline-200 flex items-center gap-1.5"
              >
                <UploadCloud size={13} />
                <span>Replace</span>
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors border border-red-100"
                title="Remove photo"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-6 transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-2.5 ${
            isDragging
              ? 'border-skyline-600 bg-skyline-50/80 scale-[1.01]'
              : 'border-skyline-200 hover:border-skyline-400 bg-slate-50/60 hover:bg-skyline-50/30'
          }`}
        >
          {uploading ? (
            <div className="py-4 flex flex-col items-center gap-2 text-skyline-600">
              <RefreshCw size={28} className="animate-spin" />
              <p className="text-xs font-bold text-navy-950">Uploading image to server...</p>
            </div>
          ) : (
            <>
              <div className="h-12 w-12 rounded-2xl bg-white shadow-xs border border-skyline-100 flex items-center justify-center text-skyline-600 group-hover:scale-105 transition-transform">
                <UploadCloud size={24} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-navy-950">
                  Drag and drop image here, or{' '}
                  <span className="text-skyline-600 hover:underline">browse files</span>
                </p>
                <p className="text-[11px] text-navy-800/50 mt-0.5">{helperText}</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Manual URL Input Field (Optional toggle) */}
      {showManualUrl && (
        <div className="p-3 bg-white rounded-xl border border-skyline-200 space-y-1.5">
          <label className="block text-[11px] font-semibold text-navy-900">
            Paste Direct Image URL or Path:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. /images/kitchen-cleaning.jpg or https://..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 rounded-xl border border-skyline-200 px-3 py-1.5 text-xs bg-slate-50 text-navy-900 focus:outline-skyline-500 font-mono"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-xs text-red-500 hover:text-red-700 px-2 font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
          <X size={13} /> {errorMsg}
        </p>
      )}

      {/* Preset Indian Photos Grid */}
      {showPresets && (
        <div className="p-3 bg-white rounded-xl border border-skyline-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-navy-900 flex items-center gap-1">
              <Check size={13} className="text-emerald-600" /> Select From Real Indian Cleaning Photos:
            </p>
            <button
              type="button"
              onClick={() => setShowPresets(false)}
              className="text-[10px] text-navy-800/50 hover:text-navy-900"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-h-48 overflow-y-auto p-1">
            {defaultPresets.map((preset) => (
              <button
                key={preset.url}
                type="button"
                onClick={() => {
                  onChange(preset.url);
                  setShowPresets(false);
                }}
                className={`relative rounded-lg overflow-hidden border transition-all text-left group aspect-[4/3] ${
                  value === preset.url
                    ? 'border-skyline-600 ring-2 ring-skyline-500 shadow-xs'
                    : 'border-slate-200 hover:border-skyline-400'
                }`}
                title={preset.label}
              >
                <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                <span className="absolute bottom-0 inset-x-0 bg-navy-950/80 text-white text-[9px] p-0.5 text-center truncate">
                  {preset.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
