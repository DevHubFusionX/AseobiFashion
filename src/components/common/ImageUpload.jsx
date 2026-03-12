import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadApi } from '../../services/uploadApi';
import toast from 'react-hot-toast';

const ImageUpload = ({ value, onChange, multiple = false, label = 'Product Image' }) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [previews, setPreviews] = useState(multiple ? (value || []) : (value ? [value] : []));

    const onDrop = async (acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        setUploading(true);
        setProgress(0);
        
        try {
            if (multiple) {
                // Use optimized batch upload with concurrency control
                const results = await uploadApi.uploadMultiple(
                    acceptedFiles,
                    (progressPercent) => setProgress(progressPercent)
                );
                
                const urls = results.map(r => r.url);
                const newPreviews = [...previews, ...urls];
                setPreviews(newPreviews);
                onChange(newPreviews);
                toast.success(`${acceptedFiles.length} image(s) uploaded successfully!`);
            } else {
                // Single file upload with progress tracking
                const result = await uploadApi.uploadImage(
                    acceptedFiles[0],
                    (progressPercent) => setProgress(progressPercent)
                );
                
                setPreviews([result.url]);
                onChange(result.url);
                toast.success('Image uploaded successfully!');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('Upload failed. Please try again.');
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
        multiple,
        disabled: uploading
    });

    const removeImage = (index) => {
        const newPreviews = previews.filter((_, i) => i !== index);
        setPreviews(newPreviews);
        onChange(multiple ? newPreviews : '');
    };

    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</label>
            
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-all ${
                    isDragActive ? 'border-brand-gold bg-brand-gold/5' : 'border-white/20 hover:border-white/40'
                } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-3">
                    {uploading ? (
                        <>
                            <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-xs text-white/60">Uploading...</p>
                                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-brand-gold transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-[10px] text-white/40">{progress}%</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <div>
                                <p className="text-xs font-bold text-white/60 mb-1">
                                    {isDragActive ? 'Drop images here' : 'Drag & drop images or click to browse'}
                                </p>
                                <p className="text-[10px] text-white/30">PNG, JPG, WEBP up to 5MB (auto-compressed)</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                    {previews.map((url, index) => (
                        <div key={index} className="relative group aspect-square bg-white/5 rounded-sm border border-white/10 overflow-hidden">
                            <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
