import React, { useState } from 'react';
import { useCollections, useCreateCollection, useUpdateCollection, useDeleteCollection } from '../../hooks/useCollections';
import { uploadApi } from '../../services/uploadApi';
import { useMutation } from '@tanstack/react-query';

const AdminCollections = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCollection, setEditingCollection] = useState(null);
    const { data: collections, isLoading } = useCollections();

    const deleteMutation = useDeleteCollection();
    const createMutation = useCreateCollection();
    const updateMutation = useUpdateCollection();
    const uploadMutation = useMutation({
        mutationFn: (file) => uploadApi.uploadImage(file),
        onSuccess: (data) => {
            setFormData(prev => ({ ...prev, image: data.url }));
        }
    });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        category: ''
    });

    const handleOpenModal = (collection = null) => {
        if (collection) {
            setEditingCollection(collection);
            setFormData({
                title: collection.title,
                description: collection.description,
                image: collection.image,
                category: collection.category
            });
        } else {
            setEditingCollection(null);
            setFormData({
                title: '',
                description: '',
                image: '',
                category: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingCollection) {
            await updateMutation.mutateAsync({ id: editingCollection._id, data: formData });
        } else {
            await createMutation.mutateAsync(formData);
        }
        setIsModalOpen(false);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await uploadMutation.mutateAsync(file);
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">Collection Management</h1>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">Defining the Archive's Structure</p>
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="w-full sm:w-auto bg-brand-gold text-brand-black px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(197,160,89,0.2)] hover:bg-white transition-all transform hover:-translate-y-1"
                >
                    Add New Collection
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                {/* Loader Overlay */}
                {(isLoading || deleteMutation.isPending) && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {!isLoading && collections?.map((collection) => (
                    <div key={collection._id} className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden group hover:border-brand-gold/30 transition-all">
                        <div className="aspect-[16/9] relative overflow-hidden">
                            <img src={collection.image} alt={collection.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                            <div className="absolute bottom-4 left-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold bg-brand-gold/10 px-3 py-1 border border-brand-gold/20 rounded-full">
                                    {collection.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-brand-gold transition-colors">{collection.title}</h3>
                                <p className="text-xs text-white/40 line-clamp-2 mt-2 leading-relaxed">{collection.description}</p>
                            </div>
                            <div className="flex gap-3 pt-4 border-t border-white/5">
                                <button
                                    onClick={() => handleOpenModal(collection)}
                                    className="flex-1 px-4 py-2 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(collection._id)}
                                    className="px-4 py-2 border border-red-500/10 text-[10px] font-black uppercase tracking-widest text-red-500/40 hover:text-red-500 hover:bg-red-500/5 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-brand-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-sm overflow-hidden animate-slideUp my-auto shadow-2xl">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                            <h2 className="text-xl font-bold tracking-tight text-brand-gold uppercase">{editingCollection ? 'Edit Collection' : 'New Collection'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Collection Title</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-xs font-bold outline-none focus:border-brand-gold/50"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Category Reference</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-xs font-bold outline-none focus:border-brand-gold/50 transition-colors"
                                        placeholder="e.g. Lace, Silk"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Cover Image</label>
                                    <div className="flex flex-col xs:flex-row gap-3">
                                        <input
                                            required
                                            type="text"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-xs font-bold outline-none focus:border-brand-gold/50 transition-colors"
                                            placeholder="URL or Upload..."
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="coll-image-upload"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                            />
                                            <label
                                                htmlFor="coll-image-upload"
                                                className={`h-full min-h-[42px] flex items-center justify-center px-6 bg-brand-gold/5 border border-dashed border-brand-gold/20 rounded-sm text-[10px] font-black uppercase tracking-widest cursor-pointer hover:border-brand-gold/50 transition-all ${uploadMutation.isPending ? 'opacity-50 pointer-events-none' : ''
                                                    }`}
                                            >
                                                {uploadMutation.isPending ? '...' : 'Upload'}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Description</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-xs font-bold outline-none focus:border-brand-gold/50 h-24 resize-none"
                                />
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="submit"
                                    disabled={createMutation.isPending || updateMutation.isPending}
                                    className="flex-1 bg-brand-gold text-brand-black py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-white"
                                >
                                    {editingCollection ? 'Update Collection' : 'Create Collection'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCollections;
