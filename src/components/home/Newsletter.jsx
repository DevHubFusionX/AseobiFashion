import React, { useState } from 'react';

/**
 * Newsletter subscription component with a premium, non-generic aesthetic.
 */
const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (data.success) {
                setStatus('success');
                setEmail('');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Newsletter error:', error);
            setStatus('error');
        }
    };

    return (
        <section className="py-24 bg-stone-50 overflow-hidden relative">
            {/* Background Decorative Text */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                <span className="text-[20vw] font-display italic font-bold text-brand-black whitespace-nowrap">
                    Atelier Membership
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-brand-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">
                            Privileged Access
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-semibold text-brand-black mb-6 tracking-tight">
                            Join our exclusive <br />
                            <span className="italic font-display text-brand-gold text-5xl sm:text-6xl">Textile Atelier</span>
                        </h2>
                        <p className="text-black/60 text-base sm:text-lg leading-relaxed max-w-md">
                            Receive first-look access to heritage archives, bespoke milling alerts, and private trade invitations.
                        </p>
                    </div>

                    <div className="relative">
                        {status === 'success' ? (
                            <div className="bg-white p-12 text-center rounded-sm border border-brand-gold/20 shadow-xl animate-fade-in-up">
                                <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-brand-black">Welcome to the Atelier</h3>
                                <p className="text-black/50 text-sm">A confirmation has been sent to your inbox.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-8 text-[10px] font-bold tracking-widest uppercase text-brand-gold hover:text-black transition-colors"
                                >
                                    Dismiss
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 group">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="flex-1 bg-white border border-black/10 px-8 py-5 text-sm focus:outline-none focus:border-brand-gold transition-all placeholder:text-black/20"
                                />
                                <button
                                    disabled={status === 'loading'}
                                    className="bg-brand-black text-white px-10 py-5 text-xs font-bold tracking-widest uppercase hover:bg-brand-gold transition-colors disabled:opacity-50 relative overflow-hidden"
                                >
                                    {status === 'loading' ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                                    ) : (
                                        "Subscribe"
                                    )}
                                </button>
                            </form>
                        )}
                        <p className="mt-4 text-[10px] text-black/30 font-medium uppercase tracking-widest text-center sm:text-left">
                            We respect your creative privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
