import * as React from "react";
import { imagePath } from "../../constants/imagePath";

interface OverViewTabProps {
  builder: any;
}

const OverViewTab: React.FC<OverViewTabProps> = ({ builder }) => {
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

  const fallbackAvatar = "https://randomuser.me/api/portraits/men/32.jpg";
  const rating = Math.floor(builder?.rating || 0);
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
      ★
    </span>
  ));

  return (
    <div className="w-full">
      {/* <div className="flex flex-col md:flex-row sm:flex-row w-full gap-6 md:gap-10"> */}
      <div className="flex flex-col md:flex-col lg:flex-row w-full gap-6 sm:gap-10 " >
        {/* Left Column: Builder Info */}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-lg text-gray-900 mb-1">Builder Information</div>
          <div className="text-gray-500 text-sm mb-4">Manage Your Builder Relationships</div>

          <div className=" rounded-xl shadow-sm p-4 mb-4" id="overview-profile-bg">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  className="w-14 h-14 rounded-full bg-gray-100"
                  src={builder?.avatar || fallbackAvatar}
                  onError={(e) => (e.currentTarget.src = fallbackAvatar)}
                  alt={builder?.name || "Builder"}
                />
                <div>
                  <div className="font-bold text-base text-gray-800">{builder?.name || "-"}</div>
                  <div className="text-gray-500 text-xs">{builder?.role || "-"}</div>
                </div>
              </div>

              {/* Nav buttons */}
              <div className="flex gap-2">
                <button className="rounded-full  px-2 py-1 hover:bg-gray-700 transition" id="overview-profile-arrow-btn">
                  <img src={imagePath.BlueTriangleLeft} alt="Previous" className="w-4 h-4" />
                </button>
                <button className="rounded-full px-2 py-1 hover:bg-gray-700 transition" id="overview-profile-arrow-btn">
                  <img src={imagePath.BlueTriangleRight} alt="Next" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 mb-4" />

            {/* Info List */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 mb-2">
                <img src={imagePath.Phone} alt="Phone" className="w-5 h-5" />
                <span className="text-gray-500">Phone</span>
                <span className="text-gray-800 ml-2">{builder?.phone || "-"}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <img src={imagePath.Insurance} alt="Insurance" className="w-5 h-5" />
                <span className="text-gray-500">Insurance</span>
                <span className="text-gray-800 ml-2">{builder?.insurance || "-"}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <img src={imagePath.Licence} alt="License" className="w-5 h-5" />
                <span className="text-gray-500">License</span>
                <span className="text-gray-800 ml-2">{builder?.licence || "-"}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <img src={imagePath.Email} alt="E-Mail" className="w-5 h-5" />
                <span className="text-gray-500">E-Mail</span>
                <span className="text-gray-800 ml-2">{builder?.email || "-"}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <img src={imagePath.Location} alt="Address" className="w-5 h-5" />
                <span className="text-gray-500">Address</span>
                <span className="text-gray-800 ml-2">{builder?.address || "-"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Notes & Rating */}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-lg text-gray-900 mb-1">Internal Notes & Rating</div>
          <div className="text-gray-500 text-sm mb-4">Internal Use Only - Not Visible To Builder</div>

          <div className=" gap-4 mb-2">
            <span className="font-bold text-lg text-gray-900 mb-1">Internal Rating</span>
            <div className="flex items-center gap-2">
              <span className="flex text-lg">{stars}</span>
              <span className="text-gray-500 text-xs">
                {builder?.rating ? `${builder.rating}/5 Stars` : "-"}
              </span>
            </div>
          </div>

          <label htmlFor="internal-notes" className="sr-only">Internal Notes</label>
          <div className="font-semibold text-gray-700 mb-1">Note</div>
          <textarea
           rows={5}
            id="internal-notes"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2"
            defaultValue={builder?.notes?.[0]?.content || ""}
            placeholder="Add your internal note here... Add your internal note here...Add your internal note here...Add your internal note here..."
          />

          <button
            type="button"
            className="rounded-lg bg-blue-600 text-white px-4 py-2 font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            Save Notes
          </button>
        </div>
      </div>

      {/* Recent Communication */}
      <div className="mt-8">
        <div className="font-bold text-lg text-gray-900 mb-1">Recent Communication</div>
        <div className="text-gray-500 text-sm mb-4">A Quick Overview Of Your Latest Interactions.</div>

        <div className="flex flex-col gap-4">
          {messages.map((msg: any, idx: number) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                  {msg.name?.[0] || "-"}
                </div>
                <div>
                  <div className="font-bold text-base text-gray-800">{msg.name}</div>
                  <div className="text-gray-500 text-xs">{msg.message}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                  {msg.date}
                </span>
                <span className="px-3 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                  {msg.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverViewTab;









