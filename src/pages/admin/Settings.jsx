import React, { useState } from 'react';
import { axiosInstance } from '../../lib/axios';
import toast from 'react-hot-toast';

const Settings = () => {
    const adminStr = localStorage.getItem('admin');
    const admin = adminStr ? JSON.parse(adminStr) : null;

    const [email, setEmail] = useState(admin?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        setIsLoading(true);
        try {
            const updateData = { email };
            if (password) updateData.password = password;

            const { data } = await axiosInstance.put('/admin/profile', updateData);

            if (data.success) {
                localStorage.setItem('admin', JSON.stringify(data.admin));
                toast.success('Security credentials updated');
                setPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            console.error('Update error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-semibold tracking-tight text-white mb-2">Security Vault</h1>
                <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">Access & Credential Management</p>
            </div>

            <div className="max-w-2xl">
                <form onSubmit={handleUpdate} className="bg-[#0a0a0a] border border-white/5 rounded-sm p-8 space-y-8">
                    <div className="space-y-6">
                        <div className="group">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Admin Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/10 px-6 py-4 text-sm text-white focus:outline-none focus:border-brand-gold/50 transition-all"
                                required
                            />
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-6">Update Security Key</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">New Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/[0.02] border border-white/10 px-6 py-4 text-sm text-white focus:outline-none focus:border-brand-gold/50 transition-all"
                                        placeholder="Leave blank to keep current"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-white/[0.02] border border-white/10 px-6 py-4 text-sm text-white focus:outline-none focus:border-brand-gold/50 transition-all"
                                        placeholder="Repeat new password"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-brand-gold text-brand-black px-12 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : 'Secure Updates'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 p-6 border border-red-500/10 bg-red-500/5 rounded-sm">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full border border-red-500/20 flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1">Security Protocol</h4>
                            <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-wider">
                                Changing your email or password will take effect immediately. Ensure you have documented your new credentials.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
