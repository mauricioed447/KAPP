// Configuración de Supabase con variables de entorno
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Cliente Supabase simple
export class SupabaseClient {
  constructor(url, key) {
    this.url = url;
    this.key = key;
    this.headers = {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': `Bearer ${key}`
    };
  }

  async query(table, method = 'GET', data = null, filters = '') {
    const url = `${this.url}/rest/v1/${table}${filters}`;
    const options = {
      method,
      headers: this.headers
    };
    
    if (data && (method === 'POST' || method === 'PATCH')) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const text = await response.text();
      if (!text) return [];
      
      try {
        return JSON.parse(text);
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError, 'Response text:', text);
        return [];
      }
    } catch (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
  }

  async select(table, filters = '') {
    return this.query(table, 'GET', null, filters);
  }

  async insert(table, data) {
    return this.query(table, 'POST', data);
  }

  async update(table, data, filters) {
    return this.query(table, 'PATCH', data, filters);
  }

  async delete(table, filters) {
    return this.query(table, 'DELETE', null, filters);
  }
}

// Verificar configuración
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Variables de entorno faltantes. Configura REACT_APP_SUPABASE_URL y REACT_APP_SUPABASE_ANON_KEY');
}

// Instancia del cliente
export const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
