import React from "react";
import CustomButton from "./Button";

interface CommandHeaderProps {
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  buttonIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const CommandHeader: React.FC<CommandHeaderProps> = ({
  title,
  subtitle,
  buttonLabel,
  onButtonClick,
  buttonIcon,
  children,
}) => {
  return (
    <div className="w-full">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="font-bold text-2xl text-gray-900 mb-1">{title}</div>
          {subtitle && <div className="text-gray-500 text-sm">{subtitle}</div>}
        </div>
        {buttonLabel && (
          <CustomButton
            leftIcon={buttonIcon}
            onClick={onButtonClick}
            className="px-4 py-2"
          >
            {buttonLabel}
          </CustomButton>
        )}
      </div>
      {/* Cards or children */}
      {children && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default CommandHeader; 