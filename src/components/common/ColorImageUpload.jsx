import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadApi } from '../../services/uploadApi';
import toast from 'react-hot-toast';

const ColorImageUpload = ({ value = [], onChange }) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentColor, setCurrentColor] = useState('');

    const onDrop = async (acceptedFiles) => {
        if (acceptedFiles.length === 0 || !currentColor) return;

        setUploading(true);
        setProgress(0);
        
        try {
            const result = await uploadApi.uploadImage(
                acceptedFiles[0],
                (progressPercent) => setProgress(progressPercent)
            );
            
            const newColorImage = { color: currentColor, image: result.url };
            onChange([...value, newColorImage]);
            setCurrentColor('');
            toast.success(`${currentColor} variant uploaded!`);
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
        multiple: false,
        disabled: uploading || !currentColor
    });

    const removeColorImage = (index) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                Color Variants (Upload image for each color)
            </label>

            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="Enter color name (e.g., Red, Blue)"
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-xs font-bold outline-none focus:border-brand-gold/50"
                />
                <div
                    {...getRootProps()}
                    className={`px-6 py-3 border-2 border-dashed rounded-sm cursor-pointer transition-all ${
                        !currentColor ? 'opacity-50 cursor-not-allowed border-white/10' :
                        isDragActive ? 'border-brand-gold bg-brand-gold/5' : 'border-white/20 hover:border-white/40'
                    } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    <input {...getInputProps()} />
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
                        {uploading ? (
                            <>
                                <div className="w-3 h-3 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                                <div className="flex flex-col items-start gap-0.5">
                                    <span>Uploading...</span>
                                    <span className="text-[8px] text-white/40">{progress}%</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Upload
                            </>
                        )}
                    </div>
                </div>
            </div>

            {value.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                    {value.map((item, index) => (
                        <div key={index} className="relative group bg-white/5 rounded-sm border border-white/10 p-3">
                            <div className="flex gap-3 items-center">
                                <div className="w-16 h-16 rounded-sm overflow-hidden bg-white/5 shrink-0">
                                    <img src={item.image} alt={item.color} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-white truncate">{item.color}</p>
                                    <p className="text-[10px] text-white/40 truncate">{item.image.split('/').pop()}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeColorImage(index)}
                                    className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorImageUpload;
