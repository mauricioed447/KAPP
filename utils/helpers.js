// Formatear fechas
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('es-CL');
};

// Formatear fecha y hora
export const formatDateTime = (dateString) => {
  if (!dateString) return 'Nunca';
  return new Date(dateString).toLocaleString('es-CL');
};

// Generar ID único para entidades
export const generateId = (prefix = '') => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
};

// Validar URL
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Truncar texto
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Configuración de validación
export const VALIDATION_RULES = {
  minNameLength: 2,
  maxNameLength: 100,
  maxDescriptionLength: 500,
  requiredFields: ['name'],
  urlFields: ['url']
};
