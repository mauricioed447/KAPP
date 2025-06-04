import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { useSupabase, useAppState } from '../../services/hooks';
import { StudentLogin } from './StudentLogin';
import { StudentDashboard } from './StudentDashboard';
import { UnitSelector } from './UnitSelector';
import { TopicSelector } from './TopicSelector';
import { ContentViewer } from './ContentViewer';
import { CourseSelector } from './CourseSelector';

export const StudentApp = ({ navigate }) => {
  // Estados principales
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loading, error, executeQuery } = useSupabase();
  
  // Estados de navegación jerárquica
  const {
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
  } = useAppState();

  // Estados de datos
  const [levels, setLevels] = useState([]);
  const [courses, setCourses] = useState([]);
  const [units, setUnits] = useState([]);
  const [topics, setTopics] = useState([]);
  const [contents, setContents] = useState([]);

  // ================== FUNCIONES DE CARGA DE DATOS ==================

  // Cargar niveles educativos
  const loadLevels = async () => {
    try {
      const data = await executeQuery(() =>
        supabase.select('levels', '?active=eq.true&select=*&order=order_position')
      );
      setLevels(data || []);
    } catch (err) {
      console.error('Error loading levels:', err);
    }
  };

  // Cargar cursos por nivel
  const loadCourses = async (levelId) => {
    try {
      const data = await executeQuery(() =>
        supabase.select('courses', `?level_id=eq.${levelId}&active=eq.true&select=*&order=order_position`)
      );
      setCourses(data || []);
    } catch (err) {
      console.error('Error loading courses:', err);
    }
  };

  // Cargar unidades por curso
  const loadUnits = async (courseId) => {
    try {
      const data = await executeQuery(() =>
        supabase.select('units', `?course_id=eq.${courseId}&active=eq.true&select=*&order=order_position`)
      );
      setUnits(data || []);
    } catch (err) {
      console.error('Error loading units:', err);
    }
  };

  // Cargar temarios por unidad
  const loadTopics = async (unitId) => {
    try {
      const data = await executeQuery(() =>
        supabase.select('topics', `?unit_id=eq.${unitId}&active=eq.true&select=*&order=order_position`)
      );
      setTopics(data || []);
    } catch (err) {
      console.error('Error loading topics:', err);
    }
  };

  // Cargar contenidos por temario
  const loadContents = async (topicId) => {
    try {
      const data = await executeQuery(() =>
        supabase.select('contents', `?topic_id=eq.${topicId}&active=eq.true&select=*&order=order_position`)
      );
      setContents(data || []);
    } catch (err) {
      console.error('Error loading contents:', err);
    }
  };

  // ================== MANEJO DE SESIÓN ==================

  const handleLogin = async (studentName) => {
    try {
      // Simplicidad: con solo el nombre de estudiante
      const student = { name: studentName };
      setCurrentUser(student);
      setIsLoggedIn(true);
      await loadLevels();
    } catch (err) {
      console.error('Error en login de estudiante:', err);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    resetNavigation();
    setCurrentUser(null);
  };

  // ================== NAVIGACIÓN ==================

  const handleLevelSelect = async (level) => {
    navigateToLevel(level);
    await loadCourses(level.id);
  };

  const handleCourseSelect = async (course) => {
    navigateToCourse(course);
    await loadUnits(course.id);
  };

  const handleUnitSelect = async (unit) => {
    navigateToUnit(unit);
    await loadTopics(unit.id);
  };

  const handleTopicSelect = async (topic) => {
    navigateToTopic(topic);
    await loadContents(topic.id);
  };

  const handleBackFromCourses = () => {
    resetNavigation();
    setCourses([]);
    setUnits([]);
    setTopics([]);
    setContents([]);
  };

  const handleBackFromUnits = () => {
    navigateToLevel(selectedLevel);
    setUnits([]);
    setTopics([]);
    setContents([]);
  };

  const handleBackFromTopics = () => {
    navigateToCourse(selectedCourse);
    setTopics([]);
    setContents([]);
  };

  const handleBackFromContent = () => {
    navigateToTopic(selectedTopic);
    setContents([]);
  };

  const handleRetry = async () => {
    switch (currentView) {
      case 'levels': await loadLevels(); break;
      case 'courses': await loadCourses(selectedLevel.id); break;
      case 'units': await loadUnits(selectedCourse.id); break;
      case 'topics': await loadTopics(selectedUnit.id); break;
      case 'content': await loadContents(selectedTopic.id); break;
      default: break;
    }
  };

  // ================== EFECTOS ==================

  useEffect(() => {
    if (isLoggedIn) {
      loadLevels();
    }
  }, [isLoggedIn]);

  // ================== RENDER ==================

  if (!isLoggedIn) {
    return (
      <StudentLogin
        onLogin={handleLogin}
        loading={loading}
        error={error}
      />
    );
  }

  // Vista de niveles
  if (currentView === 'levels') {
    return (
      <StudentDashboard
        currentUser={currentUser}
        currentView={currentView}
        selectedLevel={selectedLevel}
        levels={levels}
        courses={courses}
        loading={loading}
        error={error}
        onLevelSelect={handleLevelSelect}
        onCourseSelect={handleCourseSelect}
        onBack={handleBackFromCourses}
        onHome={() => resetNavigation()}
        onLogout={handleLogout}
        onRetry={handleRetry}
      />
    );
  }

  // Vista de cursos
  if (currentView === 'courses' && selectedLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <CourseSelector
          level={selectedLevel}
          courses={courses}
          loading={loading}
          error={error}
          onCourseSelect={handleCourseSelect}
          onBack={handleBackFromCourses}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  // Vista de unidades
  if (currentView === 'units' && selectedLevel && selectedCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <UnitSelector
          level={selectedLevel}
          course={selectedCourse}
          units={units}
          loading={loading}
          error={error}
          onUnitSelect={handleUnitSelect}
          onBack={handleBackFromUnits}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  // Vista de temarios
  if (currentView === 'topics' && selectedLevel && selectedCourse && selectedUnit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <TopicSelector
          level={selectedLevel}
          course={selectedCourse}
          unit={selectedUnit}
          topics={topics}
          loading={loading}
          error={error}
          onTopicSelect={handleTopicSelect}
          onBack={handleBackFromTopics}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  // Vista de contenidos (lecciones, apuntes, quizzes)
  if (currentView === 'content' && selectedLevel && selectedCourse && selectedUnit && selectedTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <ContentViewer
          level={selectedLevel}
          course={selectedCourse}
          unit={selectedUnit}
          topic={selectedTopic}
          contents={contents}
          loading={loading}
          error={error}
          onBack={handleBackFromContent}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  // Estado de error o fallback
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🤔</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Algo salió mal
        </h2>
        <p className="text-gray-600 mb-6">
          No se pudo determinar qué mostrar.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};
