import React from 'react';
import { Plus, Search, Filter } from '../common/Icons';
import { Button } from '../common/Button';

export const AdminToolbar = ({ 
  title,
  onAdd,
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions = [],
  showExport = false,
  onExport,
  children
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">Gestión eficiente de contenido educativo</p>
        </div>
        <div className="flex space-x-3">
          {showExport && (
            <Button variant="secondary" onClick={onExport}>
              📊 Exportar
            </Button>
          )}
          <Button variant="success" onClick={onAdd} icon={Plus}>
            Agregar {title.slice(0, -1)}
          </Button>
        </div>
      </div>

      {/* Barra de herramientas */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Búsqueda */}
        <div className="relative min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Filtros */}
        {filterOptions.length > 0 && (
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterValue}
              onChange={(e) => onFilterChange(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none appearance-none bg-white min-w-40"
            >
              <option value="">Todos</option>
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Herramientas adicionales */}
        {children}
      </div>
    </div>
  );
};
