import React, { useState } from 'react';
import { axiosInstance } from '../../lib/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Discounts = () => {
    const queryClient = useQueryClient();
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        type: 'percentage',
        value: 0,
        minPurchase: 0,
        expiryDate: '',
        usageLimit: 100
    });

    const { data: discounts, isLoading } = useQuery({
        queryKey: ['discounts'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/discounts/all');
            return data.data || data || [];
        }
    });

    const createMutation = useMutation({
        mutationFn: (newDiscount) => axiosInstance.post('/discounts', newDiscount),
        onSuccess: () => {
            queryClient.invalidateQueries(['discounts']);
            setIsAdding(false);
            toast.success('Discount code created');
            setFormData({ code: '', type: 'percentage', value: 0, minPurchase: 0, expiryDate: '', usageLimit: 100 });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axiosInstance.delete(`/discounts/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['discounts']);
            toast.success('Discount removed');
        }
    });

    return (
        <div className="space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">Marketing Assets</h1>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">Campaign & Conversion Management</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="w-full sm:w-auto bg-brand-gold text-brand-black px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors"
                >
                    {isAdding ? 'Cancel' : 'Generate New Code'}
                </button>
            </div>

            {isAdding && (
                <div className="bg-[#0a0a0a] border border-brand-gold/20 p-8 rounded-sm animate-slideDown">
                    <form className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 items-end" onSubmit={(e) => {
                        e.preventDefault();
                        createMutation.mutate(formData);
                    }}>
                        <div className="md:col-span-1">
                            <label className="block text-[8px] font-bold text-white/40 uppercase tracking-widest mb-2">Code</label>
                            <input
                                type="text" value={formData.code}
                                onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-brand-gold outline-none"
                                placeholder="SUMMER24"
                            />
                        </div>
                        <div>
                            <label className="block text-[8px] font-bold text-white/40 uppercase tracking-widest mb-2">Type</label>
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-xs text-white focus:border-brand-gold outline-none"
                            >
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed Amount</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[8px] font-bold text-white/40 uppercase tracking-widest mb-2">Value</label>
                            <input
                                type="number" value={formData.value}
                                onChange={e => setFormData({ ...formData, value: Number(e.target.value) })}
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-brand-gold outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[8px] font-bold text-white/40 uppercase tracking-widest mb-2">Expiry</label>
                            <input
                                type="date" value={formData.expiryDate}
                                onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-xs text-brand-gold focus:border-brand-gold outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[8px] font-bold text-white/40 uppercase tracking-widest mb-2">Min Order</label>
                            <input
                                type="number" value={formData.minPurchase}
                                onChange={e => setFormData({ ...formData, minPurchase: Number(e.target.value) })}
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-brand-gold outline-none"
                            />
                        </div>
                        <button className="bg-brand-gold text-brand-black px-4 py-3.5 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors h-[46px]">
                            Save
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="px-4 sm:px-8 py-4 sm:py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Code</th>
                                <th className="px-4 sm:px-8 py-4 sm:py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Value</th>
                                <th className="hidden sm:table-cell px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Expiry</th>
                                <th className="hidden lg:table-cell px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Usage</th>
                                <th className="hidden md:table-cell px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Min. Spend</th>
                                <th className="px-4 sm:px-8 py-4 sm:py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                [...Array(3)].map((_, i) => <tr key={i} className="h-20 animate-pulse bg-white/[0.01]"></tr>)
                            ) : (Array.isArray(discounts) && discounts.length > 0) ? discounts.map((discount) => (
                                <tr key={discount._id} className="hover:bg-white/[0.03] transition-colors group">
                                    <td className="px-4 sm:px-8 py-4 sm:py-6 font-bold text-brand-gold tracking-widest text-sm">{discount.code}</td>
                                    <td className="px-4 sm:px-8 py-4 sm:py-6 text-white font-medium text-xs">
                                        {discount.type === 'percentage' ? `${discount.value}% OFF` : `₦${discount.value.toLocaleString()} OFF`}
                                    </td>
                                    <td className="hidden sm:table-cell px-8 py-6 text-white/40 text-xs">
                                        {discount.expiryDate ? new Date(discount.expiryDate).toLocaleDateString() : 'Never'}
                                    </td>
                                    <td className="hidden lg:table-cell px-8 py-6 text-white/60 text-xs">
                                        {discount.usageCount || 0} / {discount.usageLimit || '∞'}
                                    </td>
                                    <td className="hidden md:table-cell px-8 py-6 text-white/40 text-xs text-center md:text-left">
                                        ₦{discount.minPurchase?.toLocaleString() || 0}
                                    </td>
                                    <td className="px-4 sm:px-8 py-4 sm:py-6 text-right">
                                        <div className="flex items-center justify-end gap-3 sm:gap-6">
                                            <span className={`px-2 sm:px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full border ${new Date(discount.expiryDate) < new Date() ? 'border-red-500/20 text-red-500' : 'border-green-500/20 text-green-500'
                                                }`}>
                                                {new Date(discount.expiryDate) < new Date() ? 'EXPIRED' : 'ACTIVE'}
                                            </span>
                                            <button
                                                onClick={() => deleteMutation.mutate(discount._id)}
                                                className="text-white/20 hover:text-red-500 transition-colors shrink-0"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-8 py-12 text-center text-white/40 text-sm">
                                        No discount codes yet. Create one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Discounts;
