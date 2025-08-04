import * as React from "react";
import { useOutletContext } from "react-router-dom";
import "./builder.css";
import { imagePath } from "../../constants/imagePath";

interface ActiveRecentJobsProps {
  builder: any;
}

const ActiveRecentJobs: React.FC<ActiveRecentJobsProps> = ({ builder }) => {
  const jobs = builder?.jobs || [
    {
      title: "Kitchen Renovation - 123 Oak St",
      value: 45000,
      startDate: "2025-01-15",
      endDate: "2025-03-15",
      lastPayment: "2024-02-01",
      outstanding: 15000,
      paymentStatus: "Pending",
    },
    {
      title: "Bathroom Remodel - 456 Pine Ave",
      value: 28500,
      startDate: "2025-03-01",
      endDate: "2025-04-30",
      lastPayment: "2024-01-15",
      outstanding: 0,
      paymentStatus: "Paid",
    },
  ];
  return (
    <div className="active-recent-jobs-wrapper">
      <div className="active-recent-jobs-title">Active Recent Jobs</div>
      <div className="active-recent-jobs-subtitle">Track All Projects</div>
      <div className="active-recent-jobs-list">
        {jobs.map((job: any, idx: number) => (
          <div className="active-job-card" key={idx}>
            <div className="active-job-card-top d-flex align-items-center justify-content-between">
              <div className="active-job-icon-title d-flex align-items-center gap-2">
                <img src={imagePath.BuilderDark} alt="Basic" className="w-6 h-6" />
                <div>
                  <div className="active-job-title">{job.title}</div>
                  <div className="active-job-address">{job.address || "-"}</div>
                </div>
              </div>
              <div className="d-flex flex-column align-items-end">
                <div className="active-job-amount">${job.value?.toLocaleString() || "-"}</div>
                <div className={`active-job-status-pill ${job.statusClass || ''}`}>{job.paymentStatus || '-'}</div>
              </div>
            </div>
            <div className="active-job-dates-row d-flex gap-2 mt-2">
              <span className="active-job-date-badge">Start: {job.startDate}</span>
              <span className="active-job-date-badge">End: {job.endDate}</span>
            </div>
            <span className="active-job-date-divider" />
            <div className="active-job-info-row d-flex align-items-center justify-content-between mt-3">
              <div>
                <div className="active-job-info-label">Last Payment</div>
                <div className="active-job-info-value">{job.lastPayment}</div>
              </div>
              <div>
                <div className="active-job-info-label">Outstanding</div>
                <div className="active-job-info-value">${job.outstanding?.toLocaleString() || "-"}</div>
              </div>
              <div>
                <div className="active-job-info-label">Payment Status</div>
                <div className={`active-job-payment-pill ${job.paymentStatus?.toLowerCase()}`}>{job.paymentStatus}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveRecentJobs; 