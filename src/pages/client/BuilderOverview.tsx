import * as React from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import { workers } from "./builderData";
import { imagePath } from "../../constants/imagePath";
import BuilderProfileHeader from "./BuilderProfileHeader";
import { useClientContext } from "./ClientContext";

const BuilderOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { builderList } = useClientContext();
  // Use workers data for detailed information, fallback to builderList
  const builder = workers.find((w) => w.id === Number(id)) || builderList.find((w) => w.id === Number(id));

  if (!builder) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 text-center text-lg text-gray-500">
        Builder not found
      </div>
    );
  }

  const profileProps = {
    name: builder.name,
    logo: imagePath.BuilderLogo,
    license: "N/A",
    years: "5 Years",
    rating: builder.rating,
    services: [builder.role],
    stats: [
      {
        label: "Estimates Sent",
        value: <span className="text-green-500">{builder.estimatesSent || 0}</span>,
      },
      {
        label: "Active Jobs",
        value: <span className="text-purple-500">{builder.activeJobs || 0}</span>,
      },
      {
        label: "Total Revenue",
        value: (
          <span className="text-orange-500">
            ${(builder.totalRevenue || 0).toLocaleString()}
          </span>
        ),
      },
    ],
  };

  const tabList = [
    { key: "client-overview", label: "Overview" },
    { key: "client-jobs", label: "Jobs" },
    { key: "client-messages", label: "Messages" },
    { key: "client-documents", label: "Documents" },
    { key: "client-payments", label: "Payments" },
  ];
  const currentTab = location.pathname.split("/").pop() || "client-overview";
  
  // If we're on the main client page (without a specific tab), redirect to overview
  React.useEffect(() => {
    if (location.pathname === `/clients/${id}`) {
      navigate(`/clients/${id}/client-overview`);
    }
  }, [location.pathname, id, navigate]);

  return (

    // <div className="w-full min-h-screen lg:pl-60 d-flex flex-column gap-4">
    <div>
      {/* Profile Header */}
      <BuilderProfileHeader {...profileProps} />
      {/* </div> */}
      {/* <hr /> */}
      <div className="h-px bg-gray-200 mb-2" />

      {/* Tab Navigation */}

      {/* <div className="flex flex-col sm:flex-row w-full gap-2">
        {tabList.map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 text-center whitespace-nowrap px-4 py-2 rounded-lg text-base font-medium transition border ${
              currentTab === tab.key ||
              (currentTab === id && tab.key === "overview")
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
            }`}
            onClick={() => navigate(`/builder/${id}/${tab.key}`)}
          >
            {tab.label}
          </button>
        ))}
      </div> */}
<div className="flex flex-wrap justify-start w-full gap-2">
  {tabList.map((tab) => (
    <button
      key={tab.key}
      className={`flex-grow sm:flex-1 text-center whitespace-nowrap px-4 py-2 rounded-lg text-base font-medium transition border ${
        currentTab === tab.key ||
        (currentTab === id && tab.key === "overview")
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
      }`}
      onClick={() => navigate(`/clients/${id}/${tab.key}`)}
    >
      {tab.label}
    </button>
  ))}
</div>

      {/* Tab Content */}
      <div className=" p-4 w-full">
        <Outlet context={{ builder }} />
      </div>
    </div>
  );
};

export default BuilderOverview;
