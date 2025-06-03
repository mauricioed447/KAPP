import React from 'react';
import { ArrowLeft } from './Icons';

export const NavigationHeader = ({ 
  title, 
  subtitle, 
  onBack, 
  backText = "Volver",
  children 
}) => (
  <div className="bg-white shadow-sm border-b-2 border-gray-200">
    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        {onBack && (
          <button
            onClick={onBack}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors mr-2 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {backText}
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
      {children && (
        <div className="flex items-center space-x-4">
          {children}
        </div>
      )}
    </div>
  </div>
);
