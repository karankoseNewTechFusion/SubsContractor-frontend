import React, { useState } from 'react';
import { ArrowBack, Save, Send, ArrowBack as ArrowBackIcon, DeleteForever } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../components/Button';
import InvoicePreview from './InvoicePreview';

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface CreateInvoiceProps {
  clientId?: string;
  onClose?: () => void;
  onInvoiceCreated?: () => void;
  isEdit?: boolean;
  editData?: any;
}

const CreateInvoice: React.FC<CreateInvoiceProps> = ({ 
  clientId: propClientId, 
  onClose, 
  onInvoiceCreated,
  isEdit = false,
  editData = null
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const clientId = propClientId || params.clientId;

  // Mock client data - in a real app this would come from an API
  const clientData = {
    1: { name: "Acme Corporation", email: "Billing@Acme.Com", phone: "+1 (555) 123-4567", address: "123 Business St, City, State 12345" },
    2: { name: "TechStart Inc", email: "Finance@Techstart.Com", phone: "+1 (555) 234-5678", address: "456 Tech Ave, City, State 12345" },
    3: { name: "Global Solutions", email: "accounts@globalsolutions.com", phone: "+1 (555) 345-6789", address: "789 Global Blvd, City, State 12345" },
    4: { name: "Innovation Labs", email: "finance@innovationlabs.com", phone: "+1 (555) 456-7890", address: "321 Innovation Dr, City, State 12345" },
    5: { name: "Metro Construction", email: "billing@metroconstruction.com", phone: "+1 (555) 567-8901", address: "654 Construction Way, City, State 12345" },
    6: { name: "Digital Dynamics", email: "accounts@digitaldynamics.com", phone: "+1 (555) 678-9012", address: "987 Digital Lane, City, State 12345" }
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

  const [invoiceData, setInvoiceData] = useState(() => {
    if (isEdit && editData) {
      // Convert edit data to form format
      return {
        invoiceNumber: editData.invoiceNumber,
        clientName: editData.client,
        clientEmail: editData.email,
        clientPhone: editData.phone || '',
        billingAddress: editData.billingAddress || '',
        invoiceDate: editData.date,
        dueDate: editData.dueDate,
        items: (editData.items || [{ description: '', quantity: 1, unitPrice: 0, total: 0 }]) as LineItem[],
        notes: editData.notes || '',
        clientMessage: '',
        contractDisclaimer: 'Thank you for your business. Please contact us with any questions regarding this invoice.',
        documents: [] as File[]
      };
    } else {
      return {
        invoiceNumber: generateInvoiceNumber(),
        clientName: selectedClient?.name || '',
        clientEmail: selectedClient?.email || '',
        clientPhone: selectedClient?.phone || '',
        billingAddress: selectedClient?.address || '',
        invoiceDate: '2025-07-15',
        dueDate: '',
        items: [
          { description: '', quantity: 1, unitPrice: 0, total: 0 }
        ] as LineItem[],
        notes: '',
        clientMessage: '',
        contractDisclaimer: 'Thank you for your business. Please contact us with any questions regarding this invoice.',
        documents: [] as File[]
      };
    }
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
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
      amount: `₹${totalAmount.toFixed(2)}`,
      remainingBalance: `₹${totalAmount.toFixed(2)}`,
      status: "Draft",
      items: invoiceData.items.filter(item => item.description.trim() !== ''), // Only save items with descriptions
      notes: invoiceData.notes || ''
    };
    
    // Store in localStorage for now (in real app, save to database)
    const existingInvoices = JSON.parse(localStorage.getItem('draftInvoices') || '[]');
    existingInvoices.unshift(newInvoice);
    localStorage.setItem('draftInvoices', JSON.stringify(existingInvoices));
    
    // Call callback if provided, otherwise navigate
    if (onInvoiceCreated) {
      onInvoiceCreated();
    } else {
      navigate('../');
    }
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
      amount: `₹${totalAmount.toFixed(2)}`,
      remainingBalance: `₹${totalAmount.toFixed(2)}`,
      status: "Unpaid",
      items: invoiceData.items.filter(item => item.description.trim() !== ''), // Only save items with descriptions
      notes: invoiceData.notes || ''
    };
    
    // Store in localStorage for now (in real app, save to database)
    const existingInvoices = JSON.parse(localStorage.getItem('draftInvoices') || '[]');
    existingInvoices.unshift(newInvoice);
    localStorage.setItem('draftInvoices', JSON.stringify(existingInvoices));
    
    // Close preview and call callback if provided, otherwise navigate
    setShowPreview(false);
    if (onInvoiceCreated) {
      onInvoiceCreated();
    } else {
      navigate('../');
    }
  };

  const handleUpdateInvoice = () => {
    // Update existing invoice
    console.log('Updating invoice...', invoiceData);
    
    // Create updated invoice object
    const updatedInvoice = {
      id: editData?.id || Date.now(),
      invoiceNumber: invoiceData.invoiceNumber,
      client: invoiceData.clientName,
      email: invoiceData.clientEmail,
      date: invoiceData.invoiceDate,
      dueDate: invoiceData.dueDate,
      amount: `₹${totalAmount.toFixed(2)}`,
      remainingBalance: `₹${totalAmount.toFixed(2)}`,
      status: editData?.status || "Draft",
      items: invoiceData.items.filter(item => item.description.trim() !== ''),
      notes: invoiceData.notes || '',
      billingAddress: invoiceData.billingAddress
    };
    
    // Update in localStorage
    const existingInvoices = JSON.parse(localStorage.getItem('draftInvoices') || '[]');
    const updatedInvoices = existingInvoices.map((inv: any) => 
      inv.id === updatedInvoice.id ? updatedInvoice : inv
    );
    localStorage.setItem('draftInvoices', JSON.stringify(updatedInvoices));
    
    // Call callback if provided, otherwise navigate to invoice detail
    if (onInvoiceCreated) {
      onInvoiceCreated();
    } else {
      navigate(`/invoicing/${updatedInvoice.id}`);
    }
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

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newDocuments = Array.from(files);
      setInvoiceData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newDocuments]
      }));
    }
  };

  const removeDocument = (index: number) => {
    setInvoiceData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleMessageChange = (field: 'clientMessage' | 'contractDisclaimer', value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const totalAmount = invoiceData.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isEdit ? 'Edit Invoice' : 'Create Invoice'}
            </h1>
            <p className="text-gray-600 text-lg">
              {isEdit ? `Edit invoice ${invoiceData.invoiceNumber}` : `Create invoice for ${selectedClient?.name || 'selected client'}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Invoice Form */}
          <div className="xl:col-span-4 space-y-6">
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
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={invoiceData.clientPhone}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, clientPhone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
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
                <div className="col-span-5">Description</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Unit Price</div>
                <div className="col-span-2">Total</div>
                <div className="col-span-1">Action</div>
              </div>
              
              <div className="space-y-3">
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-center p-3 bg-gray-50 rounded-lg">
                    <div className="col-span-5">
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
                        ₹{item.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <button
                        onClick={() => removeItem(index)}
                        className="p-2 hover:bg-red-100 rounded transition-colors"
                        title="Remove item"
                      >
                        <DeleteForever className="w-4 h-4 text-black-500" />
                      </button>
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

            {/* Client Message */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Client Message</h3>
              <textarea
                value={invoiceData.clientMessage}
                onChange={(e) => handleMessageChange('clientMessage', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Add a custom message for your client..."
              />
            </div>

            {/* Contract / Disclaimer */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Contract / Disclaimer</h3>
              <textarea
                value={invoiceData.contractDisclaimer}
                onChange={(e) => handleMessageChange('contractDisclaimer', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Add contract terms or disclaimer..."
              />
            </div>

            {/* Document Upload */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Documents</h3>
              
              {/* Upload Area */}
              <div className="mb-4">
                <input
                  type="file"
                  multiple
                  onChange={handleDocumentUpload}
                  className="hidden"
                  id="document-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="document-upload"
                  className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-gray-700 font-medium">Upload Documents</span>
                </label>
                <p className="text-sm text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX, JPG, PNG</p>
              </div>

              {/* Document List */}
              {invoiceData.documents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Uploaded Documents:</h4>
                  {invoiceData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                        <span className="text-xs text-gray-500">({(doc.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button
                        onClick={() => removeDocument(index)}
                        className="p-1 hover:bg-red-100 rounded transition-colors"
                        title="Remove document"
                      >
                        <DeleteForever className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          {isEdit ? (
            // Edit mode - only Update button
            <CustomButton
              leftIcon={<Save />}
              color="#10B981"
              textColor="#ffffff"
              className="px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
              onClick={handleUpdateInvoice}
            >
              Update Invoice
            </CustomButton>
          ) : (
            // Create mode - Save as Draft and Save & Send buttons
            <>
              <CustomButton
                leftIcon={<Save />}
                color="#F0F1F4"
                textColor="#374151"
                className="px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                onClick={handleSaveDraft}
              >
                Save as Draft
              </CustomButton>
              <CustomButton
                leftIcon={<Send />}
                color="#2563eb"
                textColor="#ffffff"
                className="px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                onClick={handleSendInvoice}
              >
                Save & Send
              </CustomButton>
            </>
          )}
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