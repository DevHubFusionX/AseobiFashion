import React from 'react';
import { axiosInstance } from '../../lib/axios';
import { useQuery } from '@tanstack/react-query';

const fetchStats = async () => {
    const { data } = await axiosInstance.get('/admin/stats');
    return data;
};

const AdminDashboard = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: fetchStats,
        refetchInterval: 30000 // Refresh every 30s
    });

    const stats = data?.stats || {
        totalRevenue: 0,
        totalSales: 0,
        totalViews: 0,
        stockAlerts: 0,
        activeDiscounts: 0,
        newsletterSubscribers: 0
    };

    const statCards = [
        { label: 'Total Revenue', value: `₦${stats.totalRevenue.toLocaleString()}`, trend: 'Gross', status: 'neutral' },
        { label: 'Total Sales', value: stats.totalSales.toString(), trend: 'Orders', status: 'neutral' },
        { label: 'Stock Alerts', value: stats.stockAlerts.toString(), trend: stats.stockAlerts > 0 ? 'Urgent' : 'Healthy', status: stats.stockAlerts > 0 ? 'warning' : 'success' },
        { label: 'Active Discounts', value: stats.activeDiscounts.toString(), trend: 'Marketing', status: 'neutral' },
        { label: 'Newsletter', value: stats.newsletterSubscribers.toString(), trend: 'Audience', status: 'neutral' },
        { label: 'Total Views', value: stats.totalViews.toString(), trend: 'Engagement', status: 'neutral' },
    ];

    return (
        <div className="space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">Dashboard Overview</h1>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">Business Intelligence & Performance</p>
                </div>
            </div>

            {/* Grid for Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-white/5 p-3 sm:p-6 lg:p-8 rounded-sm hover:border-brand-gold/30 transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 blur-3xl -mr-12 -mt-12 group-hover:bg-brand-gold/10 transition-colors"></div>
                        <p className="text-[8px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 sm:mb-4 group-hover:text-brand-gold/60 transition-colors">{stat.label}</p>
                        <div className="flex flex-col gap-1 relative z-10">
                            <h3 className="text-lg sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white leading-none">{isLoading ? '...' : stat.value}</h3>
                            <span className={`text-[8px] sm:text-[8px] font-black uppercase tracking-widest leading-none ${
                                stat.status === 'success' ? 'text-green-500' :
                                stat.status === 'warning' ? 'text-red-500 animate-pulse' :
                                'text-brand-gold'
                            }`}>
                                {stat.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
                    <div className="p-4 sm:p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <h3 className="text-sm font-bold uppercase tracking-widest">Recent Activity</h3>
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest cursor-pointer hover:underline underline-offset-4">View All</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <tbody className="divide-y divide-white/5">
                                {isLoading ? (
                                    [...Array(5)].map((_, i) => <tr key={i} className="h-20 animate-pulse bg-white/[0.01]"></tr>)
                                ) : data?.recentOrders?.map((order) => (
                                    <tr key={order._id} className="hover:bg-white/[0.03] transition-colors">
                                        <td className="px-4 sm:px-8 py-4 sm:py-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-bold text-white">{order.customerInfo.name}</span>
                                                <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest leading-none">#{order._id.slice(-6).toUpperCase()}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-8 py-4 sm:py-6 hidden xs:table-cell">
                                            <span className="text-xs font-semibold text-white/60">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </td>
                                        <td className="px-4 sm:px-8 py-4 sm:py-6">
                                            <span className="text-sm font-bold text-brand-gold">₦{order.totalAmount.toLocaleString()}</span>
                                        </td>
                                        <td className="px-4 sm:px-8 py-4 sm:py-6 text-right">
                                            <span className={`px-2 sm:px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full border ${order.orderStatus === 'Delivered' ? 'border-green-500/20 text-green-500' : 'border-brand-gold/20 text-brand-gold'
                                                }`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm flex flex-col justify-between group">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-8">System Health</h3>
                        <div className="space-y-6">
                            {[
                                { label: 'API Status', value: 'Operational', color: 'text-green-500' },
                                { label: 'Database', value: 'Connected', color: 'text-green-500' },
                                { label: 'PWA Cache', value: 'Optimized', color: 'text-brand-gold' },
                                { label: 'Stock Level', value: stats.stockAlerts > 0 ? `${stats.stockAlerts} Alerts` : 'Stable', color: stats.stockAlerts > 0 ? 'text-red-500' : 'text-green-500' }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-12 p-4 bg-brand-gold/5 border border-brand-gold/10 rounded-sm">
                        <p className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.2em] leading-relaxed">
                            All systems are functioning within optimal parameters. Last backup: 4h ago.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
