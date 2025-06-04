import React from 'react';
import { Card } from '../common/Card';
import { BookOpen } from '../common/Icons';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { NavigationHeader } from '../common/NavigationHeader';

export const UnitSelector = ({ 
  level,
  course, 
  units, 
  loading, 
  error, 
  onUnitSelect, 
  onBack,
  onRetry 
}) => {
  if (loading) {
    return (
      <div>
        <NavigationHeader 
          title={`${course.name} - ${level.name}`}
          subtitle="Cargando unidades..."
          onBack={onBack}
        />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <LoadingSpinner message="Cargando unidades del curso..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavigationHeader 
          title={`${course.name} - ${level.name}`}
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
        title={`${course.name} - ${level.name}`}
        subtitle={`${units.length} unidades disponibles`}
        onBack={onBack}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header del curso con descripción */}
        <div className="text-center mb-12">
          <div className={`bg-gradient-to-r ${course.bg_gradient} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6`}>
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {course.name}
          </h2>
          {course.description && (
            <p className="text-xl text-gray-600 mb-6">
              {course.description}
            </p>
          )}
          <p className="text-lg text-gray-500">
            Selecciona una unidad para comenzar 📚
          </p>
        </div>

        {/* Grid de unidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {units.map((unit, index) => (
            <Card
              key={unit.id}
              hoverable
              onClick={() => onUnitSelect(unit)}
              className="group relative overflow-hidden"
            >
              <div className="text-center">
                {/* Número de unidad */}
                <div className="absolute top-4 right-4">
                  <div className={`bg-gradient-to-r ${course.bg_gradient} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {index + 1}
                  </div>
                </div>
                
                {/* Icono principal */}
                <div className={`bg-gradient-to-r ${course.bg_gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {unit.name}
                </h3>
                
                {unit.description && (
                  <p className="text-gray-600 mb-4 text-sm">
                    {unit.description}
                  </p>
                )}
                
                <div className={`w-full bg-gradient-to-r ${course.bg_gradient} text-white font-bold py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-200 text-sm`}>
                  Explorar Temarios ➡️
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {units.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No hay unidades disponibles
            </h3>
            <p className="text-gray-600">
              Las unidades para {course.name} se agregarán próximamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
