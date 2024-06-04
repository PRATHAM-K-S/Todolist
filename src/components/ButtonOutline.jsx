import React from "react";

const ButtonOutline = ({ children, type = "button", className = "",padding="py-1.5",...props }) => {
  return (
    <button
      type={type}
      className={`bg-transparent text-black border-2 border-black font-semibold ${padding} rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonOutline;
