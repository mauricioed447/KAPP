import React, { useState } from 'react';
import { NavigationHeader } from '../common/NavigationHeader';
import { TabNavigation } from '../common/TabNavigation';
import { BookOpen, FileText, PlayCircle, X } from '../common/Icons';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { Card } from '../common/Card';

export const ContentViewer = ({ 
  level,
  course,
  unit,
  topic,
  contents,
  loading,
  error,
  onBack,
  onRetry
}) => {
  const [activeTab, setActiveTab] = useState('lessons');

  // Organizar contenidos por tipo
  const organizeContent = () => {
    if (!contents || contents.length === 0) return { lessons: [], notes: [], quizzes: [] };
    
    return {
      lessons: contents
        .filter(c => c.content_type === 'lesson')
        .sort((a, b) => a.order_position - b.order_position),
      notes: contents
        .filter(c => c.content_type === 'notes')
        .sort((a, b) => a.order_position - b.order_position),
      quizzes: contents
        .filter(c => c.content_type === 'quiz')
        .sort((a, b) => a.order_position - b.order_position)
    };
  };

  const { lessons, notes, quizzes } = organizeContent();

  // Configurar pestañas
  const tabs = [
    {
      id: 'lessons',
      name: 'Lecciones',
      icon: BookOpen,
      count: lessons.length
    },
    {
      id: 'notes',
      name: 'Apuntes',
      icon: FileText,
      count: notes.length
    },
    {
      id: 'quizzes',
      name: 'Quizzes',
      icon: PlayCircle,
      count: quizzes.length
    }
  ];

  if (loading) {
    return (
      <div>
        <NavigationHeader 
          title={`${topic.name}`}
          subtitle="Cargando contenido..."
          onBack={onBack}
        />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <LoadingSpinner message="Cargando contenidos del temario..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavigationHeader 
          title={`${topic.name}`}
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
        title={topic.name}
        subtitle={`${unit.name} - ${course.name} - ${level.name}`}
        onBack={onBack}
      />
      
      {/* Header del temario */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className={`bg-gradient-to-r ${course.bg_gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {topic.name}
            </h2>
            {topic.description && (
              <p className="text-lg text-gray-600 mb-4">
                {topic.description}
              </p>
            )}
            <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
              <span>{level.name}</span>
              <span>•</span>
              <span>{course.name}</span>
              <span>•</span>
              <span>{unit.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <TabNavigation 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Contenido de las pestañas */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'lessons' && (
          <ContentList 
            items={lessons} 
            type="lessons" 
            course={course}
            emptyMessage="No hay lecciones disponibles para este temario"
            emptyIcon="🎥"
          />
        )}
        
        {activeTab === 'notes' && (
          <ContentList 
            items={notes} 
            type="notes" 
            course={course}
            emptyMessage="No hay apuntes disponibles para este temario"
            emptyIcon="📄"
          />
        )}
        
        {activeTab === 'quizzes' && (
          <ContentList 
            items={quizzes} 
            type="quizzes" 
            course={course}
            emptyMessage="No hay quizzes disponibles para este temario"
            emptyIcon="🎮"
          />
        )}
      </div>
    </div>
  );
};

const ContentList = ({ items, type, course, emptyMessage, emptyIcon }) => {
  const [selectedContent, setSelectedContent] = useState(null);

  const getIcon = () => {
    switch (type) {
      case 'lessons': return BookOpen;
      case 'notes': return FileText;
      case 'quizzes': return PlayCircle;
      default: return FileText;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'lessons': return 'from-blue-400 to-blue-600';
      case 'notes': return 'from-green-400 to-green-600';
      case 'quizzes': return 'from-purple-400 to-purple-600';
      default: return course.bg_gradient;
    }
  };

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div>
      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">{emptyIcon}</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {emptyMessage}
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((content) => {
            const IconComponent = getIcon();
            const colorGradient = getColor();
            return (
              <Card
                key={content.id}
                hoverable
                onClick={() => handleContentClick(content)}
                className="group"
              >
                <div className="text-center">
                  <div className={`bg-gradient-to-r ${colorGradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {content.name}
                  </h3>
                  
                  {content.description && (
                    <p className="text-gray-600 mb-4 text-sm">
                      {content.description}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      📈 {content.difficulty}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      ⏱️ {content.estimated_time}
                    </span>
                  </div>
                  
                  <div className={`w-full bg-gradient-to-r ${colorGradient} text-white font-bold py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-200 text-sm`}>
                    {type === 'lessons' && '▶️ Ver Lección'}
                    {type === 'notes' && '📖 Leer Apuntes'}
                    {type === 'quizzes' && '🎮 Jugar Quiz'}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative">
            <button
              onClick={() => setSelectedContent(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            {/* Aquí podrías insertar un iframe u otro componente para mostrar el contenido (video, documento, quiz, etc.) */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedContent.name}</h3>
              <iframe
                src={selectedContent.url}
                title={selectedContent.name}
                className="w-full h-96"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
