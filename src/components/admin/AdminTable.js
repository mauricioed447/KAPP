import React from 'react';
import { Edit, Trash2 } from '../common/Icons';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

export const AdminTable = ({
  columns,
  data,
  loading,
  error,
  onEdit,
  onDelete,
  onRetry,
  keyField = 'id',
  emptyMessage = 'No hay datos disponibles'
}) => {
  if (loading) {
    return <LoadingSpinner message="Cargando datos..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider`}
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={row[keyField] || index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                    {column.render ? column.render(row[column.key], row, index) : row[column.key] || '-'}
                  </td>
                ))}
                <td className="px-4 py-3 text-center border-b border-gray-100">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => onEdit(row)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(row)}
                      className="text-red-600 hover:text-red-800 p-1 rounded"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pie de tabla con estadísticas */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Mostrando {data.length} elemento{data.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};
