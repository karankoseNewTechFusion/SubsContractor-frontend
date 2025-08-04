import * as React from "react";
import '../styles/cards.css'

interface CardProps {
  title: string;
  value: string;
  badge?: { text: string; color: string; bg: string } | null;
  subtitle: string;
}

 export const Card: React.FC<CardProps> = ({ title, value, badge, subtitle }) => (
  <div className="bg-white rounded-xl shadow-sm flex flex-col justify-between h-full p-3 min-w-0 " id="card-dashboard">
    <div>
      <div className="flex items-center justify-between mb-2" id="card-bedge">
        <div className="font-semibold text-gray-700 text-base">{title}</div>
        {badge && (
          <span className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium" style={{ background: badge.bg, color: badge.color }}>
            {(badge.text.startsWith('+') && badge.color === 'green') && (
              <svg width="10" height="10" viewBox="0 0 10 10" className="mr-1"><polygon points="5,2 9,8 1,8" fill="#22c55e"/></svg>
            )}
            {(badge.text === '17 Unpaid' && badge.color === 'red') && (
              <svg width="10" height="10" viewBox="0 0 10 10" className="mr-1"><polygon points="1,2 9,2 5,8" fill="#ff4444"/></svg>
            )}
            {badge.text}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
    <div className="mt-2 text-sm text-gray-500">{typeof subtitle === 'string' ? subtitle.split("\n").map((line, i) => <div key={i}>{line}</div>) : ''}</div>
  </div>
);
// export default Card;