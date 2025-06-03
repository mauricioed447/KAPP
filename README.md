# 🎓 Kolegio - Plataforma Educativa

Una plataforma educativa moderna construida con React y Supabase que permite a estudiantes acceder a cursos y quizzes interactivos, mientras los administradores gestionan el contenido.

## ✨ Características

### 👨‍🎓 Para Estudiantes
- ✅ Registro automático con nombre
- ✅ Navegación por cursos disponibles
- ✅ Acceso a quizzes interactivos integrados
- ✅ Seguimiento de progreso automático

### 👨‍💼 Para Administradores
- ✅ Panel de administración completo
- ✅ CRUD de cursos y quizzes
- ✅ Gestión de contenido educativo
- ✅ Visualización de estudiantes registrados

## 🚀 Tecnologías

- **Frontend**: React 18, Tailwind CSS, Lucide React
- **Backend**: Supabase (PostgreSQL + Auth + API)
- **Hosting**: Vercel
- **Routing**: Custom React Router

## 📋 Requisitos Previos

- Node.js 16+ 
- Cuenta en [Supabase](https://supabase.com)
- Cuenta en [Vercel](https://vercel.com) (para despliegue)

## ⚙️ Configuración Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/kolegio-app.git
cd kolegio-app
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Supabase

#### a) Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Anota la URL y clave anónima

#### b) Ejecutar SQL de configuración
En el SQL Editor de Supabase, ejecuta:

```sql
-- Tabla de cursos
CREATE TABLE courses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  bg_gradient TEXT DEFAULT 'from-blue-400 to-blue-600',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de quizzes
CREATE TABLE quizzes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  difficulty TEXT DEFAULT 'Principiante',
  estimated_time TEXT DEFAULT '10 min',
  course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de estudiantes
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de acceso a cursos
CREATE TABLE student_course_access (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  course_id TEXT REFERENCES courses(id),
  accessed_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de intentos de quiz
CREATE TABLE student_quiz_attempts (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  quiz_id TEXT REFERENCES quizzes(id),
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  score INTEGER
);

-- Tabla de administradores
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insertar admin por defecto
INSERT INTO admins (username, password) VALUES ('admin', '123456');

-- Insertar cursos de ejemplo
INSERT INTO courses (id, name, description, bg_gradient) VALUES 
('math', 'Matemáticas', 'Álgebra, geometría y más', 'from-blue-400 to-blue-600'),
('science', 'Ciencias', 'Física, química y biología', 'from-green-400 to-green-600'),
('history', 'Historia', 'Eventos históricos mundiales', 'from-amber-400 to-amber-600'),
('english', 'Inglés', 'Vocabulario y gramática', 'from-purple-400 to-purple-600');

-- Insertar quiz de ejemplo
INSERT INTO quizzes (id, name, description, url, difficulty, estimated_time, course_id) VALUES 
('quiz-1', 'Álgebra Básica Quiz', 'Practica ecuaciones lineales', 'https://trivia-vault-creator.vercel.app/quiz/74888aee-e115-4bfc-bd4e-b375fcb1f105', 'Principiante', '10 min', 'math');
```

#### c) Configurar políticas RLS
```sql
-- Habilitar RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_course_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Crear políticas (desarrollo - acceso público)
CREATE POLICY "Allow public access" ON courses FOR ALL USING (true);
CREATE POLICY "Allow public access" ON quizzes FOR ALL USING (true);
CREATE POLICY "Allow public access" ON students FOR ALL USING (true);
CREATE POLICY "Allow public access" ON student_course_access FOR ALL USING (true);
CREATE POLICY "Allow public access" ON student_quiz_attempts FOR ALL USING (true);
CREATE POLICY "Allow public access" ON admins FOR ALL USING (true);
```

### 4. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar .env.local con tus credenciales reales
REACT_APP_SUPABASE_URL=https://tu-proyecto-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

### 5. Ejecutar en desarrollo
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🌐 Despliegue en Vercel

### 1. Conectar repositorio
1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Conecta tu repositorio

### 2. Configurar variables de entorno en Vercel
En la configuración del proyecto:
- `REACT_APP_SUPABASE_URL` = tu URL de Supabase
- `REACT_APP_SUPABASE_ANON_KEY` = tu clave anónima

### 3. Deploy automático
Vercel desplegará automáticamente en cada push a main.

## 📱 Uso de la Aplicación

### Estudiantes
1. **Acceso**: Ingresa tu nombre en la pantalla principal
2. **Cursos**: Explora los cursos disponibles
3. **Quizzes**: Haz clic en un curso para ver sus quizzes
4. **Jugar**: Los quizzes se abren en iframe integrado

### Administradores
1. **Acceso**: Ve a `/admin`
2. **Login**: usuario `admin`, contraseña `123456`
3. **Gestión**: 
   - Pestaña "Cursos": Crear/editar/eliminar cursos
   - Pestaña "Quizzes": Gestionar quizzes por curso
   - Pestaña "Estudiantes": Ver usuarios registrados

## 🎨 Personalización

### Colores de cursos disponibles:
- `from-blue-400 to-blue-600` - Azul
- `from-green-400 to-green-600` - Verde  
- `from-purple-400 to-purple-600` - Morado
- `from-red-400 to-red-600` - Rojo
- `from-yellow-400 to-yellow-600` - Amarillo

### Agregar nuevos gradientes:
Edita el selector en `AdminCoursesSection` del archivo `App.js`

## 🛡️ Seguridad

⚠️ **Importante**: La configuración actual usa políticas RLS abiertas para desarrollo. Para producción:

1. Implementa autenticación real de Supabase
2. Configura políticas RLS restrictivas
3. Usa variables de entorno seguras
4. Hashea contraseñas de administradores

## 🐛 Solución de Problemas

### "Failed to fetch"
- Verifica que las variables de entorno estén configuradas
- Confirma que las políticas RLS permitan acceso
- Revisa la consola del navegador para errores específicos

### "Configuración requerida"
- Asegúrate de que `.env.local` existe y tiene las variables correctas
- Reinicia el servidor de desarrollo después de cambiar `.env.local`

### Quizzes no cargan
- Verifica que la URL del quiz sea válida
- Confirma que el curso_id en la tabla quizzes coincida con el id del curso

## 📄 Licencia

© 2025 Kolegio. Todos los derechos reservados.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📞 Soporte

¿Necesitas ayuda? Abre un issue en el repositorio.

---

**Hecho con ❤️ para la educación**
