import React, { useState } from "react";
import CustomButton from "../../components/Button";
import { Visibility, Download, Send, Close } from "@mui/icons-material";

interface InvoicePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceData: any;
  onSend?: () => void;
  onDownload?: () => void;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  isOpen,
  onClose,
  invoiceData,
  onSend,
  onDownload,
}) => {
  const [visibilitySettings, setVisibilitySettings] = useState({
    showQuantity: true,
    showUnitPrice: true,
    showLineItemTotal: true,
    showGrandTotal: true, // Always enabled
  });

  if (!isOpen) return null;

  const toggleSetting = (setting: keyof typeof visibilitySettings) => {
    if (setting === "showGrandTotal") return; // Cannot toggle grand total
    setVisibilitySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const totalAmount = invoiceData.items.reduce((sum: number, item: any) => sum + item.total, 0);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
          width: "90%",
          maxWidth: 1200,
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 32px",
            borderBottom: "1px solid #e5e7eb",
            background: "#f8fafc",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#1f2937" }}>
            Send Invoice PopUp
          </h2>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Left Section - Column Visibility Settings */}
          <div
            style={{
              width: "40%",
              padding: "24px",
              borderRight: "1px solid #e5e7eb",
              background: "#fafbfc",
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: 18, fontWeight: 600, color: "#374151" }}>
                Customize Invoice Before Sending
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
                Column Visibility Settings
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { key: "showQuantity", label: "Show Quantity" },
                { key: "showUnitPrice", label: "Show Unit Price" },
                { key: "showLineItemTotal", label: "Show Line Item Total" },
                { key: "showGrandTotal", label: "Show Grand Total" },
              ].map(({ key, label }) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    background: "#fff",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>
                      {label}
                    </span>
                    {key === "showGrandTotal" && (
                      <span style={{ fontSize: 12, color: "#9ca3af" }}>
                        (Always Enabled)
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      width: 44,
                      height: 24,
                      borderRadius: 12,
                      background: visibilitySettings[key as keyof typeof visibilitySettings]
                        ? "#3b82f6"
                        : "#d1d5db",
                      position: "relative",
                      cursor: key === "showGrandTotal" ? "not-allowed" : "pointer",
                      opacity: key === "showGrandTotal" ? 0.6 : 1,
                    }}
                    onClick={() => toggleSetting(key as keyof typeof visibilitySettings)}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "#fff",
                        position: "absolute",
                        top: 2,
                        left: visibilitySettings[key as keyof typeof visibilitySettings] ? 22 : 2,
                        transition: "left 0.2s ease",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Preview */}
          <div
            style={{
              width: "60%",
              padding: "24px",
              overflow: "auto",
            }}
          >
            <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600, color: "#374151" }}>
              Preview
            </h3>

            {/* Invoice Preview Content */}
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {/* Invoice Header */}
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ margin: "0 0 8px 0", fontSize: 20, fontWeight: 700, color: "#1f2937" }}>
                  Invoice #{invoiceData.invoiceNumber}
                </h2>
                <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
                  Client: {invoiceData.clientName}
                </p>
                <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
                  Email: {invoiceData.clientEmail}
                </p>
                {invoiceData.billingAddress && (
                  <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
                    Address: {invoiceData.billingAddress}
                  </p>
                )}
                <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
                  Invoice Date: {invoiceData.invoiceDate}
                </p>
                {invoiceData.dueDate && (
                  <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
                    Due Date: {invoiceData.dueDate}
                  </p>
                )}
              </div>

              {/* Line Items Table */}
              <div style={{ marginBottom: 20 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <th style={{ textAlign: "left", padding: "12px 8px", fontSize: 14, fontWeight: 600, color: "#374151" }}>
                        Description
                      </th>
                      {visibilitySettings.showQuantity && (
                        <th style={{ textAlign: "right", padding: "12px 8px", fontSize: 14, fontWeight: 600, color: "#374151" }}>
                          Qty
                        </th>
                      )}
                      {visibilitySettings.showUnitPrice && (
                        <th style={{ textAlign: "right", padding: "12px 8px", fontSize: 14, fontWeight: 600, color: "#374151" }}>
                          Price
                        </th>
                      )}
                      {visibilitySettings.showLineItemTotal && (
                        <th style={{ textAlign: "right", padding: "12px 8px", fontSize: 14, fontWeight: 600, color: "#374151" }}>
                          Total
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item: any, index: number) => (
                      <tr key={index} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "12px 8px", fontSize: 14, color: "#374151" }}>
                          {item.description}
                        </td>
                        {visibilitySettings.showQuantity && (
                          <td style={{ textAlign: "right", padding: "12px 8px", fontSize: 14, color: "#374151" }}>
                            {item.quantity}
                          </td>
                        )}
                        {visibilitySettings.showUnitPrice && (
                          <td style={{ textAlign: "right", padding: "12px 8px", fontSize: 14, color: "#374151" }}>
                            ${item.unitPrice.toLocaleString()}
                          </td>
                        )}
                        {visibilitySettings.showLineItemTotal && (
                          <td style={{ textAlign: "right", padding: "12px 8px", fontSize: 14, color: "#374151", fontWeight: 600 }}>
                            ${item.total.toLocaleString()}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Grand Total */}
              {visibilitySettings.showGrandTotal && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 12,
                    padding: "16px 0",
                    borderTop: "2px solid #e5e7eb",
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#374151" }}>
                    Grand Total:
                  </span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#059669" }}>
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Additional Notes */}
              {invoiceData.notes && (
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #e5e7eb" }}>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: 14, fontWeight: 600, color: "#374151" }}>
                    Additional Notes:
                  </h4>
                  <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
                    {invoiceData.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Action Buttons */}
        <div
          style={{
            padding: "20px 32px",
            borderTop: "1px solid #e5e7eb",
            background: "#f8fafc",
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
          }}
        >
          <CustomButton
            leftIcon={<Close style={{ fontSize: 18 }} />}
            style={{
              background: "#f3f4f6",
              color: "#2563eb",
              borderRadius: 20,
              fontWeight: 600,
              padding: "8px 16px",
              fontSize: 14,
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
              transition: "background 0.2s, color 0.2s",
            }}
            className="custom-action-btn"
            onClick={onClose}
          >
            Cancel
          </CustomButton>

          <CustomButton
            leftIcon={<Download style={{ fontSize: 18 }} />}
            style={{
              background: "#f3f4f6",
              color: "#2563eb",
              borderRadius: 20,
              fontWeight: 600,
              padding: "8px 16px",
              fontSize: 14,
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
              transition: "background 0.2s, color 0.2s",
            }}
            className="custom-action-btn"
            onClick={onDownload}
          >
            Download PDF
          </CustomButton>
          <CustomButton
            leftIcon={<Send style={{ fontSize: 18 }} />}
            style={{
              background: "#f3f4f6",
              color: "#2563eb",
              borderRadius: 20,
              fontWeight: 600,
              padding: "8px 16px",
              fontSize: 14,
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
              transition: "background 0.2s, color 0.2s",
            }}
            className="custom-action-btn"
            onClick={onSend}
          >
            Send To Client
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview; 