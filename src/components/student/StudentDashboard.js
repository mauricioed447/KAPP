import React from 'react';
import { LevelSelector } from './LevelSelector';
import { CourseSelector } from './CourseSelector';
import { StudentHeader } from './StudentHeader';

export const StudentDashboard = ({ 
  currentUser,
  currentView,
  selectedLevel,
  levels,
  courses,
  loading,
  error,
  onLevelSelect,
  onCourseSelect,
  onBack,
  onHome,
  onLogout,
  onRetry
}) => {
  const getSubtitle = () => {
    switch (currentView) {
      case 'levels': return 'Listo para aprender';
      case 'courses': return `Explorando ${selectedLevel?.name}`;
      default: return 'Navegando';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <StudentHeader
        studentName={currentUser.name}
        subtitle={getSubtitle()}
        onHome={currentView !== 'levels' ? onHome : null}
        onLogout={onLogout}
      />

      <main>
        {currentView === 'levels' && (
          <LevelSelector
            levels={levels}
            loading={loading}
            error={error}
            onLevelSelect={onLevelSelect}
            onRetry={onRetry}
          />
        )}
        
        {currentView === 'courses' && selectedLevel && (
          <CourseSelector
            level={selectedLevel}
            courses={courses}
            loading={loading}
            error={error}
            onCourseSelect={onCourseSelect}
            onBack={onBack}
            onRetry={onRetry}
          />
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>Kolegio® - Plataforma educativa. © 2025 Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
