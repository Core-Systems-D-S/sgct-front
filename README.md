# 📌 Sistema de Gestión Colaborativa de Tareas (SGCT) - Frontend

## 🧠 Descripción

SGCT Frontend es la interfaz web del Sistema de Gestión Colaborativa de Tareas. Permite a los usuarios registrarse, iniciar sesión e interactuar con los módulos de trabajo colaborativo mediante una experiencia clara, accesible y centrada en productividad.

La aplicación consume una API REST desacoplada (desarrollada con Django REST Framework), manteniendo independencia entre capa de presentación y lógica de negocio.

---

## 🎯 Objetivo

Proveer una experiencia de usuario moderna para la gestión de trabajo en equipo, incluyendo:

- Registro e inicio de sesión
- Navegación segura por rutas protegidas
- Consumo tipado de API REST
- Validaciones robustas de formularios
- Base escalable para módulos de grupos, tareas, categorías y colaboración

---

## 🏗️ Stack Tecnológico

### 🎨 Frontend

- React 18
- TypeScript
- Vite
- React Router v6
- React Hook Form
- Zod
- Axios
- Tailwind CSS v3

### 🔙 Backend (integración)

- Django
- Django REST Framework
- PostgreSQL

---

## 📦 Dependencias principales (Frontend)

```txt
@hookform/resolvers
axios
react
react-dom
react-hook-form
react-router-dom
zod
tailwindcss
typescript
vite
```

---

## ⚙️ Funcionalidades principales

- 🔐 Registro de usuario con validación de formulario
- 🔑 Inicio de sesión con JWT
- 💾 Persistencia de tokens en localStorage
- 🧭 Redirección automática post-registro a dashboard
- 🛡️ Protección de rutas por estado de autenticación
- 🎨 UI consistente para formularios (componentes reutilizables)
- ✅ Mapeo de errores de validación DRF hacia campos del formulario

---

## 🔐 Control de acceso

El frontend implementa control de navegación basado en autenticación:

- Si existe token de acceso válido, el usuario puede entrar a rutas privadas.
- Si no existe token, se redirige a rutas públicas de autenticación.

Tokens manejados:

- `sgct_access`
- `sgct_refresh`

---

## 🔄 Flujo principal de autenticación

### 1. Registro

El usuario completa el formulario de registro y se valida con Zod + React Hook Form.

### 2. Creación de usuario

El frontend llama al endpoint de registro de la API.

### 3. Login automático

Si el registro es exitoso, se ejecuta login inmediato con username y password.

### 4. Persistencia de sesión

Se guardan access y refresh tokens en localStorage y se actualiza el estado global de autenticación.

### 5. Redirección

El usuario se redirige a la ruta de dashboard.

---

## 🌐 Arquitectura del frontend

Estructura orientada a features y capas reutilizables:

- `src/features/`: páginas y lógica de dominio (auth, dashboard)
- `src/components/ui/`: componentes base reutilizables (Button, FormField, AuthCard)
- `src/services/`: cliente HTTP y servicios de API
- `src/context/`: estado global de autenticación
- `src/types/`: tipos compartidos TypeScript

---

## 🚀 Instalación y ejecución (Frontend)

```bash
# Clonar repositorio
git clone <URL_FRONTEND>
cd sgct-front

# Instalar dependencias
npm install

# Configurar variables de entorno
# Editar .env.local si necesitas cambiar la URL del backend

# Ejecutar aplicación en desarrollo
npm run dev
```

Scripts disponibles:

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run preview` - Previsualiza build de producción

---

## ⚙️ Variables de entorno

Archivo:

- `.env.local`

Variable requerida:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Esta URL debe apuntar al backend SGCT en ejecución.

---

## 🔌 Integración API

Base URL configurada mediante Axios instance:

- `VITE_API_BASE_URL`

Endpoints de autenticación utilizados por el frontend:

- `POST /api/v1/users/` - Registro
- `POST /api/token/` - Login JWT

---

## 🛡️ Seguridad

- Autenticación con JWT (access/refresh)
- Validación de formularios en cliente
- Manejo de errores de backend por campo
- Rutas protegidas por contexto de autenticación

Nota: la autorización y validación de permisos críticos se realiza en backend.

---

## 📊 Escalabilidad

El frontend está preparado para crecer con:

- Separación por features
- Componentes UI reutilizables
- Servicios desacoplados por dominio
- Tipado estricto con TypeScript
- Integración limpia con API REST versionada

---

## 🧠 Decisiones de diseño

- Arquitectura desacoplada frontend/backend para mantenibilidad
- Validación declarativa con Zod para consistencia
- React Hook Form para rendimiento en formularios complejos
- Tailwind CSS para velocidad de desarrollo y sistema visual consistente
- Context API para estado de autenticación global

---

## 👤 Autor

**Sebastian grisales Vanegas**

---

## 📌 Estado del proyecto

🚧 En desarrollo / Funcional (MVP)

---
