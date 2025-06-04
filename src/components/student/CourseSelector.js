import React from 'react';
import { Card } from '../common/Card';
import { BookOpen } from '../common/Icons';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { NavigationHeader } from '../common/NavigationHeader';

export const CourseSelector = ({ 
  level, 
  courses, 
  loading, 
  error, 
  onCourseSelect, 
  onBack,
  onRetry 
}) => {
  if (loading) {
    return (
      <div>
        <NavigationHeader 
          title={level.name}
          subtitle="Cargando cursos..."
          onBack={onBack}
        />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <LoadingSpinner message="Cargando cursos disponibles..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavigationHeader 
          title={level.name}
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
        title={level.name}
        subtitle={`${courses.length} cursos disponibles`}
        onBack={onBack}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Elige tu Curso Favorito
          </h2>
          <p className="text-xl text-gray-600">
            Cada materia te llevará a nuevos descubrimientos 🌟
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              hoverable
              onClick={() => onCourseSelect(course)}
              className="group"
            >
              <div className="text-center">
                <div className={`bg-gradient-to-r ${course.bg_gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {course.name}
                </h3>
                
                {course.description && (
                  <p className="text-gray-600 mb-4">
                    {course.description}
                  </p>
                )}
                
                <div className={`w-full bg-gradient-to-r ${course.bg_gradient} text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200`}>
                  Empezar Curso 🚀
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {courses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No hay cursos disponibles
            </h3>
            <p className="text-gray-600">
              Los cursos para {level.name} se agregarán próximamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
