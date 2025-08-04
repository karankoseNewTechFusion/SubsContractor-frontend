import * as React from "react";
import Card from "./Card";
import { imagePath } from "../../constants/imagePath";

interface BuilderProfileHeaderProps {
  name: string;
  logo: string;
  license: string;
  years: string;
  rating: number;
  services: string[];
  stats: { label: string; value: React.ReactNode; valueColor?: string }[];
}

const BuilderProfileHeader: React.FC<BuilderProfileHeaderProps> = ({
  name,
  logo,
  license,
  years,
  rating,
  services,
  stats,
}) => {
  return (
    <div className="w-full bg-white p-6 ">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-row lg:flex-row items-center gap-4">
          {/* Logo */}
          <div className="w-28 h-28 flex justify-center items-center bg-gray-100 rounded-xl">
            <img
              src={logo || imagePath.BuilderLogo}
              alt={name}
              className="w-16 h-16 object-contain"
            />
          </div>

          {/* Text Info */}
          <div className=" lg:text-left">
            <div className="text-xl font-bold text-gray-900 mb-1">{name}</div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                ● {license}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                ■ {years}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                ★ {rating}
              </span>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {services.map((service, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Stats */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start items-center gap-4 flex-wrap:wrap">
          {stats.slice(0, 3).map((stat, idx) => (
            <Card
              key={idx}
              title={stat.label}
              value={stat.value}
              valueColor={stat.valueColor}
              subtitle=""
              customClass="w-[110px] sm:w-[120px] md:w-[130px] lg:w-[140px] h-[110px] sm:h-[120px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuilderProfileHeader;
