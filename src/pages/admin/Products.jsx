import React, { useState } from 'react';
import { useProducts, useDeleteProduct, useCreateProduct, useUpdateProduct } from '../../hooks/useProducts';
import { useCollections } from '../../hooks/useCollections';
import ImageUpload from '../../components/common/ImageUpload';
import ColorImageUpload from '../../components/common/ColorImageUpload';

const AdminProducts = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const { data: products, isLoading } = useProducts({ search: searchQuery, limit: 100 });
    const { data: collections } = useCollections();

    const deleteMutation = useDeleteProduct();
    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();

    const [formData, setFormData] = useState({
        name: '',
        category: 'Lace',
        price: '',
        stock: '',
        image: '',
        colorImages: [],
        description: ''
    });

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                category: product.category,
                price: product.price,
                stock: product.stock,
                image: product.image,
                colorImages: product.colorImages || [],
                description: product.description || ''
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                category: 'Lace',
                price: '',
                stock: '',
                image: '',
                colorImages: [],
                description: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            colors: formData.colorImages.map(ci => ci.color),
            images: formData.colorImages.map(ci => ci.image)
        };

        if (editingProduct) {
            await updateMutation.mutateAsync({ id: editingProduct._id, data: payload });
        } else {
            await createMutation.mutateAsync(payload);
        }
        setIsModalOpen(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteMutation.mutateAsync(id);
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">Inventory Management</h1>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">Curating the Archive Collection</p>
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="w-full sm:w-auto bg-brand-gold text-brand-black px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(197,160,89,0.2)] hover:bg-white transition-all transform hover:-translate-y-1"
                >
                    Add New Product
                </button>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden relative">
                {/* Loader Overlay */}
                {(deleteMutation.isPending || isLoading) && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Table Header / Toolbar */}
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between gap-6 bg-[#0d0d0d]">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="SEARCH BY NAME OR CATEGORY..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-10 text-[10px] font-bold uppercase tracking-widest focus:border-brand-gold/50 outline-none transition-colors"
                        />
                        <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="px-4 sm:px-8 py-4 sm:py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Archive</th>
                                <th className="hidden sm:table-cell px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Category</th>
                                <th className="px-4 sm:px-8 py-4 sm:py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Price/Yd</th>
                                <th className="hidden md:table-cell px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Stock</th>
                                <th className="hidden lg:table-cell px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Status</th>
                                <th className="px-4 sm:px-8 py-4 sm:py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {!isLoading && products?.map((product) => (
                                <tr key={product._id} className="hover:bg-white/[0.03] transition-colors group">
                                    <td className="px-4 sm:px-8 py-4 sm:py-6">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-sm overflow-hidden border border-white/5 shrink-0">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-sm font-bold tracking-tight text-white group-hover:text-brand-gold transition-colors truncate">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="hidden sm:table-cell px-8 py-6">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{product.category}</span>
                                    </td>
                                    <td className="px-4 sm:px-8 py-4 sm:py-6">
                                        <span className="text-sm font-semibold tracking-tight">₦{product.price.toLocaleString()}</span>
                                    </td>
                                    <td className="hidden md:table-cell px-8 py-6">
                                        <span className={`text-sm font-semibold ${product.stock < 10 ? 'text-brand-gold' : 'text-white'}`}>{product.stock} yd</span>
                                    </td>
                                    <td className="hidden lg:table-cell px-8 py-6">
                                        <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full ${product.stock > 0 ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-8 py-4 sm:py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 sm:gap-3 text-white/20 group-hover:text-white transition-colors">
                                            <button
                                                onClick={() => handleOpenModal(product)}
                                                className="p-2 hover:bg-brand-gold/10 hover:text-brand-gold rounded-sm transition-all" title="Edit"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-sm transition-all" title="Delete"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-brand-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-sm overflow-hidden animate-slideUp my-auto shadow-2xl">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                            <h2 className="text-xl font-bold tracking-tight text-brand-gold uppercase">{editingProduct ? 'Edit Archive' : 'Add New Archive'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Product Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-xs font-bold outline-none focus:border-brand-gold/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Category</label>
                                    <div className="relative">
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 pr-10 text-xs font-bold outline-none focus:border-brand-gold/50 appearance-none cursor-pointer transition-all hover:bg-white/[0.08]"
                                        >
                                            {collections?.map(col => (
                                                <option key={col._id} value={col.category} className="bg-[#0a0a0a] text-white py-2">
                                                    {col.category}
                                                </option>
                                            ))}
                                            <option value="Lace" className="bg-[#0a0a0a] text-white">Lace</option>
                                            <option value="Silk" className="bg-[#0a0a0a] text-white">Silk</option>
                                            <option value="Brocade" className="bg-[#0a0a0a] text-white">Brocade</option>
                                            <option value="Cotton" className="bg-[#0a0a0a] text-white">Cotton</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Price (₦)</label>
                                    <input
                                        required
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-xs font-bold outline-none focus:border-brand-gold/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Stock (Yards)</label>
                                    <input
                                        required
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-xs font-bold outline-none focus:border-brand-gold/50"
                                    />
                                </div>
                            </div>

                            <ImageUpload
                                label="Main Product Image (Shown on product card)"
                                value={formData.image}
                                onChange={(url) => setFormData({ ...formData, image: url })}
                            />

                            <ColorImageUpload
                                value={formData.colorImages}
                                onChange={(colorImages) => setFormData({ ...formData, colorImages })}
                            />

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-xs font-bold outline-none focus:border-brand-gold/50 h-24 resize-none"
                                />
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                <button
                                    type="submit"
                                    disabled={createMutation.isPending || updateMutation.isPending}
                                    className={`flex-1 bg-brand-gold text-brand-black py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-white ${(createMutation.isPending || updateMutation.isPending) ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {editingProduct ? 'Update Archive' : 'Create Archive'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 border border-white/10 text-white py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
