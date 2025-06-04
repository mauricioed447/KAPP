import React from 'react';
import { RobotIcon } from '../common/RobotIcon';
import { Button } from '../common/Button';
import { Home } from '../common/Icons';

export const StudentHeader = ({ 
  studentName, 
  subtitle = "Listo para aprender",
  onHome,
  onLogout,
  children 
}) => (
  <header className="bg-white shadow-sm border-b-2 border-green-200">
    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        {onHome && (
          <button
            onClick={onHome}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors mr-2"
          >
            <Home className="w-5 h-5" />
          </button>
        )}
        <RobotIcon className="w-12 h-12" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kolegio</h1>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {children}
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-800">¡Hola, {studentName}! 👋</p>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
        <Button
          variant="danger"
          onClick={onLogout}
        >
          Salir
        </Button>
      </div>
    </div>
  </header>
);
