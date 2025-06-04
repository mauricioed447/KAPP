import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { useSupabase } from '../../services/hooks';
import { AdminLogin } from './AdminLogin';
import { AdminHeader } from './AdminHeader';
import { AdminNavigation } from './AdminNavigation';
import { LevelsSection } from './sections/LevelsSection';
import { ContentsSection } from './sections/ContentsSection';

// Componentes simplificados para otras secciones
const SimpleSection = ({ title, description }) => (
  <div className="p-6">
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="text-4xl mb-4">🚧</div>
      <p className="text-gray-500">Sección en desarrollo. Usa el mismo patrón que Niveles y Contenidos.</p>
    </div>
  </div>
);

export const AdminApp = ({ navigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentSection, setCurrentSection] = useState('levels');
  const [stats, setStats] = useState({});
  const { loading, error, executeQuery } = useSupabase();

  // ================== AUTENTICACIÓN ==================

  const handleLogin = async (username, password) => {
    try {
      const admins = await executeQuery(() => supabase.select('admins', `?username=eq.${username}`));
      if (admins && admins.length > 0) {
        const admin = admins[0];
        if (admin.password === password) {
          setIsLoggedIn(true);
          await loadStats();
        } else {
          throw new Error('Contraseña incorrecta');
        }
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (err) {
      console.error('Error during admin login:', err);
      throw err;
    }
  };

  const loadStats = async () => {
    try {
      const [levels, courses, units, topics, contents, students] = await Promise.all([
        executeQuery(() => supabase.select('levels', '?select=count')),
        executeQuery(() => supabase.select('courses', '?select=count')),
        executeQuery(() => supabase.select('units', '?select=count')),
        executeQuery(() => supabase.select('topics', '?select=count')),
        executeQuery(() => supabase.select('contents', '?select=count')),
        executeQuery(() => supabase.select('students', '?select=count'))
      ]);

      setStats({
        levels: levels?.length || 0,
        courses: courses?.length || 0,
        units: units?.length || 0,
        topics: topics?.length || 0,
        contents: contents?.length || 0,
        students: students?.length || 0
      });
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentSection('levels');
    setStats({});
  };

  // ================== EFECTOS ==================

  useEffect(() => {
    if (isLoggedIn) loadStats();
  }, [isLoggedIn]);

  // ================== RENDER ==================

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} loading={loading} error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader
        currentSection={currentSection}
        onLogout={handleLogout}
        onStudentView={() => navigate('/')}
      />
      
      <AdminNavigation
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        stats={stats}
      />

      <main className="max-w-full">
        {currentSection === 'levels' && <LevelsSection />}
        {currentSection === 'courses' && <SimpleSection title="Gestión de Cursos" description="CRUD de cursos por nivel educativo" />}
        {currentSection === 'units' && <SimpleSection title="Gestión de Unidades" description="CRUD de unidades por curso" />}
        {currentSection === 'topics' && <SimpleSection title="Gestión de Temarios" description="CRUD de temarios por unidad" />}
        {currentSection === 'contents' && <ContentsSection />}
        {currentSection === 'students' && <SimpleSection title="Gestión de Estudiantes" description="Monitoreo de estudiantes registrados" />}
      </main>
    </div>
  );
};
