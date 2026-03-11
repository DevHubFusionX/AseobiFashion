import { axiosInstance } from '../lib/axios';
import imageCompression from 'browser-image-compression';

// Compress image before upload
const compressImage = async (file) => {
    try {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: 'image/webp'
        };
        
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        console.warn('Compression failed, using original file:', error);
        return file;
    }
};

// Retry upload with exponential backoff
const retryUpload = async (uploadFn, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await uploadFn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            
            // Exponential backoff: 1s, 2s, 4s
            const delay = Math.pow(2, i) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

export const uploadApi = {
    uploadImage: async (file, onProgress) => {
        try {
            // Compress image first
            const compressedFile = await compressImage(file);
            
            const formData = new FormData();
            formData.append('image', compressedFile);

            // Retry with exponential backoff
            const { data } = await retryUpload(async () => {
                return axiosInstance.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: 60000, // 60 seconds for uploads
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            onProgress?.(percentCompleted);
                        }
                    }
                });
            });

            return data;
        } catch (error) {
            console.error('Upload failed after retries:', error);
            throw error;
        }
    },

    uploadMultiple: async (files, onProgress) => {
        try {
            // Compress all files first
            const compressedFiles = await Promise.all(
                files.map(file => compressImage(file))
            );

            const results = [];
            
            // Upload with concurrency limit (2 at a time)
            for (let i = 0; i < compressedFiles.length; i += 2) {
                const batch = compressedFiles.slice(i, i + 2);
                
                const batchResults = await Promise.all(
                    batch.map((file, idx) =>
                        retryUpload(async () => {
                            const formData = new FormData();
                            formData.append('image', file);

                            const { data } = await axiosInstance.post('/upload', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                                timeout: 60000,
                                onUploadProgress: (progressEvent) => {
                                    if (progressEvent.total) {
                                        const percentCompleted = Math.round(
                                            (progressEvent.loaded * 100) / progressEvent.total
                                        );
                                        const overallProgress = Math.round(
                                            ((i + idx) / compressedFiles.length) * 100 +
                                            (percentCompleted / compressedFiles.length)
                                        );
                                        onProgress?.(overallProgress);
                                    }
                                }
                            });

                            return data;
                        })
                    )
                );

                results.push(...batchResults);
            }

            return results;
        } catch (error) {
            console.error('Batch upload failed:', error);
            throw error;
        }
    }
};
