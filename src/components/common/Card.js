import React from 'react';

export const Card = ({ 
  children, 
  className = "", 
  onClick, 
  hoverable = false,
  gradient,
  icon: IconComponent
}) => {
  const baseClasses = "bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100";
  const hoverClasses = hoverable ? "hover:shadow-2xl hover:border-gray-200 cursor-pointer transform hover:scale-105 transition-all duration-300" : "";
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {gradient && IconComponent && (
        <div className={`bg-gradient-to-r ${gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
      )}
      {children}
    </div>
  );
};
