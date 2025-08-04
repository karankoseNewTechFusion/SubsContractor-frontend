import React, { useState, useCallback, useMemo } from "react";
import CustomButton from "../../components/Button";
import { Estimate as EstimateType, LineItem } from "./estimateData";
import { imagePath } from "../../constants/imagePath";

const defaultLineItem: LineItem = { description: "", quantity: 0, unit: "Hours", rate: 0, total: 0 };
const unitOptions = ["Hours", "Days", "Weeks", "Months"];

const toTypedLineItems = (items: any[]): LineItem[] => items.map(item => ({ ...item, unit: item.unit as "Hours" | "Days" | "Weeks" | "Months" }));

interface CreateEstimateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (estimate: Omit<EstimateType, 'id'>) => void;
  onEdit?: (estimate: EstimateType) => void;
  initialValues?: EstimateType;
  isEdit?: boolean;
  isFromTemplate?: boolean;
}

const CreateEstimateModal = ({ open, onClose, onCreate, onEdit, initialValues, isEdit, isFromTemplate }: CreateEstimateModalProps) => {
  const [template, setTemplate] = useState(initialValues?.templateUsed || "");
  const [title, setTitle] = useState(initialValues?.title || "");
  const [clientName, setClientName] = useState(initialValues?.client.name || "");
  const [clientEmail, setClientEmail] = useState(initialValues?.client.email || "");
  const [clientPhone, setClientPhone] = useState(initialValues?.client.phone || "");
  const [location, setLocation] = useState(initialValues?.projectLocation || "");
  const [dueDate, setDueDate] = useState(initialValues?.dueDate ? initialValues.dueDate.slice(0,10) : "");
  const [lineItems, setLineItems] = useState(initialValues?.lineItems?.length ? toTypedLineItems(initialValues.lineItems) : [{ ...defaultLineItem }]);
  const [notes, setNotes] = useState(initialValues?.notes || "");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  React.useEffect(() => {
    if (initialValues && open) {
      setTemplate(initialValues.templateUsed || "");
      setTitle(initialValues.title || "");
      setClientName(initialValues.client.name || "");
      setClientEmail(initialValues.client.email || "");
      setClientPhone(initialValues.client.phone || "");
      setLocation(initialValues.projectLocation || "");
      setDueDate(initialValues.dueDate ? initialValues.dueDate.slice(0,10) : "");
      setLineItems(initialValues.lineItems?.length ? toTypedLineItems(initialValues.lineItems) : [{ ...defaultLineItem }]);
      setNotes(initialValues.notes || "");
      setErrors({});
    }
  }, [initialValues, open]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!title.trim()) newErrors.title = "Estimate title is required";
    if (!clientName.trim()) newErrors.clientName = "Client name is required";
    
    // Validate line items
    lineItems.forEach((item, index) => {
      if (!item.description.trim()) {
        newErrors[`lineItem${index}Description`] = "Description is required";
      }
      if (item.quantity <= 0) {
        newErrors[`lineItem${index}Quantity`] = "Quantity must be greater than 0";
      }
      if (item.rate <= 0) {
        newErrors[`lineItem${index}Rate`] = "Rate must be greater than 0";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLineItemChange = useCallback((idx: number, field: string, value: any) => {
    setLineItems(items => items.map((item, i) => {
      const updated = i === idx ? { ...item, [field]: value } : item;
      if (i === idx && (field === 'quantity' || field === 'rate')) {
        updated.total = Number(updated.quantity) * Number(updated.rate);
      }
      return updated;
    }));
    
    // Clear errors for this field
    if (errors[`lineItem${idx}${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`lineItem${idx}${field.charAt(0).toUpperCase() + field.slice(1)}`];
        return newErrors;
      });
    }
  }, [errors]);

  const handleAddItem = useCallback(() => {
    setLineItems(items => [...items, { ...defaultLineItem }]);
  }, []);

  const handleRemoveItem = useCallback((idx: number) => {
    setLineItems(items => items.length === 1 ? items : items.filter((_, i) => i !== idx));
  }, []);

  const getTotal = useMemo(() => lineItems.reduce((sum, item) => sum + Number(item.total), 0), [lineItems]);

  const resetForm = () => {
    setTemplate("");
    setTitle("");
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setLocation("");
    setDueDate("");
    setLineItems([{ ...defaultLineItem }]);
    setNotes("");
    setErrors({});
  };

  if (!open) return null;

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (isEdit && onEdit && initialValues) {
      onEdit({
        ...initialValues,
        title,
        client: {
          name: clientName,
          email: clientEmail || undefined,
          phone: clientPhone || undefined,
        },
        projectLocation: location,
        notes,
        lineItems,
        total: getTotal,
        dueDate: dueDate ? new Date(dueDate).toISOString() : "",
        templateUsed: template || undefined,
      });
    } else if (onCreate) {
      onCreate({
        title,
        client: {
          name: clientName,
          email: clientEmail || undefined,
          phone: clientPhone || undefined,
        },
        projectLocation: location,
        notes,
        lineItems,
        total: getTotal,
        status: "Draft",
        createdAt: new Date().toISOString(),
        dueDate: dueDate ? new Date(dueDate).toISOString() : "",
        templateUsed: template || undefined,
      });
    }
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEdit ? "Edit Estimate" : isFromTemplate ? "Use Built-in Template" : "Create New Estimate"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Template Selection - Only show if not from template */}
          {!isFromTemplate && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Load From Template (Optional)
              </label>
              <select 
                value={template} 
                onChange={e => setTemplate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              >
                <option value="">Choose A Template To Start With</option>
                <option value="kitchen">Kitchen Renovation Estimate</option>
                <option value="bathroom">Bathroom Remodel Estimate</option>
              </select>
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimate Title *
              </label>
              <input 
                value={title} 
                onChange={e => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors(prev => ({ ...prev, title: "" }));
                }}
                placeholder="E.G. Kitchen Renovation Estimate" 
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name *
              </label>
              <input 
                value={clientName} 
                onChange={e => {
                  setClientName(e.target.value);
                  if (errors.clientName) setErrors(prev => ({ ...prev, clientName: "" }));
                }}
                placeholder="E.G. Mr. Helen Bator" 
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 ${
                  errors.clientName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Email
              </label>
              <input 
                value={clientEmail} 
                onChange={e => setClientEmail(e.target.value)}
                placeholder="E.G. client@email.com" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Phone
              </label>
              <input 
                value={clientPhone} 
                onChange={e => setClientPhone(e.target.value)}
                placeholder="E.G. 555-1234" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Location
              </label>
              <input 
                value={location} 
                onChange={e => setLocation(e.target.value)}
                placeholder="E.G. 123 Green Avenue, New York" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input 
                type="date" 
                value={dueDate} 
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Line Items</h3>
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="grid grid-cols-12 gap-4 mb-4 font-medium text-sm text-gray-700">
                <div className="col-span-4">Description</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-center">Unit</div>
                <div className="col-span-2 text-center">Rate</div>
                <div className="col-span-1 text-center">Total</div>
                <div className="col-span-1 text-center">Action</div>
              </div>
              
              {lineItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-4 mb-4 items-center">
                  <div className="col-span-4">
                    <input 
                      value={item.description} 
                      onChange={e => handleLineItemChange(idx, 'description', e.target.value)}
                      placeholder="Enter Description" 
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                        errors[`lineItem${idx}Description`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`lineItem${idx}Description`] && (
                      <p className="text-red-500 text-xs mt-1">{errors[`lineItem${idx}Description`]}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="number" 
                      min={0} 
                      value={item.quantity} 
                      onChange={e => handleLineItemChange(idx, 'quantity', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-center ${
                        errors[`lineItem${idx}Quantity`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`lineItem${idx}Quantity`] && (
                      <p className="text-red-500 text-xs mt-1">{errors[`lineItem${idx}Quantity`]}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <select 
                      value={item.unit} 
                      onChange={e => handleLineItemChange(idx, 'unit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      {unitOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="number" 
                      min={0} 
                      value={item.rate} 
                      onChange={e => handleLineItemChange(idx, 'rate', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-center ${
                        errors[`lineItem${idx}Rate`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`lineItem${idx}Rate`] && (
                      <p className="text-red-500 text-xs mt-1">{errors[`lineItem${idx}Rate`]}</p>
                    )}
                  </div>
                  <div className="col-span-1 text-center font-semibold">
                    ${item.total.toLocaleString()}
                  </div>
                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <img src={imagePath.Delete} alt="delete" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center mt-6">
                <CustomButton
                  onClick={handleAddItem}
                  color="#2563eb"
                  textColor="#ffffff"
                  className="px-4 py-2 rounded-lg font-semibold"
                >
                  + Add Item
                </CustomButton>
                <div className="text-lg font-semibold text-gray-900">
                  Total: ${getTotal.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
            <textarea 
              value={notes} 
              onChange={e => setNotes(e.target.value)}
              placeholder="Add Any Additional Notes Or Terms" 
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <CustomButton
              onClick={onClose}
              color="#f3f4f6"
              textColor="#374151"
              className="px-7 py-3 rounded-lg font-semibold border border-gray-300"
            >
              Cancel
            </CustomButton>
            <CustomButton
              onClick={handleSubmit}
              color="#2563eb"
              textColor="#ffffff"
              className="px-7 py-3 rounded-lg font-semibold"
            >
              {isEdit ? "Save Changes" : isFromTemplate ? "Create from Template" : "Create Estimate"}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEstimateModal;
 