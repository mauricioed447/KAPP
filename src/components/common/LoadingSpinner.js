import React from 'react';
import { Loader } from './Icons';

export const LoadingSpinner = ({ message = "Cargando...", size = "w-8 h-8" }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader className={`${size} text-blue-500 mb-4`} />
    <p className="text-gray-600">{message}</p>
  </div>
);
