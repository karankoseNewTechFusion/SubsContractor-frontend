import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, Edit, Download, Send, Delete } from '@mui/icons-material';
import CustomButton from '../../components/Button';

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Invoice {
  id: number;
  invoiceNumber: string;
  client: string;
  email: string;
  date: string;
  dueDate: string;
  amount: string;
  remainingBalance: string;
  status: string;
  billingAddress?: string;
  notes?: string;
  items?: InvoiceItem[];
}

const InvoiceDetail = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load invoice data from localStorage
    const loadInvoice = () => {
      try {
        const savedInvoices = JSON.parse(localStorage.getItem('draftInvoices') || '[]');
        const foundInvoice = savedInvoices.find((inv: Invoice) => inv.id === Number(invoiceId));
        
        if (foundInvoice) {
          setInvoice(foundInvoice);
        } else {
          // If not found in saved invoices, check default invoices
          const defaultInvoices = [
            {
              id: 1,
              invoiceNumber: "INV-202401-001",
              client: "Acme Corporation",
              email: "billing@acme.com",
              date: "Jan 15, 2024",
              dueDate: "Feb 15, 2024",
              amount: "$5,000.00",
              remainingBalance: "$0.00",
              status: "Paid",
              billingAddress: "123 Business St, City, State 12345",
              notes: "Payment received on time. Thank you for your business!",
              items: [
                { description: "Web Development Services", quantity: 1, unitPrice: 5000, total: 5000 }
              ]
            },
            {
              id: 2,
              invoiceNumber: "INV-202401-002",
              client: "TechStart Inc",
              email: "finance@techstart.com",
              date: "Jan 20, 2024",
              dueDate: "Feb 20, 2024",
              amount: "$3,200.00",
              remainingBalance: "$3,200.00",
              status: "Unpaid",
              billingAddress: "456 Tech Ave, City, State 12345",
              notes: "Please pay within 30 days of invoice date.",
              items: [
                { description: "Mobile App Development", quantity: 1, unitPrice: 3200, total: 3200 }
              ]
            },
            {
              id: 3,
              invoiceNumber: "INV-202401-003",
              client: "Global Solutions",
              email: "accounts@globalsolutions.com",
              date: "Jan 25, 2024",
              dueDate: "Feb 25, 2024",
              amount: "$8,750.00",
              remainingBalance: "$4,375.00",
              status: "Unpaid",
              billingAddress: "789 Global Blvd, City, State 12345",
              notes: "Partial payment received. Remaining balance due.",
              items: [
                { description: "Consulting Services", quantity: 35, unitPrice: 250, total: 8750 }
              ]
            },
            {
              id: 4,
              invoiceNumber: "INV-202401-004",
              client: "Innovation Labs",
              email: "finance@innovationlabs.com",
              date: "Jan 28, 2024",
              dueDate: "Feb 28, 2024",
              amount: "$1,800.00",
              remainingBalance: "$0.00",
              status: "Paid",
              billingAddress: "321 Innovation Dr, City, State 12345",
              notes: "Project completed successfully. Payment received.",
              items: [
                { description: "UI/UX Design", quantity: 1, unitPrice: 1800, total: 1800 }
              ]
            }
          ];
          
          const defaultInvoice = defaultInvoices.find(inv => inv.id === Number(invoiceId));
          if (defaultInvoice) {
            setInvoice(defaultInvoice);
          }
        }
      } catch (error) {
        console.error('Error loading invoice:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [invoiceId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    // Navigate to edit page (future implementation)
    console.log('Edit invoice:', invoiceId);
  };

  const handleDownload = () => {
    console.log('Download invoice:', invoiceId);
  };

  const handleSend = () => {
    console.log('Send invoice:', invoiceId);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      // Remove from localStorage
      const savedInvoices = JSON.parse(localStorage.getItem('draftInvoices') || '[]');
      const updatedInvoices = savedInvoices.filter((inv: Invoice) => inv.id !== Number(invoiceId));
      localStorage.setItem('draftInvoices', JSON.stringify(updatedInvoices));
      
      // Navigate back
      navigate(-1);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Unpaid':
        return 'bg-red-100 text-red-800';
      case 'Draft':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading invoice...</div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Invoice not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <CustomButton
              leftIcon={<ArrowBack />}
              color="#F0F1F4"
              textColor="#374151"
              className="px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              onClick={handleBack}
            >
              Back
            </CustomButton>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Invoice Details
              </h1>
              <p className="text-gray-600 text-lg">
                {invoice.invoiceNumber}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <CustomButton
              leftIcon={<Edit />}
              color="#F0F1F4"
              textColor="#374151"
              className="px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              onClick={handleEdit}
            >
              Edit
            </CustomButton>
            <CustomButton
              leftIcon={<Download />}
              color="#F0F1F4"
              textColor="#374151"
              className="px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              onClick={handleDownload}
            >
              Download
            </CustomButton>
            <CustomButton
              leftIcon={<Send />}
              color="#F0F1F4"
              textColor="#374151"
              className="px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              onClick={handleSend}
            >
              Send
            </CustomButton>
            <CustomButton
              leftIcon={<Delete />}
              color="#FEF2F2"
              textColor="#DC2626"
              className="px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
              onClick={handleDelete}
            >
              Delete
            </CustomButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Invoice Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                  <p className="text-lg font-semibold text-gray-900">{invoice.invoiceNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
                  <p className="text-gray-900">{invoice.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <p className="text-gray-900">{invoice.dueDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <p className="text-lg font-semibold text-blue-600">{invoice.amount}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Remaining Balance</label>
                  <p className="text-lg font-semibold text-gray-900">{invoice.remainingBalance}</p>
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Client Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                  <p className="text-gray-900">{invoice.client}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <p className="text-gray-900">{invoice.email}</p>
                </div>
                {invoice.billingAddress && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
                    <p className="text-gray-900">{invoice.billingAddress}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Line Items */}
            {invoice.items && invoice.items.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Line Items</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">Quantity</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">Unit Price</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-900">{item.description}</td>
                          <td className="py-3 px-4 text-right text-gray-900">{item.quantity}</td>
                          <td className="py-3 px-4 text-right text-gray-900">${item.unitPrice.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-900">${item.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Notes */}
            {invoice.notes && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notes</h3>
                <p className="text-gray-700">{invoice.notes}</p>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Amount</span>
                  <span className="text-lg font-semibold text-blue-600">{invoice.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Status</span>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Remaining Balance</span>
                  <span className="text-lg font-semibold text-gray-900">{invoice.remainingBalance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail; 