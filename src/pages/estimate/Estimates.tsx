

import React, { useState } from "react";
import { Description , } from '@mui/icons-material';
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import CustomButton from "../../components/Button";
import { imagePath } from "../../constants/imagePath";
import Table from "../../components/Table";
import CreateEstimateModal from "./CreateEstimateModal";
import {
  getEstimates,
  addEstimate,
  Estimate as EstimateType,
} from "./estimateData";

const statusOptions = ["All", "Sent", "Approved", "Draft"];

const Estimates = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [estimates, setEstimates] = useState<EstimateType[]>(getEstimates());
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editEstimate, setEditEstimate] = useState<EstimateType | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const filteredData =
    statusFilter === "All"
      ? estimates
      : estimates.filter((row) => row.status === statusFilter);

  // Only show main content if on /estimates exactly
  if (location.pathname !== "/estimates") {
    return <Outlet />;
  }

  // Handler to add a new estimate (to be passed to modal)
  const handleCreateEstimate = (newEstimate: Omit<EstimateType, "id">) => {
    // Ensure client object is always present
    const client =
      typeof newEstimate.client === "string"
        ? { name: newEstimate.client }
        : newEstimate.client;
    addEstimate({ ...newEstimate, client } as EstimateType);
    setEstimates(getEstimates());
    setShowCreateModal(false);
  };

  // Handler to update an estimate
  const handleEditEstimate = (updated: EstimateType) => {
    setEstimates(estimates.map(e => e.id === updated.id ? updated : e));
    setEditEstimate(null);
  };

  return (
    <div className="flex flex-col items-center justify-center">
    <div className="w-full max-w-7xl mx-auto p-6">
      <CreateEstimateModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateEstimate}
      />
      {/* Edit Estimate Modal */}
      {editEstimate && (
        <CreateEstimateModal
          open={!!editEstimate}
          onClose={() => setEditEstimate(null)}
          isEdit
          initialValues={editEstimate}
          onEdit={handleEditEstimate}
        />
      )}
      {/* Delete Confirm Dialog */}
      {deleteId && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.18)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              minWidth: 300,
              boxShadow: "0 2px 24px rgba(0,0,0,0.18)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 18 }}>
              Are you sure you want to delete?
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <CustomButton
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: 8,
                  fontWeight: 600,
                  padding: "8px 24px",
                  fontSize: 16,
                }}
                onClick={() => {
                  // Actually delete
                  setEstimates(
                    estimates.filter((e) => String(e.id) !== deleteId)
                  );
                  setDeleteId(null);
                }}
              >
                OK
              </CustomButton>
              <CustomButton
                style={{
                  background: "#f4f5f7",
                  color: "#222",
                  borderRadius: 8,
                  fontWeight: 600,
                  padding: "8px 24px",
                  fontSize: 16,
                }}
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </CustomButton>
            </div>
          </div>
        </div>
      )}
      {/* Header with heading/sub-heading left, buttons right */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
            Estimates
          </h2>
          <span style={{ fontSize: 15, color: "#6b7280", fontWeight: 400 }}>
            Manage and create new estimates for your projects.
          </span>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <CustomButton
            color="#f4f5f7"
            textColor="#222"
            style={{ minWidth: 180, fontWeight: 600, boxShadow: "none" }}
            onClick={() => navigate("templates")}
          >
            Template Manager
          </CustomButton>
          <CustomButton
            leftIcon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 4V16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 10H16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
            color="#0066ff"
            textColor="#fff"
            style={{ minWidth: 180, fontWeight: 600, boxShadow: "none" }}
            onClick={() => setShowCreateModal(true)}
          >
            New Estimates
          </CustomButton>
        </div>
      </div>
      {/* Estimates Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          marginTop: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 16,
            position: "relative",
          }}
        >
          <div style={{ position: "relative", flex: 1, marginRight: 16 }}>
            <input
              type="text"
              placeholder="Search Estimates.."
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                background: "#f5f5f5",
                borderRadius: 8,
                padding: "8px 14px 8px 38px",
                fontSize: 15,
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888",
                pointerEvents: "none",
              }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path
                  d="M8.5 15.5a7 7 0 1 1 7-7 7 7 0 0 1-7 7Zm0-12.5a5.5 5.5 0 1 0 5.5 5.5A5.51 5.51 0 0 0 8.5 3Z"
                  fill="#888"
                />
                <path
                  d="M17.5 17.5l-4-4"
                  stroke="#888"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <CustomButton
              style={{
                backgroundColor: "#2563eb",
                color: "#fff",
                fontWeight: 600,
                borderRadius: 8,
                padding: "8px 18px",
                minWidth: 120,
              }}
              onClick={() => setShowStatusDropdown((v) => !v)}
            >
              {statusFilter === "All" ? "All Status" : statusFilter}
              <span style={{ marginLeft: 8, fontSize: 13 }}>&#9662;</span>
            </CustomButton>
            {showStatusDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: 44,
                  left: 0,
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  zIndex: 10,
                  minWidth: 120,
                }}
              >
                {statusOptions.map((opt) => (
                  <div
                    key={opt}
                    style={{
                      padding: "10px 18px",
                      cursor: "pointer",
                      background:
                        statusFilter === opt ? "#2563eb" : "transparent",
                      color: statusFilter === opt ? "#fff" : "#222",
                      fontWeight: statusFilter === opt ? 700 : 500,
                      borderRadius: 8,
                    }}
                    onClick={() => {
                      setStatusFilter(opt);
                      setShowStatusDropdown(false);
                    }}
                  >
                    {opt === "All" ? "All Status" : opt}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
        <Table
          columns={[
            {
              key: "title",
              title: "Estimate Title",
              render: (value, row) => (
                <div>
                  <div style={{ fontWeight: 600 }}>{value}</div>
                  <div style={{ color: "#888", fontSize: 13 }}>
                    {row.projectLocation}
                  </div>
                </div>
              ),
            },
            {
              key: "client",
              title: "Client",
              render: (_, row) => row.client.name,
            },
            {
              key: "total",
              title: "Amount",
              align: "right",
              render: (v) => `₹${v.toLocaleString()}`,
            },
            {
              key: "status",
              title: "Status",
              render: (v) => (
                <span
                  style={{
                    background:
                      v === "Approved"
                        ? "#d1fae5"
                        : v === "Sent"
                        ? "#dbeafe"
                        : v === "Draft"
                        ? "#f3f4f6"
                        : "#fee2e2",
                    color:
                      v === "Approved"
                        ? "#059669"
                        : v === "Sent"
                        ? "#2563eb"
                        : v === "Draft"
                        ? "#6b7280"
                        : "#ef4444",
                    fontWeight: 600,
                    fontSize: 13,
                    borderRadius: 8,
                    padding: "10px 18px",
                    display: "inline-block",
                  }}
                >
                  {v}
                </span>
              ),
              align: "center",
            },
            {
              key: "createdAt",
              title: "Created",
              align: "center",
              render: (v) => new Date(v).toLocaleDateString(),
            },
            {
              key: "dueDate",
              title: "Due Date",
              align: "center",
              render: (v) => (v ? new Date(v).toLocaleDateString() : "N/A"),
            },
            {
              key: "actions",
              title: "Actions",
              render: (_, row) => (
                <div
                  style={{ display: "flex", gap: 8, justifyContent: "center" }}
                >
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
                    centerIcon={<img src={imagePath.JobIcon} alt="Edit" style={{ width: 28, height: 28 }} />}
                    onClick={() => navigate(`/estimates/${row.id}`)}
                  >
                
                  </CustomButton>
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
                    onClick={() => setEditEstimate(row)}
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
                    centerIcon={<img src={imagePath.Delete} alt="Delete" style={{ width: 28, height: 28 }} />}
                    onClick={() => setDeleteId(String(row.id))}
                  />
                </div>
              ),
              align: "center",
            },
          ]}
          data={filteredData}
          rowKey={(row) => row.id}
        />
      </div>
    </div>
    </div>
  );
};

export default Estimates;
