'use client';

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
    color?: string;
    sizes?: { [size: string]: number };
}

interface InvoiceProps {
    invoiceNumber: string;
    date: string;
    dueDate: string;
    clientName: string;
    clientEmail: string;
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    total: number;
}

export default function InvoicePDF({ data }: { data: InvoiceProps }) {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownloadPdf = async () => {
        if (!invoiceRef.current) return;
        setIsGenerating(true);

        try {
            // Need a slight timeout to ensure DOM is fully stationary
            await new Promise(r => setTimeout(r, 100));

            const canvas = await html2canvas(invoiceRef.current, {
                scale: 2, // High resolution
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            // Calculate PDF dimensions (A4 size: 210mm x 297mm)
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`Invoice_${data.invoiceNumber}.pdf`);

        } catch (error) {
            console.error("Failed to generate PDF", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="flex justify-end pr-4">
                <button
                    onClick={handleDownloadPdf}
                    disabled={isGenerating}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                    {isGenerating ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                            Generating PDF...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Download PDF
                        </>
                    )}
                </button>
            </div>

            {/* The actual invoice container that will be screenshotted */}
            <div
                ref={invoiceRef}
                className="bg-white text-black p-10 md:p-14 rounded-2xl shadow-sm border border-black/10 mx-auto w-full aspect-[1/1.414]"
                style={{ width: '800px', maxWidth: '100%', minHeight: '1131px' }} // fixed A4 proportions roughly for good scaling
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-16">
                    <div>
                        <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight mb-2">INVOICE</h1>
                        <p className="text-sm font-bold text-black/40 uppercase tracking-wider">#{data.invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-2xl font-bold tracking-tight text-black mb-1">Printflow Demo Shop</h2>
                        <p className="text-sm text-black/60 font-medium">123 Ink Lane, Suite 400</p>
                        <p className="text-sm text-black/60 font-medium">Los Angeles, CA 90028</p>
                        <p className="text-sm text-black/60 font-medium">hello@printflow.io</p>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-12 mb-16">
                    <div>
                        <h3 className="text-xs font-bold text-black/40 uppercase tracking-wider mb-3">Bill To</h3>
                        <p className="text-lg font-bold text-black mb-1">{data.clientName}</p>
                        <p className="text-sm text-black/60 font-medium">{data.clientEmail}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 text-right">
                        <div>
                            <h3 className="text-xs font-bold text-black/40 uppercase tracking-wider mb-1">Invoice Date</h3>
                            <p className="text-sm font-bold text-black">{data.date}</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-black/40 uppercase tracking-wider mb-1">Due Date</h3>
                            <p className="text-sm font-bold text-black">{data.dueDate}</p>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-16">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-black/10">
                                <th className="py-4 text-xs font-bold text-black/40 uppercase tracking-wider w-1/2">Description</th>
                                <th className="py-4 text-xs font-bold text-black/40 uppercase tracking-wider text-center">Qty</th>
                                <th className="py-4 text-xs font-bold text-black/40 uppercase tracking-wider text-right">Unit Price</th>
                                <th className="py-4 text-xs font-bold text-black/40 uppercase tracking-wider text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((item, index) => (
                                <React.Fragment key={index}>
                                    <tr className={item.sizes ? "" : "border-b border-black/5"}>
                                        <td className="py-5 text-sm font-bold text-black border-none align-top">
                                            {item.description}
                                            {item.color && <div className="text-xs font-semibold text-black/50 mt-1 uppercase tracking-wider">Color: {item.color}</div>}
                                        </td>
                                        <td className="py-5 text-sm font-medium text-black/70 text-center border-none align-top">{item.quantity}</td>
                                        <td className="py-5 text-sm font-medium text-black/70 text-right border-none align-top">${item.unitPrice.toFixed(2)}</td>
                                        <td className="py-5 text-sm font-bold text-black text-right border-none align-top">${item.total.toFixed(2)}</td>
                                    </tr>
                                    {item.sizes && (
                                        <tr className="border-b border-black/5">
                                            <td colSpan={4} className="pb-5 pt-0">
                                                <div className="bg-black/[0.03] border border-black/10 rounded-lg overflow-hidden inline-flex max-w-full">
                                                    {Object.entries(item.sizes).map(([size, amount], idx) => (
                                                        <div key={size} className={`flex flex-col text-center min-w-[40px] ${idx > 0 ? 'border-l border-black/10' : ''}`}>
                                                            <div className="text-[10px] font-bold text-black/50 bg-black/5 py-1 uppercase px-2">{size}</div>
                                                            <div className="text-xs font-bold text-black bg-white py-1.5 px-2">{amount}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-16">
                    <div className="w-1/2 md:w-1/3">
                        <div className="flex justify-between py-3 border-b border-black/5">
                            <span className="text-sm font-bold text-black/50">Subtotal</span>
                            <span className="text-sm font-bold text-black">${data.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-black/5">
                            <span className="text-sm font-bold text-black/50">Tax (8.5%)</span>
                            <span className="text-sm font-bold text-black">${data.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-4">
                            <span className="text-lg font-bold text-black">Total Due</span>
                            <span className="text-xl font-extrabold text-blue-600">${data.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-16 border-t border-black/10">
                    <p className="text-xs font-bold text-black/40 text-center uppercase tracking-wider">Thank you for your business!</p>
                </div>
            </div>
        </div>
    );
}
