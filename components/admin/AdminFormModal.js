import React, { useState, useEffect } from 'react';
import { X, Save } from '../common/Icons';
import { Button } from '../common/Button';
import { COLOR_GRADIENTS } from '../../utils/constants';

export const AdminFormModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  title, 
  data = {}, 
  fields = [], 
  loading = false 
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      // Inicializar formulario con datos existentes o valores por defecto
      const initialData = {};
      fields.forEach(field => {
        initialData[field.key] = data[field.key] || field.defaultValue || '';
      });
      setFormData(initialData);
    }
  }, [isOpen, data, fields]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key} className={field.fullWidth ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === 'select' ? (
                  <select
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    required={field.required}
                  >
                    <option value="">Seleccionar...</option>
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    rows={3}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                ) : field.type === 'color-gradient' ? (
                  <select
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    required={field.required}
                  >
                    {COLOR_GRADIENTS.map(gradient => (
                      <option key={gradient.value} value={gradient.value}>
                        {gradient.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={field.disabled}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" variant="success" loading={loading} icon={Save}>
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
