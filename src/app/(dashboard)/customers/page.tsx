'use client';

import React, { useState } from 'react';

const MOCK_CUSTOMERS = [
    { id: 'CUST-001', name: 'Wayne Enterprises', email: 'bruce@wayne.com', phone: '555-0102', orders: 4, ltv: '$12,450.00', status: 'Active' },
    { id: 'CUST-002', name: 'Stark Industries', email: 'tony@stark.com', phone: '555-0199', orders: 12, ltv: '$45,890.00', status: 'Active' },
    { id: 'CUST-003', name: 'Daily Planet', email: 'clark@dailyplanet.com', phone: '555-0144', orders: 1, ltv: '$450.00', status: 'Inactive' },
    { id: 'CUST-004', name: 'Acme Corp', email: 'wile@acme.com', phone: '555-0133', orders: 8, ltv: '$8,200.00', status: 'Active' },
];

export default function CustomersPage() {
    const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeCustomer, setActiveCustomer] = useState<typeof MOCK_CUSTOMERS[0] | null>(null);

    const handleCopyLink = (customerId: string) => {
        const link = `https://printflow.io/client/${customerId.toLowerCase()}`;
        navigator.clipboard.writeText(link);
        alert(`Copied secure link to clipboard:\n${link}\n\nSend this to your customer so they can track all their historical orders and active proofs!`);
    };

    const handleEdit = (customer: typeof MOCK_CUSTOMERS[0]) => {
        setActiveCustomer(customer);
        setIsEditModalOpen(true);
    };

    return (
        <div className="p-8 h-full mx-auto max-w-7xl flex flex-col">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-black/90 dark:text-white/90">Customers</h1>
                    <p className="text-sm font-medium text-black/50 dark:text-white/50 mt-1.5">Manage your client list and tracking portals.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Add Customer
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-hidden border border-black/5 dark:border-white/5 rounded-[2rem] bg-white/40 dark:bg-black/20 relative">
                {/* Subtle decorative glow */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>

                <div className="overflow-x-auto h-full">
                    <table className="w-full text-left border-collapse relative z-10">
                        <thead>
                            <tr>
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 border-b border-black/5 dark:border-white/5">Customer Name</th>
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 border-b border-black/5 dark:border-white/5">Contact</th>
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 border-b border-black/5 dark:border-white/5">Order Log</th>
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40 border-b border-black/5 dark:border-white/5">Lifetime Value</th>
                                <th className="py-4 px-6 border-b border-black/5 dark:border-white/5"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id} className="group border-b border-black/[0.02] dark:border-white/[0.02] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-sm font-bold shadow-inner">{customer.name.charAt(0)}</div>
                                            <div>
                                                <div className="font-bold text-sm text-black/90 dark:text-white/90">{customer.name}</div>
                                                <div className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-widest">{customer.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm font-medium text-black/70 dark:text-white/70">{customer.email}</div>
                                        <div className="text-xs text-black/40 dark:text-white/40">{customer.phone}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center justify-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1 rounded-lg text-xs font-bold">{customer.orders} Orders</span>
                                    </td>
                                    <td className="py-4 px-6 font-mono text-sm font-bold text-black/80 dark:text-white/80">
                                        {customer.ltv}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleCopyLink(customer.id)} className="p-2 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 rounded-xl transition-colors tooltip" title="Copy Tracking Portal Link">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                                            </button>
                                            <button onClick={() => handleEdit(customer)} className="p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black/60 dark:text-white/60 rounded-xl transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Customer Modal */}
            {isEditModalOpen && activeCustomer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#111] w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl border border-black/10 dark:border-white/10 flex flex-col gap-6 relative overflow-hidden text-left">

                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Edit Client Profile</h2>
                            <p className="text-sm font-medium text-black/50 dark:text-white/50 mt-1">
                                Update the CRM record for {activeCustomer.name}.
                            </p>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-2 block">Company Name</label>
                                <input type="text" defaultValue={activeCustomer.name} className="w-full text-sm font-medium px-4 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-2 block">Email Address</label>
                                    <input type="email" defaultValue={activeCustomer.email} className="w-full text-sm font-medium px-4 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-2 block">Phone Number</label>
                                    <input type="text" defaultValue={activeCustomer.phone} className="w-full text-sm font-medium px-4 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                                </div>
                            </div>
                            <div className="pt-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-2 block">Account Status</label>
                                <select defaultValue={activeCustomer.status} className="w-full text-sm font-medium px-4 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer">
                                    <option value="Active">Active Client</option>
                                    <option value="Inactive">Inactive / Suspended</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-4 relative z-10">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-5 py-2.5 rounded-xl text-sm font-bold text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-95"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
