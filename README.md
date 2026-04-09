# EduTrack — Gestión de Cursos Universitarios

Aplicación web full-stack para el registro, consulta, actualización y eliminación de cursos universitarios. Incluye Landing Page, autenticación JWT y CRUD completo.

---

## 🛠 Tecnologías

| Capa       | Tecnología                          |
|------------|--------------------------------------|
| Frontend   | React 19 + Vite + Material UI        |
| Backend    | Node.js + Express 5                  |
| Base datos | MongoDB Atlas (Mongoose)             |
| Auth       | JWT (jsonwebtoken + bcryptjs)        |
| Deploy FE  | Vercel                               |
| Deploy BE  | Render                               |

---

## 📁 Estructura del Proyecto

```
proyecto-cursos/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js      # Login y perfil
│   │   │   └── curso.controller.js     # CRUD cursos
│   │   ├── middleware/
│   │   │   └── auth.middleware.js      # Verificación JWT
│   │   ├── models/
│   │   │   ├── User.js                 # Modelo usuario
│   │   │   └── Curso.js               # Modelo curso
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── curso.routes.js
│   │   ├── validators/
│   │   │   └── curso.validator.js
│   │   ├── app.js                      # Express + CORS
│   │   ├── server.js                   # Entrada + MongoDB
│   │   └── seed.js                     # Crear usuario admin
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── features/
    │   │   ├── auth/
    │   │   │   ├── api/axios.js        # Cliente HTTP + interceptores
    │   │   │   ├── components/
    │   │   │   │   ├── LoginPage.jsx   # Formulario login
    │   │   │   │   ├── CursoForm.jsx   # Crear curso
    │   │   │   │   ├── CursoList.jsx   # Tabla de cursos
    │   │   │   │   └── CursoItem.jsx   # Fila editable
    │   │   │   ├── context/
    │   │   │   │   └── AuthContext.jsx # Estado global de sesión
    │   │   │   └── services/
    │   │   │       └── curso.service.js # Llamadas a la API
    │   │   └── layout/
    │   │       ├── Header.jsx          # Navbar fija
    │   │       ├── Footer.jsx
    │   │       └── LandingPage.jsx     # Página principal
    │   ├── dashboard/
    │   │   └── Dashboard.jsx           # Panel CRUD (ruta protegida)
    │   ├── shared/
    │   │   └── styles.css
    │   ├── AppRoutes.jsx               # Rutas + PrivateRoute
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── .env.example
    ├── .gitignore
    └── package.json
```

---

## ⚙️ Variables de Entorno

### Backend (`backend/.env`)
```env
PORT=4000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/cursos_db
JWT_SECRET=clave_secreta_muy_larga
JWT_EXPIRES_IN=8h
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=https://tu-backend.onrender.com/api
```

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/proyecto-cursos.git
cd proyecto-cursos
```

### 2. Configurar y correr el Backend
```bash
cd backend
cp .env.example .env
# Editar .env con tu MONGODB_URI y JWT_SECRET

npm install
npm run seed     # Crea usuario admin inicial
npm run dev      # Servidor en http://localhost:4000
```

### 3. Configurar y correr el Frontend
```bash
cd frontend
cp .env.example .env
# Editar .env con VITE_API_URL=http://localhost:4000/api

npm install
npm run dev      # App en http://localhost:5173
```

---

## 🌐 Despliegue

### Backend en Render
1. Conectar repositorio en [render.com](https://render.com)
2. Tipo: **Web Service** → Runtime: **Node**
3. Build command: `npm install`
4. Start command: `node src/server.js`
5. Agregar variables de entorno en el panel de Render

### Frontend en Vercel
1. Conectar repositorio en [vercel.com](https://vercel.com)
2. Framework: **Vite**
3. Root Directory: `frontend`
4. Agregar variable de entorno: `VITE_API_URL=https://tu-backend.onrender.com/api`

---

## 📡 Endpoints API

| Método | Endpoint            | Descripción              | Auth |
|--------|---------------------|--------------------------|------|
| POST   | /api/auth/login     | Iniciar sesión           | ❌   |
| GET    | /api/auth/me        | Perfil del usuario       | ✅   |
| GET    | /api/cursos         | Listar cursos            | ✅   |
| POST   | /api/cursos         | Crear curso              | ✅   |
| GET    | /api/cursos/:id     | Obtener curso por ID     | ✅   |
| PUT    | /api/cursos/:id     | Actualizar curso         | ✅   |
| DELETE | /api/cursos/:id     | Eliminar curso           | ✅   |

### Estructura del Curso (MongoDB)
```js
db.cursos.insertOne({
  nombre_curso: "Bases de Datos NoSQL",
  creditos: 4,
  docente_id: ObjectId("..."),   // Se asigna del JWT
  docente_nombre: "Admin",
  horarios: ["Lunes 8:00", "Miércoles 8:00"],
  descripcion: "Curso de MongoDB y Redis",
  activo: true
});
```

---

## 🔐 Credenciales Demo
```
Email:    admin@cursos.com
Password: Admin123!
```
*(Creadas con `npm run seed` en el backend)*

---

## 👤 Autor
Desarrollado como proyecto final — React + Node.js + MongoDB Atlas
