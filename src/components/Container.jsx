import React from "react";

const Container = ({ children,className='' }) => {
  return <div className={`w-full mx-auto max-w-sm ${className}`}>{children}</div>;
};

export default Container;
