
import * as React from "react";
import { imagePath } from "../../constants/imagePath";
import CustomButton from "../../components/Button";
import VisibilityIcon from '@mui/icons-material/Visibility';

interface DocumentItem {
  name: string;
  type: 'License' | 'Contract' | 'Estimate' | 'Invoice';
  date: string;
}

interface DocumentTabProps {
  builder: {
    documents?: DocumentItem[];
  };
}

const DocumentTab: React.FC<DocumentTabProps> = ({ builder }) => {
  const documents: DocumentItem[] = builder?.documents || [
    { name: "License & Insurance", type: "License", date: "2024-01-15" },
    { name: "Oak St Kitchen - Contract", type: "Contract", date: "2024-01-20" },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <div className="font-bold text-lg text-gray-900 mb-1">Document Library</div>
          <div className="text-gray-500 text-sm">
            Contracts, Licenses, Estimates and other important files
          </div>
        </div>
        <CustomButton
          leftIcon={<span className="text-white text-lg">+</span>}
          color="#2563eb"
          textColor="#fff"
          className="font-semibold text-base hover:opacity-90"
        >
          Upload Document
        </CustomButton>
      </div>

      {/* Document List */}
      <div className="flex flex-col gap-4">
        {documents.map((doc, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-300 rounded-lg p-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 pb-4"
          >
            {/* Document Info */}
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <img
                  src={imagePath.Doc}
                  alt="Document Icon"
                  className="w-6 h-6"
                  style={{
                    filter:
                      'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(246deg) brightness(104%) contrast(97%)',
                  }}
                />
              </div>
              <div>
                <div className="font-bold text-base text-gray-800">{doc.name}</div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span
                    className="px-3 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700"
                  >
                    {doc.type}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                    {doc.type === 'License' ? doc.date : `Uploaded: ${doc.date}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:ml-2 mt-2 sm:mt-0">
              <CustomButton
                leftIcon={<VisibilityIcon style={{ color: '#facc15' }} />}
                color="#f3f4f6"
                textColor="#374151"
                className="border border-gray-300 px-3 py-1 w-full sm:w-auto"
                style={{ borderRadius: '999px' }}
              >
                View
              </CustomButton>
              <CustomButton
                leftIcon={<img src={imagePath.Download} alt="Download" className="w-5 h-5" />}
                color="#f3f4f6"
                textColor="#374151"
                className="border border-gray-300 px-3 py-1 w-full sm:w-auto"
                style={{ borderRadius: '999px' }}
              >
                Download
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentTab;
