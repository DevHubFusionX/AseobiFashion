import React, { useState } from 'react';
import { axiosInstance } from '../../lib/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const ACCENT = '#2765E6';
const STATUS_TABS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

// ─── Order Detail Modal ──────────────────────────────────────────
const OrderModal = ({ order, onClose, onStatusUpdate }) => {
    if (!order) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' };
            case 'Processing': return { bg: `bg-[${ACCENT}]/10`, text: `text-[${ACCENT}]`, border: `border-[${ACCENT}]/20` };
            case 'Shipped': return { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' };
            case 'Delivered': return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' };
            case 'Cancelled': return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' };
            default: return { bg: 'bg-white/10', text: 'text-white/40', border: 'border-white/20' };
        }
    };

    const statusStyle = getStatusColor(order.orderStatus);
    const orderDate = new Date(order.createdAt);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0c0c0c] border border-white/10 rounded-sm shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Header with accent bar */}
                <div className="sticky top-0 z-10 bg-[#0c0c0c] border-b border-white/5">
                    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}80, transparent)` }} />
                    <div className="px-6 sm:px-8 py-5 flex items-center justify-between">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/25 mb-1">Order Details</p>
                            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                                #{order._id.slice(-8).toUpperCase()}
                            </h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] rounded-full border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                {order.orderStatus}
                            </span>
                            <button onClick={onClose} className="text-white/30 hover:text-white transition-colors p-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-6 sm:px-8 py-6 space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: 'Total', value: `₦${order.totalAmount?.toLocaleString()}`, accent: true },
                            { label: 'Items', value: order.items?.length || 0 },
                            { label: 'Method', value: order.deliveryMethod || 'N/A' },
                            { label: 'Payment', value: order.paymentStatus || 'Pending' },
                        ].map(stat => (
                            <div key={stat.label} className="bg-white/[0.03] border border-white/5 rounded-sm p-3">
                                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/25 mb-1">{stat.label}</p>
                                <p className={`text-sm font-semibold ${stat.accent ? 'text-white' : 'text-white/60'}`} style={stat.accent ? { color: ACCENT } : {}}>
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Order Items */}
                    <div>
                        <h3 className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT }} />
                            Products Ordered
                        </h3>
                        <div className="space-y-2">
                            {order.items?.map((item, idx) => {
                                // Image: from item directly, or from populated product ref
                                const populatedProduct = typeof item.product === 'object' ? item.product : null;
                                const itemImage = item.image || populatedProduct?.image;
                                // Color: from item (new orders), or product's available colors (older orders)
                                const selectedColor = item.color;
                                const productColors = populatedProduct?.colors || [];

                                return (
                                    <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-sm px-3 py-3 hover:bg-white/[0.04] transition-colors">
                                        <div className="flex items-center gap-3">
                                            {/* Product Thumbnail */}
                                            {itemImage ? (
                                                <img
                                                    src={itemImage}
                                                    alt={item.name}
                                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm object-cover border border-white/10 shrink-0"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                    <svg className="w-5 h-5 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                </div>
                                            )}

                                            {/* Item Details */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-white truncate mb-0.5">{item.name}</p>
                                                <p className="text-[10px] text-white/30">
                                                    Qty: {item.quantity} × ₦{item.price?.toLocaleString()}
                                                </p>
                                            </div>

                                            {/* Line Total */}
                                            <span className="text-sm font-bold text-white/70 shrink-0">₦{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>

                                        {/* Color Info Row */}
                                        {(selectedColor || productColors.length > 0) && (
                                            <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-2 flex-wrap">
                                                <span className="text-[8px] font-black uppercase tracking-[0.15em] text-white/20">Color:</span>
                                                {selectedColor ? (
                                                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border text-white/80" style={{ borderColor: `${ACCENT}50`, backgroundColor: `${ACCENT}15`, color: ACCENT }}>
                                                        {selectedColor}
                                                    </span>
                                                ) : (
                                                    productColors.map((c, ci) => (
                                                        <span key={ci} className="text-[9px] font-medium px-2 py-0.5 rounded-full border border-white/10 text-white/40">
                                                            {c}
                                                        </span>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Customer & Shipping */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Customer Info */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-sm p-4">
                            <h3 className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25 mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT }} />
                                Customer
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <svg className="w-3.5 h-3.5 text-white/20 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    <span className="text-white font-medium">{order.customerInfo?.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <svg className="w-3.5 h-3.5 text-white/20 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <span className="text-white/50">{order.customerInfo?.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <svg className="w-3.5 h-3.5 text-white/20 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    <span className="text-white/50">{order.customerInfo?.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-sm p-4">
                            <h3 className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25 mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT }} />
                                Delivery
                            </h3>
                            <div className="space-y-2 text-sm text-white/50">
                                <p className="font-medium text-white/70">{order.deliveryMethod}</p>
                                {order.shippingAddress ? (
                                    <>
                                        <p>{order.shippingAddress.street}</p>
                                        <p>{order.shippingAddress.city}{order.shippingAddress.state ? `, ${order.shippingAddress.state}` : ''}</p>
                                        {order.shippingAddress.country && <p>{order.shippingAddress.country}</p>}
                                        {order.shippingAddress.zipCode && <p className="text-white/30 text-xs">ZIP: {order.shippingAddress.zipCode}</p>}
                                    </>
                                ) : (
                                    <p className="text-white/25 italic">Pickup — no shipping address</p>
                                )}
                                {order.trackingNumber && (
                                    <p className="font-mono text-xs" style={{ color: ACCENT }}>Tracking: {order.trackingNumber}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Timeline / Date Info */}
                    <div className="flex items-center justify-between text-[10px] text-white/20 px-1 pt-2 border-t border-white/5">
                        <span>
                            Created: {orderDate.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {order.paymentReference && (
                            <span className="font-mono">Ref: {order.paymentReference}</span>
                        )}
                    </div>

                    {/* Status Update */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25 shrink-0">Update Status:</label>
                        <select
                            value={order.orderStatus}
                            onChange={(e) => onStatusUpdate(order._id, e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 text-white text-xs font-semibold px-4 py-3 rounded-sm outline-none focus:border-[#2765E6] cursor-pointer"
                            style={{ borderColor: `${ACCENT}30` }}
                        >
                            {STATUS_OPTIONS.map(s => (
                                <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};


// ─── Main Admin Orders Page ──────────────────────────────────────
const AdminOrders = () => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [lookupCode, setLookupCode] = useState('');
    const [lookupLoading, setLookupLoading] = useState(false);
    const [lookupError, setLookupError] = useState('');

    const { data: orders, isLoading } = useQuery({
        queryKey: ['orders', activeTab],
        queryFn: async () => {
            const params = activeTab !== 'All' ? { status: activeTab } : {};
            const { data } = await axiosInstance.get('/orders', { params });
            return data.data || data || [];
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }) => axiosInstance.put(`/orders/${id}/status`, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            toast.success('Order status updated');
        },
        onError: () => toast.error('Failed to update status')
    });

    const handleStatusUpdate = (id, status) => {
        updateStatusMutation.mutate({ id, status });
        // Optimistically update the selected order in the modal
        if (selectedOrder && selectedOrder._id === id) {
            setSelectedOrder({ ...selectedOrder, orderStatus: status });
        }
    };

    // Order Code Lookup
    const handleLookup = async () => {
        const code = lookupCode.trim().replace('#', '');
        if (code.length < 4) {
            setLookupError('Enter at least 4 characters of the order code');
            return;
        }
        setLookupLoading(true);
        setLookupError('');
        try {
            // Search orders matching the code suffix
            const { data } = await axiosInstance.get('/orders');
            const allOrders = data.data || data || [];
            const match = allOrders.find(o =>
                o._id.toLowerCase().endsWith(code.toLowerCase()) ||
                o._id.toLowerCase().includes(code.toLowerCase())
            );
            if (match) {
                setSelectedOrder(match);
            } else {
                setLookupError(`No order found matching "${code}"`);
            }
        } catch {
            setLookupError('Failed to search orders');
        }
        setLookupLoading(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'Processing': return 'bg-[#2765E6]/10 text-[#2765E6] border-[#2765E6]/20';
            case 'Shipped': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'Delivered': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-white/10 text-white/40 border-white/20';
        }
    };

    const ordersList = Array.isArray(orders) ? orders : [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">Order Tracking</h1>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">
                        {ordersList.length} {ordersList.length === 1 ? 'Order' : 'Orders'} {activeTab !== 'All' ? `• ${activeTab}` : ''}
                    </p>
                </div>
            </div>

            {/* Order Lookup */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-5 sm:p-6">
                <h2 className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT }} />
                    Quick Order Lookup
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input
                            type="text"
                            value={lookupCode}
                            onChange={e => { setLookupCode(e.target.value.toUpperCase()); setLookupError(''); }}
                            onKeyDown={e => e.key === 'Enter' && handleLookup()}
                            placeholder="Enter order code e.g. 2765E6..."
                            className="w-full bg-white/5 border border-white/10 text-white text-sm font-mono px-4 py-3 pl-10 rounded-sm outline-none focus:border-[#2765E6] placeholder:text-white/15 transition-colors"
                            style={{ borderColor: lookupCode ? `${ACCENT}50` : undefined }}
                        />
                    </div>
                    <button
                        onClick={handleLookup}
                        disabled={lookupLoading || !lookupCode.trim()}
                        className="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white rounded-sm transition-all disabled:opacity-30 hover:opacity-90"
                        style={{ backgroundColor: ACCENT }}
                    >
                        {lookupLoading ? 'Searching...' : 'Find Order'}
                    </button>
                </div>
                {lookupError && (
                    <p className="mt-3 text-xs text-red-400/80">{lookupError}</p>
                )}
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-1 bg-white/5 p-1 rounded-sm border border-white/5">
                {STATUS_TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 sm:px-6 py-2.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-sm transition-colors ${activeTab === tab
                            ? 'text-white'
                            : 'text-white/30 hover:text-white/60'
                            }`}
                        style={activeTab === tab ? { backgroundColor: `${ACCENT}20`, color: ACCENT } : {}}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="px-4 sm:px-8 py-4 sm:py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Order ID</th>
                                <th className="px-4 sm:px-8 py-4 sm:py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Customer</th>
                                <th className="hidden md:table-cell px-6 sm:px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Method</th>
                                <th className="px-4 sm:px-8 py-4 sm:py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Amount</th>
                                <th className="hidden sm:table-cell px-6 sm:px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Status</th>
                                <th className="px-4 sm:px-8 py-4 sm:py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 sm:px-8 py-5"><div className="h-4 bg-white/5 rounded w-20" /></td>
                                        <td className="px-6 sm:px-8 py-5"><div className="h-4 bg-white/5 rounded w-28" /></td>
                                        <td className="hidden md:table-cell px-6 sm:px-8 py-5"><div className="h-4 bg-white/5 rounded w-16" /></td>
                                        <td className="px-6 sm:px-8 py-5"><div className="h-4 bg-white/5 rounded w-20" /></td>
                                        <td className="hidden sm:table-cell px-6 sm:px-8 py-5"><div className="h-6 bg-white/5 rounded w-20" /></td>
                                        <td className="px-6 sm:px-8 py-5" />
                                    </tr>
                                ))
                            ) : ordersList.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-16 text-center">
                                        <span className="text-3xl block mb-3" style={{ color: ACCENT }}>✧</span>
                                        <p className="text-white/30 text-sm">No orders found{activeTab !== 'All' ? ` with status "${activeTab}"` : ''}.</p>
                                    </td>
                                </tr>
                            ) : ordersList.map((order) => (
                                <tr
                                    key={order._id}
                                    className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <td className="px-4 sm:px-8 py-4 sm:py-5">
                                        <span className="text-xs font-mono font-bold text-white/60">#{order._id.slice(-8).toUpperCase()}</span>
                                        <span className="block text-[9px] text-white/20 mt-0.5">
                                            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-8 py-4 sm:py-5">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-sm font-bold tracking-tight text-white">{order.customerInfo?.name || 'N/A'}</span>
                                            <span className="text-[10px] text-white/25 font-medium truncate max-w-[140px]">{order.customerInfo?.email}</span>
                                        </div>
                                    </td>
                                    <td className="hidden md:table-cell px-6 sm:px-8 py-5">
                                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/40">{order.deliveryMethod || 'N/A'}</span>
                                    </td>
                                    <td className="px-4 sm:px-8 py-4 sm:py-5">
                                        <span className="text-sm font-semibold tracking-tight text-white">₦{order.totalAmount?.toLocaleString()}</span>
                                    </td>
                                    <td className="hidden sm:table-cell px-6 sm:px-8 py-5">
                                        <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] rounded-full border ${getStatusColor(order.orderStatus)}`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-8 py-4 sm:py-5 text-right" onClick={e => e.stopPropagation()}>
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-opacity underline underline-offset-4"
                                            style={{ color: ACCENT }}
                                        >
                                            View Info
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Info Modal */}
            {selectedOrder && (
                <OrderModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onStatusUpdate={handleStatusUpdate}
                />
            )}
        </div>
    );
};

export default AdminOrders;
