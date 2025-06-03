import React, { useState, useEffect } from 'react';
import { AdminToolbar } from '../AdminToolbar';
import { AdminTable } from '../AdminTable';
import { AdminFormModal } from '../AdminFormModal';
import { supabase } from '../../services/supabase';
import { useSupabase } from '../../services/hooks';
import { generateId } from '../../utils/helpers';

export const LevelsSection = () => {
  const [levels, setLevels] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, executeQuery } = useSupabase();

  const columns = [
    { key: 'name', label: 'Nombre', width: '30%' },
    { key: 'order_position', label: 'Orden', width: '15%' },
    { key: 'description', label: 'Descripción', width: '40%' },
    { 
      key: 'active', 
      label: 'Estado', 
      width: '15%',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {value ? 'Activo' : 'Inactivo'}
        </span>
      )
    }
  ];

  const formFields = [
    { key: 'id', label: 'ID', type: 'text', required: true, placeholder: 'ej: septimo-basico' },
    { key: 'name', label: 'Nombre', type: 'text', required: true, placeholder: 'ej: Séptimo Básico' },
    { key: 'order_position', label: 'Posición', type: 'number', required: true, defaultValue: '1' },
    { key: 'description', label: 'Descripción', type: 'textarea', fullWidth: true, placeholder: 'Descripción del nivel educativo' },
    { key: 'active', label: 'Estado', type: 'select', options: [{ value: true, label: 'Activo' }, { value: false, label: 'Inactivo' }], defaultValue: true }
  ];

  const loadLevels = async () => {
    try {
      const data = await executeQuery(() => supabase.select('levels', '?select=*&order=order_position'));
      setLevels(data || []);
    } catch (err) {
      console.error('Error loading levels:', err);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingItem) {
        await executeQuery(() => supabase.update('levels', formData, `?id=eq.${editingItem.id}`));
      } else {
        await executeQuery(() => supabase.insert('levels', { ...formData, created_at: new Date().toISOString() }));
      }
      await loadLevels();
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      console.error('Error saving level:', err);
    }
  };

  const handleDelete = async (item) => {
    if (window.confirm(`¿Eliminar el nivel "${item.name}"?`)) {
      try {
        await executeQuery(() => supabase.delete('levels', `?id=eq.${item.id}`));
        await loadLevels();
      } catch (err) {
        console.error('Error deleting level:', err);
      }
    }
  };

  useEffect(() => {
    loadLevels();
  }, []);

  useEffect(() => {
    const filtered = levels.filter(level =>
      level.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLevels(filtered);
  }, [levels, searchTerm]);

  return (
    <div className="p-6">
      <AdminToolbar
        title="Niveles"
        onAdd={() => setShowModal(true)}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <AdminTable
        columns={columns}
        data={filteredLevels}
        loading={loading}
        error={error}
        onEdit={(item) => { setEditingItem(item); setShowModal(true); }}
        onDelete={handleDelete}
        onRetry={loadLevels}
        emptyMessage="No hay niveles configurados"
      />

      <AdminFormModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingItem(null); }}
        onSave={handleSave}
        title={editingItem ? 'Editar Nivel' : 'Nuevo Nivel'}
        data={editingItem || {}}
        fields={formFields}
        loading={loading}
      />
    </div>
  );
};
