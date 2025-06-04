import React from 'react';

export const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
    <div className="flex items-center">
      <div className="text-red-500 mr-3">⚠️</div>
      <div>
        <p className="text-red-800 font-medium">Error</p>
        <p className="text-red-600 text-sm">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  </div>
);
