import { useState } from 'react';

// Hook para manejar datos de Supabase
export const useSupabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeQuery = async (queryFn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, executeQuery };
};

// Hook para gestión del estado de la aplicación
export const useAppState = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentView, setCurrentView] = useState('levels'); // levels, courses, units, topics, content

  const resetNavigation = () => {
    setSelectedLevel(null);
    setSelectedCourse(null);
    setSelectedUnit(null);
    setSelectedTopic(null);
    setCurrentView('levels');
  };

  const navigateToLevel = (level) => {
    setSelectedLevel(level);
    setSelectedCourse(null);
    setSelectedUnit(null);
    setSelectedTopic(null);
    setCurrentView('courses');
  };

  const navigateToCourse = (course) => {
    setSelectedCourse(course);
    setSelectedUnit(null);
    setSelectedTopic(null);
    setCurrentView('units');
  };

  const navigateToUnit = (unit) => {
    setSelectedUnit(unit);
    setSelectedTopic(null);
    setCurrentView('topics');
  };

  const navigateToTopic = (topic) => {
    setSelectedTopic(topic);
    setCurrentView('content');
  };

  return {
    currentUser,
    setCurrentUser,
    selectedLevel,
    selectedCourse,
    selectedUnit,
    selectedTopic,
    currentView,
    resetNavigation,
    navigateToLevel,
    navigateToCourse,
    navigateToUnit,
    navigateToTopic
  };
};
