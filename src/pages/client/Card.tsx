import React from "react";

interface CardProps {
  title: string;
  value: React.ReactNode;
  valueColor?: string;
  subtitle?: string;
  customClass?: string;
}

const Card: React.FC<CardProps> = ({ title, value, valueColor, subtitle, customClass }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-3 flex flex-col justify-start  ${customClass || ''}`}>
      <div className="text-gray-500 font-semibold mb-1 text-base">{title}</div>
      <div className="text-3xl font-bold mb-1" style={{ color: valueColor || undefined }}>{value}</div>
      {subtitle && <div className="text-gray-400 text-sm">{subtitle}</div>}
    </div>
  );
};

export default Card; 