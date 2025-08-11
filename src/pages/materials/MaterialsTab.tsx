
import React, { useState } from "react";

type MaterialItem = {
  name: string;
  status: string;
  quantity: string;
  cost: string;
  vendor: string;
  date: string;
};

type Project = {
  title: string;
  description: string;
  totalMaterials: number;
  totalCost: string;
  items: MaterialItem[];
};

const initialProjects: Project[] = [
  {
    title: "Kitchen Remodel - Smith Residence",
    description: "Complete Kitchen Renovation Including Cabinets, Countertops, And Appliances",
    totalMaterials: 2,
    totalCost: "$2,680",
    items: [
      {
        name: "Granite Countertops",
        status: "Pending",
        quantity: "3 Slabs",
        cost: "$2,500",
        vendor: "Premium Stone Co.",
        date: "Jul 15, 2024",
      },
      {
        name: "Cabinet Hardware",
        status: "Delivered",
        quantity: "24 Pieces",
        cost: "$180",
        vendor: "Smith Building Supplies",
        date: "Jul 12, 2024",
      },
    ],
  },
  {
    title: "Bathroom Renovation - Johnson Home",
    description: "Master Bathroom Complete Renovation",
    totalMaterials: 2,
    totalCost: "$895",
    items: [
      {
        name: "Marble Tiles",
        status: "Pending",
        quantity: "45 Sq Ft",
        cost: "$675",
        vendor: "Premium Stone Co.",
        date: "Jul 20, 2024",
      },
      {
        name: "Electrical Fixtures",
        status: "Delivered",
        quantity: "12 Lights",
        cost: "$220",
        vendor: "Wilson Electrical",
        date: "Jul 18, 2024",
      },
    ],
  },
];

const MaterialsTab = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const updateStatus = (projectIndex: number, itemIndex: number, newStatus: string) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].items[itemIndex].status = newStatus;
    setProjects(updatedProjects);
  };

  const getFilteredItems = (items: MaterialItem[]) =>
    items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vendor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

  return (
    <div className="p-6">
      {/* Filter/Search Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Materials..."
          className="border px-4 py-2 rounded-md text-sm w-full sm:w-[600px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded-md text-sm w-full sm:w-40"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Ordered">Ordered</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Project Groups */}
      {projects.map((project, pIndex) => {
        const filteredItems = getFilteredItems(project.items);

        return (
          <div
            key={pIndex}
            className="bg-white border border-gray-200 shadow-md rounded-xl p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                <p className="text-gray-500 text-sm">{project.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {project.totalMaterials} Materials - {project.totalCost}
                </span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Generate PO
                </button>
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <p className="text-gray-500 text-sm">No materials found.</p>
            ) : (
              filteredItems.map((item, iIndex) => (
                <div
                  key={iIndex}
                  className="border rounded-lg p-4 mb-4 shadow-sm flex justify-between items-start"
                >
                  <div>
                    <h4 className="text-base font-medium text-gray-800">{item.name}</h4>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1 items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Pending"
                            ? "bg-gray-100 text-gray-800"
                            : item.status === "Ordered"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Cost: {item.cost}</span>
                      <span className="text-purple-600">Vendor: {item.vendor}</span>
                      <span>Date: {item.date}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    {item.status === "Pending" && (
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                        onClick={() => updateStatus(pIndex, iIndex, "Ordered")}
                      >
                        Mark As Ordered
                      </button>
                    )}
                    {item.status === "Ordered" && (
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                        onClick={() => updateStatus(pIndex, iIndex, "Delivered")}
                      >
                        Mark As Delivered
                      </button>
                    )}
                    <button className="text-gray-500 hover:text-gray-700 text-xl">✎</button>
                    <button className="text-gray-500 hover:text-gray-700 text-xl">ℹ</button>
                  </div>
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MaterialsTab;
