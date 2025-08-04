import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEstimates, Estimate, updateEstimate } from "./estimateData";
import CustomButton from "../../components/Button";
import CreateEstimateModal from "./CreateEstimateModal";
import { imagePath } from "../../constants/imagePath";
import { Send, ScreenRotationAltSharp, Visibility } from "@mui/icons-material";
import EstimatePreview from "./EstimatePreview";
import ConvertToJobModal from "./ConvertToJobModal";

const statusColors: Record<string, string> = {
  Approved: "#22c55e",
  Sent: "#2563eb",
  Draft: "#a3a3a3",
  Rejected: "#ef4444",
};

const EstimateDetail: React.FC = () => {
  const { estimateId } = useParams<{ estimateId: string }>();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = React.useState(false);
  const [estimateData, setEstimateData] = React.useState<Estimate | undefined>(
    () => getEstimates().find((e) => String(e.id) === estimateId)
  );
  const [showPreview, setShowPreview] = React.useState(false);
  const [showConvertToJob, setShowConvertToJob] = React.useState(false);
  React.useEffect(() => {
    setEstimateData(getEstimates().find((e) => String(e.id) === estimateId));
  }, [estimateId, editOpen]);
  const estimate = estimateData;

  if (!estimate) {
    return (
      <div
        style={{
          padding: 48,
          textAlign: "center",
          color: "#888",
          fontSize: 22,
        }}
      >
        Estimate not found.
        <br />
        <CustomButton
          style={{ marginTop: 24 }}
          onClick={() => navigate("/estimates")}
        >
          &#8592;
        </CustomButton>
      </div>
    );
  }

  return (
    <>
      <CreateEstimateModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        isEdit
        initialValues={estimate}
        onEdit={(updated) => {
          updateEstimate(updated);
          setEditOpen(false);
        }}
      />
      <EstimatePreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        estimate={estimate}
        onSend={() => {
          // Handle send logic here
          console.log("Sending estimate:", estimate.id);
          setShowPreview(false);
        }}
        onDownload={() => {
          // Handle download logic here
          console.log("Downloading estimate:", estimate.id);
        }}
      />
      <ConvertToJobModal
        isOpen={showConvertToJob}
        onClose={() => setShowConvertToJob(false)}
        estimate={estimate}
        onConvert={(jobData) => {
          // Handle convert to job logic here
          console.log("Converting estimate to job:", jobData);
          setShowConvertToJob(false);
        }}
      />
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
          <CustomButton
            style={{
              background: "transparent",
              color: "#2563eb",
              borderRadius: 8,
              fontWeight: 600,
              padding: "8px 18px",
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
            onClick={() => navigate(-1)}
          >
            <Send style={{ fontSize: 18, marginRight: 6 }} />
          </CustomButton>
          <div style={{ display: "flex", gap: 10 }}>
            <CustomButton
              leftIcon={<Send style={{ fontSize: 18 }} />}
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
              onClick={() => setShowPreview(true)}
            >
              Send Estimate
            </CustomButton>
            <CustomButton
              leftIcon={<Visibility style={{ fontSize: 18 }} />}
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
            >
              Preview As Client
            </CustomButton>
            <CustomButton
              leftIcon={<ScreenRotationAltSharp style={{ fontSize: 18 }} />}
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
              onClick={() => setShowConvertToJob(true)}
            >
              Convert To Job
            </CustomButton>
          </div>
        </div>
        <div style={{ padding: 15 }}>
          {/* Estimate Header */}
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                marginBottom: 8,
                color: "#222",
              }}
            >
              {estimate.title}
            </div>
            <div style={{ color: "#666", fontSize: 18, marginBottom: 24 }}>
              {estimate.projectLocation}
            </div>
          </div>

          {/* Estimate Details Grid */}
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
                  <strong>Name:</strong> {estimate.client.name}
                </div>
                {estimate.client.email && (
                  <div style={{ marginBottom: 8 }}>
                    <strong>Email:</strong> {estimate.client.email}
                  </div>
                )}
                {estimate.client.phone && (
                  <div>
                    <strong>Phone:</strong> {estimate.client.phone}
                  </div>
                )}
              </div>
            </div>

            {/* Estimate Status Card */}
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
                Estimate Status
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
                    background: statusColors[estimate.status] || "#a3a3a3",
                    color: "#fff",
                    borderRadius: 20,
                    fontWeight: 600,
                    fontSize: 14,
                    padding: "6px 16px",
                  }}
                >
                  {estimate.status}
                </span>
              </div>
              <div style={{ fontSize: 15, color: "#4b5563" }}>
                <div style={{ marginBottom: 8 }}>
                  <strong>Created:</strong>{" "}
                  {new Date(estimate.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <strong>Due Date:</strong>{" "}
                  {estimate.dueDate ? (
                    new Date(estimate.dueDate).toLocaleDateString()
                  ) : (
                    <span style={{ color: "#9ca3af" }}>Not set</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {estimate.notes && (
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
                  {estimate.notes}
                </div>
              </div>
            </div>
          )}

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
              <div style={{ flex: 1, textAlign: "center" }}>Unit</div>
              <div style={{ flex: 1, textAlign: "center" }}>Rate</div>
              <div style={{ flex: 1, textAlign: "center" }}>Total</div>
            </div>
            {estimate.lineItems.map((item, idx) => (
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
                <div style={{ flex: 1, textAlign: "center" }}>{item.unit}</div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  ₹{item.rate.toLocaleString()}
                </div>
                <div style={{ flex: 1, textAlign: "center", fontWeight: 600 }}>
                  ₹{item.total.toLocaleString()}
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
              Total: ₹{estimate.total.toLocaleString()}
            </div>
          </div>
          {estimate.templateUsed && (
            <div style={{ marginBottom: 12, color: "#888" }}>
              <span style={{ fontWeight: 600 }}>Template Used:</span>{" "}
              {estimate.templateUsed}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EstimateDetail;
