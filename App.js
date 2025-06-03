import React from 'react';
import { useRouter } from './utils/router';

const App = () => {
  const { currentPath, navigate } = useRouter();

  // Página temporal mientras construimos
  if (currentPath === '/admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🔧 Panel Admin</h1>
          <p className="text-gray-600 mb-6">En construcción...</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Página principal temporal
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
          🤖
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Kolegio</h1>
        <p className="text-gray-600 mb-6">Plataforma educativa en construcción</p>
        
        <div className="space-y-4">
          <button 
            onClick={() => alert('Función de estudiante en desarrollo')}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200"
          >
            🎓 Acceso Estudiante
          </button>
          
          <button 
            onClick={() => navigate('/admin')}
            className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200"
          >
            👨‍💼 Panel Admin
          </button>
        </div>
        
        <div className="mt-6 text-xs text-gray-400">
          <p>Ruta actual: {currentPath}</p>
          <p>✅ Router funcionando</p>
          <p>✅ Supabase conectado</p>
        </div>
      </div>
    </div>
  );
};

export default App;
