import React from 'react';
import { axiosInstance } from '../../lib/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const NewsletterSubscribers = () => {
    const queryClient = useQueryClient();

    const { data: subscribers, isLoading } = useQuery({
        queryKey: ['subscribers'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/newsletter');
            return data.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axiosInstance.delete(`/newsletter/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['subscribers']);
            toast.success('Subscriber removed');
        }
    });

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">Audience Control</h1>
                <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">Atelier Membership & Communication</p>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-brand-gold">Subscriber List</h3>
                    <div className="flex gap-4">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                            Total: {subscribers?.length || 0}
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-4 sm:px-8 py-4 sm:py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Email Address</th>
                                <th className="hidden sm:table-cell px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Joined Date</th>
                                <th className="px-4 sm:px-8 py-4 sm:py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-right">Management</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => <tr key={i} className="h-20 animate-pulse bg-white/[0.01]"></tr>)
                            ) : subscribers?.map((sub) => (
                                <tr key={sub._id} className="hover:bg-white/[0.03] transition-colors group">
                                    <td className="px-4 sm:px-8 py-4 sm:py-6">
                                        <span className="text-sm font-semibold text-white tracking-tight break-all">{sub.email}</span>
                                    </td>
                                    <td className="hidden sm:table-cell px-8 py-6 text-white/40 text-xs">
                                        {new Date(sub.createdAt).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-4 sm:px-8 py-4 sm:py-6 text-right">
                                        <button
                                            onClick={() => deleteMutation.mutate(sub._id)}
                                            className="text-[10px] font-black uppercase tracking-widest text-red-500/40 hover:text-red-500 transition-colors"
                                        >
                                            Revoke
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {!isLoading && subscribers?.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-white/20 text-xs uppercase tracking-widest font-bold">No subscribers found in current archive.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsletterSubscribers;
