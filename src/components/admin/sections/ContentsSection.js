import React, { useState, useEffect } from 'react';
import { AdminToolbar } from '../AdminToolbar';
import { AdminTable } from '../AdminTable';
import { AdminFormModal } from '../AdminFormModal';
import { supabase } from '../../../services/supabase';
import { useSupabase } from '../../../services/hooks';
import { CONTENT_TYPES } from '../../../utils/constants';
import { generateId } from '../../../utils/helpers';

export const ContentsSection = () => {
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [levels, setLevels] = useState([]);
  const [courses, setCourses] = useState([]);
  const [units, setUnits] = useState([]);
  const [topics, setTopics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const { loading, error, executeQuery } = useSupabase();

  const columns = [
    { key: 'name', label: 'Nombre', width: '25%' },
    { key: 'topic_name', label: 'Temario', width: '20%' },
    { 
      key: 'content_type', 
      label: 'Tipo', 
      width: '10%',
      render: (value) => {
        const colors = { lesson: 'blue', notes: 'green', quiz: 'purple' };
        const labels = { lesson: 'Lección', notes: 'Apuntes', quiz: 'Quiz' };
        return (
          <span className={`px-2 py-1 rounded-full text-xs bg-${colors[value]}-100 text-${colors[value]}-800`}>
            {labels[value]}
          </span>
        );
      }
    },
    { key: 'difficulty', label: 'Dificultad', width: '10%' },
    { key: 'estimated_time', label: 'Duración', width: '10%' },
    { 
      key: 'url', 
      label: 'URL', 
      width: '25%',
      render: (value) => (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate block">
          {value}
        </a>
      )
    }
  ];

  const formFields = [
    { key: 'name', label: 'Nombre', type: 'text', required: true, fullWidth: true },
    { key: 'level_id', label: 'Nivel', type: 'select', required: true, options: levels.map(l => ({ value: l.id, label: l.name })) },
    { key: 'course_id', label: 'Curso', type: 'select', required: true, options: courses.map(c => ({ value: c.id, label: c.name })) },
    { key: 'unit_id', label: 'Unidad', type: 'select', required: true, options: units.map(u => ({ value: u.id, label: u.name })) },
    { key: 'topic_id', label: 'Temario', type: 'select', required: true, options: topics.map(t => ({ value: t.id, label: t.name })) },
    { key: 'content_type', label: 'Tipo', type: 'select', required: true, options: [
      { value: 'lesson', label: 'Lección' },
      { value: 'notes', label: 'Apuntes' },
      { value: 'quiz', label: 'Quiz' }
    ]},
    { key: 'url', label: 'URL', type: 'url', required: true, fullWidth: true, placeholder: 'https://...' },
    { key: 'description', label: 'Descripción', type: 'textarea', fullWidth: true },
    { key: 'difficulty', label: 'Dificultad', type: 'select', options: [
      { value: 'Principiante', label: 'Principiante' },
      { value: 'Intermedio', label: 'Intermedio' },
      { value: 'Avanzado', label: 'Avanzado' }
    ]},
    { key: 'estimated_time', label: 'Duración Estimada', type: 'text', placeholder: '10 min' },
    { key: 'order_position', label: 'Orden', type: 'number', defaultValue: '0' },
    { key: 'active', label: 'Estado', type: 'select', options: [
      { value: true, label: 'Activo' },
      { value: false, label: 'Inactivo' }
    ], defaultValue: true }
  ];

  const loadHierarchy = async () => {
    try {
      const [lvls, crs, uts, tps] = await Promise.all([
        executeQuery(() => supabase.select('levels', '?select=*&order=order_position')),
        executeQuery(() => supabase.select('courses', '?select=*&order=order_position')),
        executeQuery(() => supabase.select('units', '?select=*&order=order_position')),
        executeQuery(() => supabase.select('topics', '?select=*&order=order_position'))
      ]);
      setLevels(lvls || []);
      setCourses(crs || []);
      setUnits(uts || []);
      setTopics(tps || []);
    } catch (err) {
      console.error('Error loading hierarchy:', err);
    }
  };

  const loadContents = async () => {
    try {
      const data = await executeQuery(() => supabase.select('v_content_hierarchy', '?select=*&order=level_order,course_order,unit_order,topic_order,content_order'));
      setContents(data || []);
    } catch (err) {
      console.error('Error loading contents:', err);
    }
  };

  const handleSave = async (formData) => {
    try {
      const contentData = {
        ...formData,
        id: generateId('content'),
        created_at: new Date().toISOString()
      };
      
      if (editingItem) {
        await executeQuery(() => supabase.update('contents', contentData, `?id=eq.${editingItem.content_id}`));
      } else {
        await executeQuery(() => supabase.insert('contents', contentData));
      }
      
      await loadContents();
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      console.error('Error saving content:', err);
    }
  };

  const handleDelete = async (item) => {
    if (window.confirm(`¿Eliminar "${item.content_name}"?`)) {
      try {
        await executeQuery(() => supabase.delete('contents', `?id=eq.${item.content_id}`));
        await loadContents();
      } catch (err) {
        console.error('Error deleting content:', err);
      }
    }
  };

  useEffect(() => {
    loadContents();
    loadHierarchy();
  }, []);

  useEffect(() => {
    let filtered = contents;
    
    if (searchTerm) {
      filtered = filtered.filter(content =>
        content.content_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.topic_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.course_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterType) {
      filtered = filtered.filter(content => content.content_type === filterType);
    }
    
    setFilteredContents(filtered);
  }, [contents, searchTerm, filterType]);

  return (
    <div className="p-6">
      <AdminToolbar
        title="Contenidos"
        onAdd={() => setShowModal(true)}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={filterType}
        onFilterChange={setFilterType}
        filterOptions={[
          { value: 'lesson', label: 'Lecciones' },
          { value: 'notes', label: 'Apuntes' },
          { value: 'quiz', label: 'Quizzes' }
        ]}
        showExport={true}
      />
      
      <AdminTable
        columns={columns}
        data={filteredContents}
        loading={loading}
        error={error}
        onEdit={(item) => { setEditingItem(item); setShowModal(true); }}
        onDelete={handleDelete}
        onRetry={loadContents}
        keyField="content_id"
        emptyMessage="No hay contenidos disponibles"
      />

      <AdminFormModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingItem(null); }}
        onSave={handleSave}
        title={editingItem ? 'Editar Contenido' : 'Nuevo Contenido'}
        data={editingItem || {}}
        fields={formFields}
        loading={loading}
      />
    </div>
  );
};
