import React from "react";

const Container = ({ children,className='' }) => {
  return <div className={`w-full max-w-md ${className}`}>{children}</div>;
};

export default Container;
