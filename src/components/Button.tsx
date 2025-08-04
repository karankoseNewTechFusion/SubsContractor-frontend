import React from "react";
import "./Button.css";

export type CustomButtonProps = {
  leftIcon?: React.ReactNode;
  centerIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  color?: string;
  textColor?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  leftIcon,
  centerIcon,
  rightIcon,
  color = "#007bff",
  textColor = "#ffffff",
  children,
  onClick,
  className = "",
  style = {},
  type = "button",
  disabled = false,
  loading = false,
  ariaLabel,
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`custom-btn ${disabled ? "disabled" : ""} ${className}`}
      style={{ backgroundColor: color, color: textColor, ...style }}
      onClick={onClick}
      aria-label={ariaLabel || (typeof children === "string" ? children : "button")}
    >
      {loading ? (
        <span className="spinner" />
      ) : (
        <>
          {leftIcon && <span className="btn-icon left">{leftIcon}</span>}
          {children && <span className="btn-text">{children}</span>}
          {centerIcon && <span className="btn-icon center">{centerIcon}</span>}
          {rightIcon && <span className="btn-icon right">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default CustomButton;
