import React from 'react';
import { BookOpen, FileText, PlayCircle, Users, Settings as SettingsIcon } from '../common/Icons';

export const AdminNavigation = ({ currentSection, onSectionChange, stats = {} }) => {
  const sections = [
    {
      id: 'levels',
      name: 'Niveles',
      icon: SettingsIcon,
      count: stats.levels || 0,
      description: 'Gestionar niveles educativos'
    },
    {
      id: 'courses',
      name: 'Cursos',
      icon: BookOpen,
      count: stats.courses || 0,
      description: 'Administrar cursos por nivel'
    },
    {
      id: 'units',
      name: 'Unidades',
      icon: FileText,
      count: stats.units || 0,
      description: 'Organizar unidades temáticas'
    },
    {
      id: 'topics',
      name: 'Temarios',
      icon: PlayCircle,
      count: stats.topics || 0,
      description: 'Configurar temarios específicos'
    },
    {
      id: 'contents',
      name: 'Contenidos',
      icon: FileText,
      count: stats.contents || 0,
      description: 'Gestión masiva de lecciones, apuntes y quizzes'
    },
    {
      id: 'students',
      name: 'Estudiantes',
      icon: Users,
      count: stats.students || 0,
      description: 'Monitoreo de estudiantes registrados'
    }
  ];

  return (
    <nav className="bg-gray-50 border-b border-gray-200 overflow-x-auto">
      <div className="max-w-full px-6 py-3">
        <div className="flex space-x-1 min-w-max">
          {sections.map(({ id, name, icon: Icon, count, description }) => (
            <button
              key={id}
              onClick={() => onSectionChange(id)}
              className={`px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 min-w-max ${
                currentSection === id
                  ? 'bg-white shadow-md text-red-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-gray-400">{description}</p>
              </div>
              <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
