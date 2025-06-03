import React, { useState } from 'react';
import { Settings } from '../common/Icons';
import { Button } from '../common/Button';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

export const AdminLogin = ({ onLogin, loading, error }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username.trim() && credentials.password.trim()) {
      onLogin(credentials.username.trim(), credentials.password.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Panel Admin</h1>
          <p className="text-gray-600">Sistema de gestión Kolegio</p>
        </div>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
              placeholder="admin"
              disabled={loading}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
              placeholder="••••••"
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            variant="danger"
            size="lg"
            loading={loading}
            disabled={!credentials.username.trim() || !credentials.password.trim()}
            className="w-full transform hover:scale-105 shadow-lg"
          >
            Iniciar Sesión Admin 🔑
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Credenciales por defecto: admin / 123456</p>
        </div>
      </div>
    </div>
  );
};
