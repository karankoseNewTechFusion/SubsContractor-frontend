import React, { useRef } from 'react';
import { Close } from '@mui/icons-material';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const docTypes = [
  'COI', 'W-9', 'Builder Agreement', 'Permit', 'Invoice', 'Other'
];
const relatedToOptions = [
  'ABC Builders', 'Job #3489', 'Johnson Corp.', 'Job #3491'
];

const DocumentModal: React.FC<DocumentModalProps> = ({ isOpen, onClose, onSave }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl mx-2 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Upload New Document</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <Close />
          </button>
        </div>
        {/* Content */}
        <form
          className="p-6 space-y-5"
          onSubmit={e => {
            e.preventDefault();
            // Collect form data and call onSave
            const form = e.target as HTMLFormElement;
            const data = {
              file: (form.elements.namedItem('file') as HTMLInputElement)?.files?.[0] || null,
              name: (form.elements.namedItem('name') as HTMLInputElement)?.value,
              type: (form.elements.namedItem('type') as HTMLSelectElement)?.value,
              related: (form.elements.namedItem('related') as HTMLSelectElement)?.value,
              tags: (form.elements.namedItem('tags') as HTMLInputElement)?.value,
            };
            onSave(data);
          }}
        >
          {/* File Upload */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">Select File</label>
            <div
              className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 transition"
              onClick={() => fileInputRef.current?.click()}
              style={{ minHeight: 120 }}
            >
              <span className="text-3xl mb-2">⬆️</span>
              <span className="text-blue-700 font-medium mb-1">Drop File Here, Or Click To Browse</span>
              <span className="text-xs text-gray-500 mb-2">Supported Formats: PDF, DOCX, PNG, JPG (Max 10MB)</span>
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm"
                onClick={e => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Browse Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              />
            </div>
          </div>
          {/* Document Name */}
          <div>
            <label className="block font-semibold text-gray-900 mb-1">Document Name <span className="text-red-500">*</span></label>
            <input
              name="name"
              type="text"
              required
              placeholder="Enter Document Name"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
            />
          </div>
          {/* Document Type */}
          <div>
            <label className="block font-semibold text-gray-900 mb-1">Document Type <span className="text-red-500">*</span></label>
            <select
              name="type"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>Enter Document Type</option>
              {docTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          {/* Related To */}
          <div>
            <label className="block font-semibold text-gray-900 mb-1">Related To <span className="text-red-500">*</span></label>
            <select
              name="related"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>Select Job Or Builder</option>
              {relatedToOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {/* Tags */}
          <div>
            <label className="block font-semibold text-gray-900 mb-1">Tags (Optional)</label>
            <input
              name="tags"
              type="text"
              placeholder="Enter Tags Separated By Commas (E.G., Insurance, Tax And Legal)"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
            />
            <span className="text-xs text-gray-500">Tags Help Organize And Search Your Documents</span>
          </div>
          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-5 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Save Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentModal;
