import React, { useState } from 'react';
import { RobotIcon } from '../common/RobotIcon';
import { Button } from '../common/Button';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const StudentLogin = ({ onLogin, loading, error }) => {
  const [studentName, setStudentName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentName.trim()) {
      onLogin(studentName.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <RobotIcon className="w-20 h-20" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Kolegio</h1>
          <p className="text-gray-600">Tu plataforma de aprendizaje favorita</p>
        </div>
        
        {/* Aviso de configuración si no hay variables de entorno */}
        {(!SUPABASE_URL || !SUPABASE_ANON_KEY) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="text-yellow-800 text-sm">
              <p className="font-semibold">⚠️ Configuración requerida</p>
              <p>Las variables de entorno no están configuradas.</p>
            </div>
          </div>
        )}
        
        {error && <ErrorMessage message={error} />}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cómo te llamas?
            </label>
            <input
              type="text"
              id="name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
              placeholder="Escribe tu nombre aquí..."
              disabled={loading}
              autoFocus
            />
          </div>
          
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            loading={loading}
            disabled={!studentName.trim() || !SUPABASE_URL || !SUPABASE_ANON_KEY}
            className="w-full transform hover:scale-105 shadow-lg"
          >
            ¡Comenzar a Aprender! 🎯
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          Únete a miles de estudiantes que ya aprenden con nosotros
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-400 text-center space-y-1">
            <p>Kolegio® es una marca registrada.</p>
            <p>© 2025 Kolegio. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
