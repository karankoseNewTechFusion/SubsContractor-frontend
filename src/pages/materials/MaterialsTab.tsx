    import React from "react";

const MaterialsTab = () => {
  const materialsData = {
    title: "Kitchen Remodel - Smith Residence",
    description: "Complete Kitchen Renovation Including Cabinets, Countertops, And Appliances",
    totalMaterials: 2,
    totalCost: "$2,680",
    items: [
      {
        name: "Granite Countertops",
        status: "Ordered",
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
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{materialsData.title}</h3>
          <p className="text-gray-500 text-sm">{materialsData.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {materialsData.totalMaterials} Materials - {materialsData.totalCost}
          </span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
            Generate PO
          </button>
        </div>
      </div>

      {materialsData.items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 py-4 flex justify-between items-center">
          <div>
            <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  item.status === "Ordered"
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
          <div className="flex gap-2">
            {item.status === "Ordered" && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                Mark As Delivered
              </button>
            )}
            <button className="text-gray-500 hover:text-gray-700">✎</button>
            <button className="text-gray-500 hover:text-gray-700">ℹ</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default MaterialsTab;
