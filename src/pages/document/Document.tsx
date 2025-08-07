
import React, { useState } from "react";
import {
  InsertDriveFile,
  FilterList,
  Visibility,
  Edit,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import CustomButton from "../../components/Button";
import { imagePath } from "../../constants/imagePath";

const documents = [
  {
    name: "INV-202401-001",
    tags: ["Insurance", "Builders"],
    type: "COI",
    typeColor: "bg-blue-600 text-white",
    related: "ABC Builders",
    date: "2025-07-08",
    by: "John Doe",
    size: "2.4 MB",
    status: "",
    actions: true,
  },
  {
    name: "W9_TomSmith.Pdf",
    tags: ["Tax", "Contractor"],
    type: "W-9",
    typeColor: "bg-green-400 text-white",
    related: "Job #3489",
    date: "2025-07-05",
    by: "Sarah K",
    size: "1.2 MB",
    status: "",
    actions: true,
  },
  {
    name: "BuilderAgreement_Johnson.Pdf",
    tags: ["Agreement", "Legal"],
    type: "Builder Agreement",
    typeColor: "bg-purple-500 text-white",
    related: "Johnson Corp.",
    date: "2025-06-28",
    by: "Admin",
    size: "3.8 MB",
    status: "",
    actions: true,
  },
  {
    name: "Permit_CityHall.Pdf",
    tags: ["Permit", "Government"],
    type: "Permit",
    typeColor: "bg-yellow-400 text-white",
    related: "Job #3491",
    date: "2025-07-01",
    by: "Mike Johnson",
    size: "0.8 MB",
    status: "",
    actions: true,
  },
];

const documentTypes = [
	"All Documents",
  "Certificate Of Insurance (COI)",
  "W-9 Tax Form",
  "Builder Agreement",
  "Contract",
  "Permit",
  "Invoice",
  "Receipt",
  "Other",
];

const Document = () => {
  const [docs, setDocs] = useState(documents);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState("All Documents");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // State for upload modal
  const [selectedDocType, setSelectedDocType] = useState(""); // State for selected document type

  const handleDeleteConfirm = () => {
    if (deleteIdx !== null) {
      setDocs((prev) => prev.filter((_, i) => i !== deleteIdx));
      setDeleteIdx(null);
    }
  };

  const filteredDocs =
    selectedType === "All Documents"
      ? docs
      : docs.filter((doc) => doc.type === selectedType);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
          <p className="text-gray-500 text-sm">
            Store And Manage All Important Project Documents In One Place.
          </p>
        </div>
        <CustomButton
          color="#2563eb"
          textColor="#fff"
          className="px-5 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
          onClick={() => setIsUploadModalOpen(true)} // Open upload modal
        >
          + Upload New Document
        </CustomButton>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Table Header */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-gray-900 mb-0">
              Documents{" "}
              <span className="text-gray-500 text-base font-normal">
                ({filteredDocs.length})
              </span>
            </h3>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 flex items-center gap-2">
              <div className="relative w-full md:w-[340px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search Documents By Name, Job Or Builders..."
                  className="pl-9 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none w-full"
                  style={{ height: 40 }}
                />
              </div>
            </div>

            <div className="relative">
              <CustomButton
                color="transparent"
                textColor="#2563eb"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50"
                leftIcon={<FilterList fontSize="small" />}
                style={{
                  border: "none",
                  boxShadow: "none",
                  minWidth: 0,
                  padding: "0 16px",
                  height: 40,
                }}
                onClick={() => setFilterOpen((v) => !v)}
              >
                <span className="font-semibold">{selectedType}</span>
                <svg
                  className="ml-1"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0l-4.25-4.39a.75.75 0 0 1 .02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </CustomButton>
              {filterOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[160px]">
                  {documentTypes.map((type) => (
                    <button
                      key={type}
                      className={`w-full px-4 py-2 text-left hover:bg-blue-50 ${
                        selectedType === type
                          ? "bg-blue-600 text-black-600"
                          : "text-gray-700"
                      }`}
                      onClick={() => {
                        setSelectedType(type);
                        setFilterOpen(false);
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700 font-semibold">
                <th className="py-3 px-4 text-left">File Name</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Related To</th>
                <th className="py-3 px-4 text-left">Uploaded On</th>
                <th className="py-3 px-4 text-left">Uploaded By</th>
                <th className="py-3 px-4 text-left">Size</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDocs.map((doc, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-600 font-bold text-xs">
                        <InsertDriveFile fontSize="small" />
                      </span>
                      <div>
                        <span className="font-semibold text-gray-900">
                          {doc.name}
                        </span>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {doc.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${doc.typeColor}`}
                    >
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">{doc.related}</td>
                  <td className="py-3 px-4">{doc.date}</td>
                  <td className="py-3 px-4">{doc.by}</td>
				  <td className="py-3 px-4">{doc.size}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
               
               <CustomButton
                    style={{
                      backgroundColor: "#f4f5f7",
                      minWidth: 40,
                      minHeight: 40,
                      width: 40,
                      height: 40,
                      padding: 0,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
					                        textColor="#374151"

					centerIcon={<Visibility/>}
                    className="p-2 text-gray-400 hover:text-blue-600"
                    onClick={() => alert("open Document")} // Placeholder for edit action
                  />


					                    <CustomButton
                    style={{
                      backgroundColor: "#f4f5f7",
                      minWidth: 40,
                      minHeight: 40,
                      width: 40,
                      height: 40,
                      padding: 0,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className="icon-only"
                    centerIcon={<img src={imagePath.Edit} alt="Edit" style={{ width: 28, height: 28 }} />}
                    onClick={() => alert("Edit Document")} // Placeholder for edit action
                  />

					                  <CustomButton
                    style={{
                      backgroundColor: "#f4f5f7",
                      minWidth: 40,
                      minHeight: 40,
                      width: 40,
                      height: 40,
                      padding: 0,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className="icon-only"
                    centerIcon={<img src={imagePath.Delete} alt="delete" style={{ width: 28, height: 28 }} />}
                     onClick={() => setDeleteIdx(idx)}
                  />
                    </div>
                  </td>
                  {/* <td className="py-3 px-4">{doc.size}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-2 relative p-6">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setDeleteIdx(null)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Delete Document
            </h2>
            <div className="mb-4 text-gray-700 text-sm">
              Are You Sure You Want To Delete The Document:
            </div>
            <div className="mb-2 font-semibold text-lg text-black">
              {filteredDocs[deleteIdx]?.name}
            </div>
            <div className="mb-6 text-red-600 text-sm font-medium">
              This Action Cannot Be Undone. The Document Will Be Permanently
              Removed From Your System.
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="px-5 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50"
                onClick={() => setDeleteIdx(null)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                onClick={handleDeleteConfirm}
              >
                Delete Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload New Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 m-4">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setIsUploadModalOpen(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Upload New Document</h2>
            <div className="mt-6">
				<h1 className="text-lg font-semibold text-gray-800">Select File</h1>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <span className="text-blue-600 mb-2">↑</span>
                  <span className="text-blue-600 font-medium">
                    Drop Your File Here, Or Click To Browse
                  </span>
                  <span className="text-gray-500 text-sm">
                    Supported Formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                  </span>
                  <CustomButton
                    color="#2563eb"
                    textColor="#fff"
                    className="mt-4 px-5 py-2 rounded-lg font-medium text-sm"
                  >
                    Browse Files
                  </CustomButton>
                </label>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Name *
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Document Name"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Type *
                </label>
                <select
                  value={selectedDocType}
                  onChange={(e) => setSelectedDocType(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="" disabled>
                    Enter Document Type
                  </option>
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Related To *
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Select Job Or Builder"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (Optional)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Tags Separated By Commas (E.g., Insurance, Tax And Legal)"
                />
                <p className="text-gray-500 text-xs mt-1">
                  Tags Help Organize And Search Your Documents
                </p>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <CustomButton
				  color="#f3f4f6"
				  textColor="#000"
                  className="px-5 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50"
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  color="#2563eb"
                  textColor="#fff"
                  className="px-5 py-2 rounded-lg font-medium text-sm"
                >
                  Save Document
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Document;