import React from "react";

const Button = ({ children, type = "button", className = "",padding="py-1.5",...props }) => {
  return (
    <button
      type={type}
      className={`bg-gray-950 text-white font-semibold ${padding} rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
