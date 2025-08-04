
import * as React from "react";
import { imagePath } from "../../constants/imagePath";

interface Builder {
  id: number;
  name: string;
  service: string;
  avatar: string;
  rating: number;
  status: "Active" | "Inactive";
}

interface BuilderListProps {
  builders: Builder[];
  onBuilderClick?: (builder: Builder) => void;
  selectedBuilderId?: number | null;
}

const BuilderList: React.FC<BuilderListProps> = ({
  builders,
  onBuilderClick,
  selectedBuilderId,
}) => {
  return (
    <div className="space-y-3">
      {builders.map((builder) => {
        const isSelected = selectedBuilderId === builder.id;

        return (
          <div
            key={builder.id}
            onClick={() => onBuilderClick && onBuilderClick(builder)}
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border cursor-pointer transition ${
              isSelected
                ? "bg-blue-50 border-blue-300"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
          >
            {/* Left section */}
            <div className="flex items-center gap-4">
              <img
                src={builder.avatar}
                alt={builder.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-gray-900">{builder.name}</div>
                <div className="text-sm text-gray-500">{builder.service}</div>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-1 text-sm ">
              <span className="flex items-center font-medium bg-gray-200 border border-gray-300 rounded-xl px-3 py-1">
              <img src={imagePath.Star} alt="star" className="w-4 h-4 mr-1" />
                 {builder.rating}
              </span>
              <span
                className={`flex items-center gap-1 font-medium bg-gray-200 border border-gray-300 rounded-xl px-3 py-1 ${
                  builder.status === "Active"
                    ? "text-gray-600"
                    : "text-gray-500"
                }`}
              >
                <img
                  src={
                    builder.status === "Active"
                      ? imagePath.StatusActive
                      : imagePath.StatusInactive
                  }
                  alt={builder.status}
                  className="w-3 h-3"
                />
                {builder.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BuilderList;
