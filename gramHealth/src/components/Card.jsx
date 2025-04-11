import React from "react";

// Card.jsx
export const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-2xl shadow-md bg-white ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "p-4" }) => {
  return <div className={className}>{children}</div>;
};
