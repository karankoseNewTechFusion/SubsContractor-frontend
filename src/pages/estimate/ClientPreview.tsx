import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEstimates } from "./estimateData";
import { imagePath } from "../../constants/imagePath";

const ClientPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const estimate = getEstimates().find(e => String(e.id) === id);

  if (!estimate) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Estimate not found.</div>;
  }

  return (
    <div style={{ background: '#f6f7fa', minHeight: '100vh', paddingBottom: 40 }}>
      {/* Top bar */}
      <div style={{ background: '#f6f7fa', padding: '18px 0 8px 16px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 22 }}>Client Preview Mode</div>
          <div style={{ fontSize: 13, color: '#666' }}>This Is How Your Client Will See The Estimate</div>
        </div>
        <button
          onClick={() => navigate(-1)}
          style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 600, fontSize: 15, marginRight: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          Exit Preview
        </button>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 18, marginTop: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', padding: 0 }}>
        <div style={{ padding: '40px 0 0 0', textAlign: 'center' }}>
          <img src={imagePath.FullLogo || imagePath.subsLogo} alt="Logo" style={{ width: 90, marginBottom: 10 }} />
          <div style={{ fontWeight: 700, fontSize: 28, color: '#222', marginBottom: 8 }}>{estimate.title}</div>
          <div style={{ color: '#222', fontWeight: 500, fontSize: 16, marginBottom: 8 }}>{estimate.projectLocation || 'Licensed · Professional · Insured'}</div>
          <div style={{ color: '#2563eb', fontWeight: 500, fontSize: 15, marginBottom: 8 }}>Contact: {estimate.client.email || 'N/A'}</div>
        </div>

        {/* Table */}
        <div style={{ margin: '40px 0 0 0', padding: '0 16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f6f7fa', borderRadius: 8, overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#f6f7fa' }}>
                <th style={{ padding: 14, fontWeight: 600, fontSize: 16, textAlign: 'left' }}>Description</th>
                <th style={{ padding: 14, fontWeight: 600, fontSize: 16 }}>Quantity</th>
                <th style={{ padding: 14, fontWeight: 600, fontSize: 16 }}>Unit</th>
                <th style={{ padding: 14, fontWeight: 600, fontSize: 16 }}>Rate</th>
                <th style={{ padding: 14, fontWeight: 600, fontSize: 16 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {estimate.lineItems.map((item, idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f6f7fa' }}>
                  <td style={{ padding: 12, fontSize: 15 }}>{item.description}</td>
                  <td style={{ padding: 12, textAlign: 'center', fontSize: 15 }}>{item.quantity}</td>
                  <td style={{ padding: 12, textAlign: 'center', fontSize: 15 }}>{item.unit}</td>
                  <td style={{ padding: 12, textAlign: 'center', fontSize: 15 }}>{item.rate}</td>
                  <td style={{ padding: 12, textAlign: 'right', fontWeight: 600, fontSize: 15 }}>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div style={{ textAlign: 'right', padding: '32px 32px 0 0', fontWeight: 700, fontSize: 24, color: '#16a34a' }}>
          ${estimate.total?.toLocaleString()}
        </div>

        {/* Notes */}
        {estimate.notes && (
          <div style={{ margin: '32px 16px 0 16px', background: '#f6f7fa', borderRadius: 8, padding: 14, fontSize: 15, color: '#222' }}>
            {estimate.notes}
          </div>
        )}

        {/* Contact */}
        <div style={{ margin: '40px 0 0 0', padding: '0 0 32px 16px', color: '#222', fontWeight: 500, fontSize: 16 }}>
          <div>Contact {estimate.client.name}</div>
          <div style={{ color: '#2563eb', fontWeight: 500, fontSize: 15 }}>Email: {estimate.client.email || 'N/A'}</div>
          <div style={{ color: '#2563eb', fontWeight: 500, fontSize: 15 }}>Phone: {estimate.client.phone || 'N/A'}</div>
        </div>
      </div>
    </div>
  );
};

export default ClientPreview; 