import React, { useState } from 'react';
import { ArrowBack, Save, Send, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../components/Button';
import InvoicePreview from './InvoicePreview';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  // Mock client data - in a real app this would come from an API
  const clientData = {
    1: { name: "Acme Corporation", email: "Billing@Acme.Com", address: "123 Business St, City, State 12345" },
    2: { name: "TechStart Inc", email: "Finance@Techstart.Com", address: "456 Tech Ave, City, State 12345" },
    3: { name: "Global Solutions", email: "accounts@globalsolutions.com", address: "789 Global Blvd, City, State 12345" },
    4: { name: "Innovation Labs", email: "finance@innovationlabs.com", address: "321 Innovation Dr, City, State 12345" },
    5: { name: "Metro Construction", email: "billing@metroconstruction.com", address: "654 Construction Way, City, State 12345" },
    6: { name: "Digital Dynamics", email: "accounts@digitaldynamics.com", address: "987 Digital Lane, City, State 12345" }
  };

  const selectedClient = clientData[Number(clientId) as keyof typeof clientData];

  // Auto-generate invoice number
  const generateInvoiceNumber = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `INV-${year}${month}-${randomNum}`;
  };

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: generateInvoiceNumber(),
    clientName: selectedClient?.name || '',
    clientEmail: selectedClient?.email || '',
    billingAddress: selectedClient?.address || '',
    invoiceDate: '2025-07-15',
    dueDate: '',
    items: [
      { description: '', quantity: 1, unitPrice: 0, total: 0 }
    ],
    notes: ''
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSaveDraft = () => {
    // Save invoice as draft
    console.log('Saving draft invoice...', invoiceData);
    
    // Create new invoice object
    const newInvoice = {
      id: Date.now(), // Use timestamp as unique ID
      invoiceNumber: invoiceData.invoiceNumber,
      client: invoiceData.clientName,
      email: invoiceData.clientEmail,
      date: invoiceData.invoiceDate,
      dueDate: invoiceData.dueDate,
      amount: `$${totalAmount.toFixed(2)}`,
      remainingBalance: `$${totalAmount.toFixed(2)}`,
      status: "Draft"
    };
    
    // Store in localStorage for now (in real app, save to database)
    const existingInvoices = JSON.parse(localStorage.getItem('draftInvoices') || '[]');
    existingInvoices.unshift(newInvoice);
    localStorage.setItem('draftInvoices', JSON.stringify(existingInvoices));
    
    // Navigate back to invoices list
    navigate('../');
  };

  const handleSendInvoice = () => {
    // Show preview modal
    setShowPreview(true);
  };

  const handleSendInvoiceConfirm = () => {
    // Send invoice to client
    console.log('Sending invoice...', invoiceData);
    
    // Create new invoice object
    const newInvoice = {
      id: Date.now(), // Use timestamp as unique ID
      invoiceNumber: invoiceData.invoiceNumber,
      client: invoiceData.clientName,
      email: invoiceData.clientEmail,
      date: invoiceData.invoiceDate,
      dueDate: invoiceData.dueDate,
      amount: `$${totalAmount.toFixed(2)}`,
      remainingBalance: `$${totalAmount.toFixed(2)}`,
      status: "Unpaid"
    };
    
    // Store in localStorage for now (in real app, save to database)
    const existingInvoices = JSON.parse(localStorage.getItem('draftInvoices') || '[]');
    existingInvoices.unshift(newInvoice);
    localStorage.setItem('draftInvoices', JSON.stringify(existingInvoices));
    
    // Close preview and navigate back to invoices list
    setShowPreview(false);
    navigate('../');
  };

  const handleDownloadPDF = () => {
    // Download PDF functionality
    console.log('Downloading PDF...', invoiceData);
  };

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]
    }));
  };

  const removeItem = (index: number) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index: number, field: string, value: any) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const totalAmount = invoiceData.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl mx-auto p-6  ">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Invoice
            </h1>
            {selectedClient && (
              <p className="text-gray-600 text-lg">
                Create invoice for {selectedClient.name}
              </p>
            )}
          </div>
          <CustomButton
            leftIcon={<ArrowBackIcon />}
            color="#F0F1F4"
            textColor="#374151"
            className="px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            onClick={() => navigate('../select-client')}
          >
            Back To Clients
          </CustomButton>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Invoice Form */}
          <div className="xl:col-span-3 space-y-6">
            {/* Client Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Invoice Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={invoiceData.invoiceNumber}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="INV-2024-001"
                    />
                    <button
                      type="button"
                      onClick={() => setInvoiceData(prev => ({ ...prev, invoiceNumber: generateInvoiceNumber() }))}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      title="Generate new invoice number"
                    >
                      🔄
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={invoiceData.clientName}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, clientName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Client Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Email *
                  </label>
                  <input
                    type="email"
                    value={invoiceData.clientEmail}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, clientEmail: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Client@Example.Com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Date
                  </label>
                  <input
                    type="date"
                    value={invoiceData.invoiceDate}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="MM/DD/YYYY"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Billing Address
                  </label>
                  <textarea
                    value={invoiceData.billingAddress}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, billingAddress: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter billing address"
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Line Items</h3>
                <button
                  onClick={addItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  + Add Item
                </button>
              </div>
              
              {/* Table Headers */}
              <div className="grid grid-cols-12 gap-4 items-center mb-4 text-sm font-medium text-gray-700 bg-gray-50 p-3 rounded-lg">
                <div className="col-span-6">Description</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Unit Price</div>
                <div className="col-span-2">Total</div>
              </div>
              
                              <div className="space-y-3">
                  {invoiceData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 items-center p-3 bg-gray-50 rounded-lg">
                      <div className="col-span-6">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Item Description"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="1"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm font-medium text-gray-900">
                          ${item.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            {/* Additional Notes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Notes</h3>
              <textarea
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Add Any Additional Notes Or Payment Terms...."
              />
            </div>
          </div>

          {/* Invoice Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Summary</h3>
              <div className="space-y-4">
                <div className="pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-blue-600">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <CustomButton
            color="#6b7280"
            textColor="#ffffff"
            className="px-8 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            onClick={handleSaveDraft}
          >
            Save As Draft
          </CustomButton>
          <CustomButton
            color="#2563eb"
            textColor="#ffffff"
            className="px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={handleSendInvoice}
          >
            Save & Send
          </CustomButton>
        </div>
      </div>

      {/* Invoice Preview Modal */}
      <InvoicePreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        invoiceData={invoiceData}
        onSend={handleSendInvoiceConfirm}
        onDownload={handleDownloadPDF}
      />
    </div>
  );
};

export default CreateInvoice; 