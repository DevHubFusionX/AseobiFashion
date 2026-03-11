import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios';
import { ROUTES } from '../../constants/routes';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || ROUTES.ADMIN_DASHBOARD;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data } = await axiosInstance.post('/admin/login', { email, password });

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('admin', JSON.stringify(data.admin));
                toast.success('Access Granted. Welcome back.');
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.error('Login error:', error);
            // Error toast is handled by axios interceptor
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-body selection:bg-brand-gold/30">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-12">
                    <div className="inline-block p-4 border border-brand-gold/20 bg-brand-gold/5 mb-6">
                        <span className="text-brand-gold font-bold tracking-[0.5em] text-xl uppercase">Favour</span>
                    </div>
                    <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Management Console</h1>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">Restricted Access Area</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="group">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-brand-gold transition-colors">
                                Identification
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Admin Email"
                                className="w-full bg-white/[0.02] border border-white/5 px-6 py-4 text-sm text-white focus:outline-none focus:border-brand-gold/50 focus:bg-white/[0.04] transition-all placeholder:text-white/10"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-brand-gold transition-colors">
                                SECURITY KEY
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                                className="w-full bg-white/[0.02] border border-white/5 px-6 py-4 text-sm text-white focus:outline-none focus:border-brand-gold/50 focus:bg-white/[0.04] transition-all placeholder:text-white/10"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-brand-gold text-brand-black px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                        <span className="relative z-10">{isLoading ? 'Authenticating...' : 'Enter Console'}</span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </button>

                    <div className="pt-8 text-center border-t border-white/5">
                        <p className="text-[9px] text-white/10 font-bold uppercase tracking-widest">
                            Authorized personnel only. All access is logged and monitored.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
