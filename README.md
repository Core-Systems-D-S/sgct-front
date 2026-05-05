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

## 🚀 Ejecución en local

Para correr el proyecto completo necesitas dos terminales abiertas en paralelo: una para el backend y otra para el frontend.

### 🔙 Terminal 1 — Backend

> Requisito: tener el repositorio del backend clonado y el entorno virtual activado.

```bash
python manage.py runserver
```

El backend queda disponible en `http://localhost:8000`.

---

### 🎨 Terminal 2 — Frontend

> Primera vez: instalar dependencias.

```bash
npm install
npm run dev
```

> Las veces siguientes (ya con `node_modules` instalado):

```bash
npm run dev
```

El frontend queda disponible en `http://localhost:5173`.

---

## ⚙️ Variables de entorno

El archivo `.env.local` está en `.gitignore` y no se sube al repositorio. Copia el archivo de ejemplo para crearlo:

```bash
cp .env.local.example .env.local
```

Contenido por defecto (no requiere cambios si el backend corre en el puerto estándar):

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza el build de producción |

---

## 🔌 Integración API

Base URL configurada en `src/services/axiosInstance.ts` mediante la variable de entorno `VITE_API_BASE_URL`.

Endpoints utilizados por el frontend:

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/v1/users/` | Registro de usuario |
| `POST` | `/api/token/` | Login — obtención de JWT |

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
