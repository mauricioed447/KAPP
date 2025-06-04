import React from 'react';
import { Card } from '../common/Card';
import { BookOpen } from '../common/Icons';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

export const LevelSelector = ({ levels, loading, error, onLevelSelect, onRetry }) => {
  if (loading) {
    return <LoadingSpinner message="Cargando niveles educativos..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Selecciona tu Nivel Educativo
        </h2>
        <p className="text-xl text-gray-600">
          Elige el nivel que corresponde a tu año de estudio 📚
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {levels.map((level) => (
          <Card
            key={level.id}
            hoverable
            onClick={() => onLevelSelect(level)}
            className="group"
          >
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-400 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {level.name}
              </h3>
              
              {level.description && (
                <p className="text-gray-600 mb-6">
                  {level.description}
                </p>
              )}
              
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 w-full">
                Explorar Cursos 🚀
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {levels.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            No hay niveles disponibles
          </h3>
          <p className="text-gray-600">
            Los niveles educativos se cargarán próximamente.
          </p>
        </div>
      )}
    </div>
  );
};
