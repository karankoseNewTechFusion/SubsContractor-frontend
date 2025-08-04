import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, Edit, Download, Send, Delete, Payment, MoreVert } from '@mui/icons-material';
import CustomButton from '../../components/Button';
import CreateInvoice from './CreateInvoice';

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
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [showCollectPaymentModal, setShowCollectPaymentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    method: 'Cash',
    amount: '',
    transactionDate: new Date().toISOString().split('T')[0],
    details: ''
  });

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
              amount: "₹5,000.00",
              remainingBalance: "₹0.00",
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
              amount: "₹3,200.00",
              remainingBalance: "₹3,200.00",
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
              amount: "₹8,750.00",
              remainingBalance: "₹4,375.00",
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
              amount: "₹1,800.00",
              remainingBalance: "₹0.00",
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
    setShowEditModal(true);
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

  const handleCollectPayment = () => {
    // Convert dollar amount to rupee format and remove the rupee symbol from the value
    const remainingBalance = invoice?.remainingBalance || '';
    const rupeeAmount = remainingBalance.replace('$', '').replace('₹', ''); // Remove both $ and ₹ symbols
    
    setPaymentData({
      method: 'Cash',
      amount: rupeeAmount,
      transactionDate: new Date().toISOString().split('T')[0],
      details: `Payment applied to Invoice #{invoice?.invoiceNumber}`
    });
    setShowCollectPaymentModal(true);
  };

  const handlePaymentSave = () => {
    console.log('Saving payment:', paymentData);
    // Here you would typically save the payment to your backend
    setShowCollectPaymentModal(false);
    // Update invoice status if needed
  };

  const handlePaymentSaveAndEmail = () => {
    console.log('Saving payment and sending email receipt:', paymentData);
    // Here you would typically save the payment and send email receipt
    setShowCollectPaymentModal(false);
    // Update invoice status if needed
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
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
        overflow: "hidden",
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f7f9fa",
          padding: "12px 15px 12px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 8,
              color: "#222",
            }}
          >
            Invoice Details
          </div>
          <div style={{ color: "#666", fontSize: 18 }}>
            {invoice.invoiceNumber}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <CustomButton
            leftIcon={<Payment style={{ fontSize: 18 }} />}
            style={{
              background: "#10B981",
              color: "#ffffff",
              borderRadius: 8,
              fontWeight: 600,
              padding: "6px 14px",
              fontSize: 14,
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
              transition: "background 0.2s, color 0.2s",
            }}
            className="custom-action-btn"
            onClick={handleCollectPayment}
          >
            Collect Payment
          </CustomButton>
          <div className="relative">
            <CustomButton
              leftIcon={<MoreVert style={{ fontSize: 18 }} />}
              style={{
                background: "#f4f5f7",
                color: "#2563eb",
                borderRadius: 8,
                fontWeight: 600,
                padding: "6px 14px",
                fontSize: 14,
                boxShadow: "none",
                display: "flex",
                alignItems: "center",
                gap: 4,
                transition: "background 0.2s, color 0.2s",
              }}
              className="custom-action-btn"
              onClick={() => setShowMoreActions(!showMoreActions)}
            >
              More Actions
            </CustomButton>

            {showMoreActions && (
              <div
                style={{
                  position: "absolute",
                  top: 44,
                  right: 0,
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  zIndex: 10,
                  minWidth: 180,
                }}
              >
                <div style={{ padding: "4px" }}>
                  <button
                    onClick={() => {
                      handleEdit();
                      setShowMoreActions(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      textAlign: "left",
                      fontSize: 14,
                      color: "#222",
                      background: "transparent",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <Edit style={{ fontSize: 16 }} />
                    Edit Invoice
                  </button>
                  <button
                    onClick={() => {
                      console.log('Download invoice:', invoiceId);
                      setShowMoreActions(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      textAlign: "left",
                      fontSize: 14,
                      color: "#222",
                      background: "transparent",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <Download style={{ fontSize: 16 }} />
                    Download PDF
                  </button>
                  <button
                    onClick={() => {
                      console.log('Send invoice:', invoiceId);
                      setShowMoreActions(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      textAlign: "left",
                      fontSize: 14,
                      color: "#222",
                      background: "transparent",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <Send style={{ fontSize: 16 }} />
                    Send to Client
                  </button>
                  <div style={{ borderTop: "1px solid #eee", margin: "4px 0" }}></div>
                  <button
                    onClick={() => {
                      handleDelete();
                      setShowMoreActions(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      textAlign: "left",
                      fontSize: 14,
                      color: "#dc2626",
                      background: "transparent",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#fef2f2"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <Delete style={{ fontSize: 16 }} />
                    Delete Invoice
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: 15 }}>
        {/* Invoice Details Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            marginBottom: 32,
          }}
        >
          {/* Client Information Card */}
          <div
            style={{
              background: "#f8fafc",
              borderRadius: 12,
              padding: 20,
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 12,
              }}
            >
              Client Information
            </div>
            <div style={{ fontSize: 15, color: "#4b5563" }}>
              <div style={{ marginBottom: 8 }}>
                <strong>Name:</strong> {invoice.client}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>Email:</strong> {invoice.email}
              </div>
              {invoice.billingAddress && (
                <div>
                  <strong>Address:</strong> {invoice.billingAddress}
                </div>
              )}
            </div>
          </div>

          {/* Invoice Status Card */}
          <div
            style={{
              background: "#f8fafc",
              borderRadius: 12,
              padding: 20,
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 12,
              }}
            >
              Invoice Status
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  background: invoice.status === 'Paid' ? "#22c55e" : 
                             invoice.status === 'Unpaid' ? "#ef4444" : "#2563eb",
                  color: "#fff",
                  borderRadius: 20,
                  fontWeight: 600,
                  fontSize: 14,
                  padding: "6px 16px",
                }}
              >
                {invoice.status}
              </span>
            </div>
            <div style={{ fontSize: 15, color: "#4b5563" }}>
              <div style={{ marginBottom: 8 }}>
                <strong>Created:</strong> {invoice.date}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>Due Date:</strong> {invoice.dueDate}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>Amount:</strong> {invoice.amount}
              </div>
              <div>
                <strong>Remaining:</strong> {invoice.remainingBalance}
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        {invoice.notes && (
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                background: "#f8fafc",
                borderRadius: 12,
                padding: 20,
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 8,
                }}
              >
                Notes
              </div>
              <div style={{ fontSize: 15, color: "#4b5563" }}>
                {invoice.notes}
              </div>
            </div>
          </div>
        )}

        {/* Line Items */}
        {invoice.items && invoice.items.length > 0 && (
          <>
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                margin: "32px 0 14px 0",
                color: "#222",
              }}
            >
              Line Items
            </div>
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: 12,
                padding: 18,
                marginBottom: 18,
                background: "#fafbfc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 10,
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#222",
                }}
              >
                <div style={{ flex: 2 }}>Description</div>
                <div style={{ flex: 1, textAlign: "center" }}>Qty</div>
                <div style={{ flex: 1, textAlign: "center" }}>Unit Price</div>
                <div style={{ flex: 1, textAlign: "center" }}>Total</div>
              </div>
              {invoice.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8,
                    fontSize: 15,
                  }}
                >
                  <div style={{ flex: 2 }}>{item.description}</div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    {item.quantity}
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    ₹{item.unitPrice.toFixed(2)}
                  </div>
                  <div style={{ flex: 1, textAlign: "center", fontWeight: 600 }}>
                    ₹{item.total.toFixed(2)}
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: 12,
                  fontWeight: 700,
                  fontSize: 17,
                  color: "#222",
                }}
              >
                Total: {invoice.amount}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Invoice Modal */}
      {showEditModal && invoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-7xl max-h-[90vh] overflow-y-auto m-4">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Invoice - {invoice.invoiceNumber}
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <CreateInvoice
                clientId={invoice.id.toString()}
                onClose={() => setShowEditModal(false)}
                onInvoiceCreated={() => {
                  setShowEditModal(false);
                  // Navigate to the updated invoice detail page
                  navigate(`/invoicing/${invoice.id}`);
                }}
                isEdit={true}
                editData={invoice}
              />
            </div>
          </div>
        </div>
      )}

      {/* Collect Payment Modal */}
      {showCollectPaymentModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 24,
              width: '90%',
              maxWidth: 500,
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#0f766e',
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              Collect payment
            </div>

            {/* Payment Details Section */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>
                  Method
                </label>
                <select
                  value={paymentData.method}
                  onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 8,
                    fontSize: 14,
                    backgroundColor: '#fff',
                  }}
                >
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Check">Check</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>
                  Amount
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }}>
                    ₹
                  </span>
                  <input
                    type="text"
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 32px',
                      border: '1px solid #d1d5db',
                      borderRadius: 8,
                      fontSize: 14,
                    }}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>
                  Transaction date
                </label>
                <input
                  type="date"
                  value={paymentData.transactionDate}
                  onChange={(e) => setPaymentData({ ...paymentData, transactionDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>
                  Details
                </label>
                <textarea
                  value={paymentData.details}
                  onChange={(e) => setPaymentData({ ...paymentData, details: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 8,
                    fontSize: 14,
                    resize: 'vertical',
                  }}
                  placeholder="Payment details..."
                />
              </div>
            </div>

            {/* Client Details Section */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 700, color: '#374151', marginBottom: 12 }}>
                Client details
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#6b7280' }}>Invoice balance:</span>
                <span style={{ fontWeight: 600, color: '#374151' }}>{invoice?.remainingBalance}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Account balance:</span>
                <span style={{ fontWeight: 600, color: '#374151' }}>
                  ₹{(parseFloat(invoice?.remainingBalance?.replace('₹', '').replace(',', '') || '0') + 147400).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCollectPaymentModal(false)}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  backgroundColor: '#fff',
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentSaveAndEmail}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #10b981',
                  borderRadius: 8,
                  backgroundColor: '#fff',
                  color: '#10b981',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Save and Email Receipt
              </button>
              <button
                onClick={handlePaymentSave}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: 8,
                  backgroundColor: '#10b981',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetail; 