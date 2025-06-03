import React from 'react';
import { Card } from '../common/Card';
import { FileText, PlayCircle, BookOpen } from '../common/Icons';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { NavigationHeader } from '../common/NavigationHeader';

export const TopicSelector = ({ 
  level,
  course,
  unit, 
  topics, 
  loading, 
  error, 
  onTopicSelect, 
  onBack,
  onRetry 
}) => {
  if (loading) {
    return (
      <div>
        <NavigationHeader 
          title={`${unit.name} - ${course.name}`}
          subtitle="Cargando temarios..."
          onBack={onBack}
        />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <LoadingSpinner message="Cargando temarios de la unidad..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavigationHeader 
          title={`${unit.name} - ${course.name}`}
          subtitle="Error al cargar"
          onBack={onBack}
        />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <ErrorMessage message={error} onRetry={onRetry} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavigationHeader 
        title={`${unit.name} - ${course.name}`}
        subtitle={`${topics.length} temarios disponibles`}
        onBack={onBack}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header de la unidad */}
        <div className="text-center mb-12">
          <div className={`bg-gradient-to-r ${course.bg_gradient} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {unit.name}
          </h2>
          {unit.description && (
            <p className="text-xl text-gray-600 mb-6">
              {unit.description}
            </p>
          )}
          <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
            <span>{level.name}</span>
            <span>•</span>
            <span>{course.name}</span>
          </div>
        </div>

        {/* Grid de temarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <Card
              key={topic.id}
              hoverable
              onClick={() => onTopicSelect(topic)}
              className="group relative"
            >
              <div className="text-center">
                {/* Número de tema */}
                <div className="absolute top-4 right-4">
                  <div className={`bg-gradient-to-r ${course.bg_gradient} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}>
                    {index + 1}
                  </div>
                </div>
                
                {/* Icono principal con animación */}
                <div className={`bg-gradient-to-r ${course.bg_gradient} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                  <FileText className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {topic.name}
                </h3>
                
                {topic.description && (
                  <p className="text-gray-600 mb-6">
                    {topic.description}
                  </p>
                )}
                
                {/* Indicadores de contenido disponible */}
                <div className="flex justify-center space-x-4 mb-6">
                  <div className="flex items-center text-xs text-gray-500">
                    <BookOpen className="w-4 h-4 mr-1 text-blue-500" />
                    Lecciones
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <FileText className="w-4 h-4 mr-1 text-green-500" />
                    Apuntes
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <PlayCircle className="w-4 h-4 mr-1 text-purple-500" />
                    Quizzes
                  </div>
                </div>
                
                <div className={`w-full bg-gradient-to-r ${course.bg_gradient} text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200`}>
                  Ver Contenido 🎯
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {topics.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No hay temarios disponibles
            </h3>
            <p className="text-gray-600">
              Los temarios para {unit.name} se agregarán próximamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
