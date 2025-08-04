import React from "react";
import { AttachMoney, Work } from '@mui/icons-material';

// Card Component
const Card = ({ title, value, badge, subtitle }: {
  title: string;
  value: string;
  badge?: { text: string; color: string; bg: string } | null;
  subtitle: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow border-t-4 border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600 text-sm">{title}</span>
        {badge && (
          <span 
            className="text-xs px-2 py-1 rounded font-medium flex items-center gap-1"
            style={{ color: badge.color, backgroundColor: badge.bg }}
          >
            {badge.text}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );
};

const cards = [
  {
    title: "Total Revenue",
    value: "$328,000",
    badge: { text: "+12.5%", color: "green", bg: "#0dff00a8" },
    subtitle: "Margin: 28.5%",
    section: "Financial Overview",
  },
  {
    title: "Outstanding Invoices",
    value: "$84,000",
    badge: { text: "17 Unpaid", color: "red", bg: "#ff999b" },
    subtitle: "Avg 23 Days Overdue",
    section: "Financial Overview",
  },
  {
    title: "Upcoming Visits",
    value: "14 Jobs",
    badge: null,
    subtitle: "3 Urgent Priorities",
    section: "Job Overview",
  },
  {
    title: "Active Jobs",
    value: "23 Jobs",
    badge: { text: "+3", color: "green", bg: "#0dff00a8" },
    subtitle: "8 Completing Soon",
    section: "Job Overview",
  },
];

const OverviewCards: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Financial Overview */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-base">
          <AttachMoney className="text-green-500" />
          Financial Overview
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
          {cards.slice(0, 2).map((card, idx) => (
            <Card key={idx} title={card.title} value={card.value} badge={card.badge} subtitle={card.subtitle} />
          ))}
        </div>
      </div>
      {/* Job Overview */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-base">
          <Work className="text-blue-500" />
          Job Overview
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
          {cards.slice(2, 4).map((card, idx) => (
            <Card key={idx} title={card.title} value={card.value} badge={card.badge} subtitle={card.subtitle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewCards; 