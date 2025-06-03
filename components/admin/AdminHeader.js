import React from 'react';
import { Settings, Home } from '../common/Icons';
import { Button } from '../common/Button';

export const AdminHeader = ({ currentSection, onNavigate, onLogout, onStudentView }) => {
  return (
    <header className="bg-white shadow-lg border-b-2 border-red-200">
      <div className="max-w-full px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Panel Administrador</h1>
            <p className="text-sm text-gray-600">Gestión de contenido educativo - Kolegio</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="primary"
            onClick={onStudentView}
            icon={Home}
          >
            Vista Estudiante
          </Button>
          <Button
            variant="danger"
            onClick={onLogout}
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </header>
  );
};
