import React from 'react';
import SEO from '../components/common/SEO';

const Contact = () => {
    return (
        <div className="bg-white min-h-screen font-body pt-24 sm:pt-32 pb-20">
            <SEO
                title="Contact Us | Bespoke Service"
                description="Get in touch with Moderate's Textile. Whether you have questions about our collections, wholesale opportunities, or bespoke milling, we are here to assist."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="max-w-3xl mb-16 md:mb-24">
                    <span className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">Concierge</span>
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-brand-black mb-6">
                        Exquisite Support for <br />
                        <span className="italic font-display text-brand-gold">Discerning Creators</span>
                    </h1>
                    <p className="text-lg text-black/60 leading-relaxed">
                        Our team is available to assist you with material selection, order tracking, and custom sourcing requests. We respond to all inquiries within 24 hours.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Contact Form - Spans 7 on large */}
                    <div className="lg:col-span-7 bg-stone-50 p-8 sm:p-12 rounded-sm border border-black/5">
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-semibold tracking-widest text-black/40 uppercase mb-3">Full Name</label>
                                    <input type="text" className="w-full bg-transparent border-b border-black/10 py-3 text-brand-black focus:outline-none focus:border-brand-gold transition-colors placeholder:text-black/20" placeholder="Alexander McQueen" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold tracking-widest text-black/40 uppercase mb-3">Email Address</label>
                                    <input type="email" className="w-full bg-transparent border-b border-black/10 py-3 text-brand-black focus:outline-none focus:border-brand-gold transition-colors placeholder:text-black/20" placeholder="alexander@ McQueen.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-semibold tracking-widest text-black/40 uppercase mb-3">Subject</label>
                                <select className="w-full bg-transparent border-b border-black/10 py-3 text-brand-black focus:outline-none focus:border-brand-gold transition-colors appearance-none cursor-pointer">
                                    <option>General Inquiry</option>
                                    <option>Wholesale/Trade Account</option>
                                    <option>Custom Sourcing Request</option>
                                    <option>Order Status</option>
                                    <option>Press & Media</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-semibold tracking-widest text-black/40 uppercase mb-3">Message</label>
                                <textarea rows="4" className="w-full bg-transparent border-b border-black/10 py-3 text-brand-black focus:outline-none focus:border-brand-gold transition-colors resize-none placeholder:text-black/20" placeholder="Tell us how we can assist your creative process..."></textarea>
                            </div>
                            <button className="bg-brand-black text-white px-10 py-5 text-xs font-semibold tracking-widest uppercase hover:bg-brand-gold transition-colors w-full sm:w-auto">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Direct Contact Info - Spans 5 on large */}
                    <aside className="lg:col-span-5 space-y-12 lg:pl-8">
                        {/* WhatsApp CTA */}
                        <div className="glass-premium p-8 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-semibold mb-3">Bespoke WhatsApp Assistance</h3>
                                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                                    Need immediate answers? Start a conversation with our textile experts directly on WhatsApp for real-time support and swatch consultations.
                                </p>
                                <a
                                    href="https://wa.me/234XXXXXXXXXX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-white text-brand-black px-6 py-3 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-brand-gold hover:text-white transition-all transform hover:scale-105"
                                >
                                    Start Chat
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.204l-.651 2.375 2.431-.637c.881.482 1.884.736 2.962.737 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.767-5.766zm3.385 8.195c-.147.412-.729.743-1.002.791-.274.048-.544.084-1.57-.333-1.025-.417-1.85-.921-2.483-1.638-.158-.179-.313-.357-.442-.56-.632-.988-.838-1.543-.838-2.316 0-.773.318-1.393.585-1.58.267-.187.585-.234.773-.234.188 0 .375.001.539.011l.144.015c.164.01.218.024.316.248l.38 1.144c.059.176.117.353.159.458.042.105.07.228.001.365-.069.137-.104.223-.208.342-.104.119-.219.266-.312.357-.104.101-.212.211-.091.418.121.206.539.889 1.156 1.438.794.708 1.46.927 1.666 1.023.206.096.326.079.447-.06.121-.139.518-.601.657-.806.139-.206.279-.172.469-.103s1.201.567 1.411.671c.209.104.349.155.398.241.049.086.049.499-.098.911z" /></svg>
                                </a>
                            </div>
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.204l-.651 2.375 2.431-.637c.881.482 1.884.736 2.962.737 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.767-5.766zm3.385 8.195c-.147.412-.729.743-1.002.791-.274.048-.544.084-1.57-.333-1.025-.417-1.85-.921-2.483-1.638-.158-.179-.313-.357-.442-.56-.632-.988-.838-1.543-.838-2.316 0-.773.318-1.393.585-1.58.267-.187.585-.234.773-.234.188 0 .375.001.539.011l.144.015c.164.01.218.024.316.248l.38 1.144c.059.176.117.353.159.458.042.105.07.228.001.365-.069.137-.104.223-.208.342-.104.119-.219.266-.312.357-.104.101-.212.211-.091.418.121.206.539.889 1.156 1.438.794.708 1.46.927 1.666 1.023.206.096.326.079.447-.06.121-.139.518-.601.657-.806.139-.206.279-.172.469-.103s1.201.567 1.411.671c.209.104.349.155.398.241.049.086.049.499-.098.911z" /></svg>
                            </div>
                        </div>

                        {/* Physical Presence */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-semibold tracking-widest text-black/40 uppercase">Global Headquarters</h3>
                            <div>
                                <p className="text-brand-black font-semibold text-lg mb-1">Victoria Island, Lagos</p>
                                <p className="text-black/50 text-sm leading-relaxed">
                                    Number 42, Textile Way, <br />
                                    Adetola Estate, Victoria Island, <br />
                                    Lagos, Nigeria
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <a href="mailto:info@moderatestextile.com" className="text-brand-gold text-sm font-medium hover:underline">info@moderatestextile.com</a>
                                <span className="text-black/40 text-sm">+234 800 000 0000</span>
                            </div>
                        </div>

                        {/* Operational Hours */}
                        <div className="space-y-4 pt-8 border-t border-black/5">
                            <h3 className="text-[10px] font-semibold tracking-widest text-black/40 uppercase">Operational Hours</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex flex-col">
                                    <span className="font-semibold">Monday — Friday</span>
                                    <span className="text-black/50">09:00 — 18:00 WAT</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold">Saturday</span>
                                    <span className="text-black/50">10:00 — 16:00 WAT</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Contact;
