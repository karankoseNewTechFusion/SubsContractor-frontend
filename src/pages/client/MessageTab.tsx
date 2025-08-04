import * as React from "react";

interface MessageTabProps {
  builder: any;
}

const MessageTab: React.FC<MessageTabProps> = ({ builder }) => {
  const messages = builder?.recentCommunication || [
    {
      id: "c1",
      name: "John Smith",
      message: "Discussed timeline for Oak St kitchen project. Client requested marble countertop upgrade.",
      date: "2024-02-20",
      type: "Phone Call",
    },
    {
      id: "c2",
      name: "Sarah Smith",
      message: "Updated the kitchen cabinet installation schedule. We'll need to adjust the timeline by 2 days due to material delays.",
      date: "2024-01-20",
      type: "Email",
    },
  ];
  return (
    <div className="w-full">
      <div className="font-bold text-lg text-gray-900 mb-1">Messages</div>
      <div className="text-gray-500 text-sm mb-4">Communication History</div>
      <div className="flex flex-col gap-4 mb-6">
        {messages.map((msg: any, idx: number) => (
          <div className="bg-white rounded-xl shadow-sm p-4" key={idx}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{msg.type === 'Phone Call' ? '📞' : msg.type === 'Email' ? '✉️' : '📋'}</span>
              <div className="font-bold text-base text-gray-800">{msg.type}</div>
            </div>
            <div className="text-gray-700 mb-2">{msg.message}</div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">Date: {msg.date}</span>
              <span className="bg-gray-100 px-2 py-1 rounded">By {msg.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 mt-4">
        <textarea className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Add new communication note" />
        <select className="rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 md:w-32" defaultValue="Type">
          <option>Type</option>
          <option>Phone Call</option>
          <option>Email</option>
          <option>Site Visit</option>
        </select>
        <button className="rounded-lg bg-blue-600 text-white px-4 py-2 font-semibold text-base hover:bg-blue-700 transition">+ Add Note</button>
      </div>
    </div>
  );
};

export default MessageTab; 