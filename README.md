# 🎓 Javeriana Lead & Events Manager

SPA para la gestión de prospectos académicos y visualización de eventos/programas.  
Prueba técnica — Dirección de Mercadeo, Pontificia Universidad Javeriana.

---

## 🚀 Demo

👉 https://javeriana-lead-events-manager.vercel.app/

---

## ⚡ Ejecución local

```bash
git clone https://github.com/JuanCastrejon/JaverianaLeadAndEventsManager.git
cd JaverianaLeadAndEventsManager

npm install

cp .env.example .env
# Configurar credenciales de Supabase

npm run dev
```

App disponible en: http://localhost:5173/

---

## ✅ Cumplimiento de requerimientos

### 📊 Visualización de datos
- Consumo de API REST (Supabase/PostgREST)
- Renderizado en cards responsive
- Separación clara entre capa de datos (`services`) y UI (`components`)

### 🔎 Filtrado avanzado
- Búsqueda por nombre (case-insensitive + sin acentos)
- Filtro por categoría
- Implementación en cliente sin recarga (SPA)
- Optimización con memoización

### 🧾 Captura de leads
- Validación de email (incluye dominio `@javeriana.edu.co`)
- Validaciones adicionales (campos requeridos)
- Normalización:
  - trim de espacios
  - capitalización de texto
- Feedback inmediato al usuario

### 💾 Persistencia
- Uso de `localStorage` para persistencia tras recarga
- Sin dependencia de red para reflejar cambios en UI

### 📘 Documentación API visible
- Sección embebida de Swagger UI en la SPA (`#api-docs`)
- Carga del OpenAPI de Supabase REST con autenticación por `apikey`
- Fallback visual cuando faltan variables de entorno

---

## 🧰 Stack tecnológico

- **React 19 + TypeScript (strict)**
- **Vite 8**
- **Tailwind CSS 4**
- **Context API + useReducer**
- **Supabase (PostgreSQL + REST)**
- **Swagger UI React (documentación API embebida)**
- **Vitest + Testing Library**
- **Framer Motion (extra)**
- **Vercel (deploy)**

---

## 🏗️ Arquitectura

Estructura orientada a dominios:

```
src/
├── components/
├── context/
├── hooks/
├── services/
├── types/
├── utils/
```

### Flujo de datos

```
Service → Context → Hook → Component
```

Esto permite:
- Separación de responsabilidades
- Escalabilidad
- Reutilización de lógica

---

## 🧠 Decisiones técnicas

### Estado global con useReducer
Se utilizó `useReducer` para manejar:
- filtros combinados
- estados de carga/error
- lógica predecible y testeable

---

### Uso de TypeScript (strict)
- Tipado completo de entidades (`Program`, `Event`, `Lead`)
- Eliminación de `any`
- Manejo explícito de opcionales

---

### Optimización de performance
- Uso de `useMemo` para filtros
- `useCallback` en handlers
- Prevención de re-renders innecesarios

---

### Experiencia de usuario (UX)
- Feedback inmediato en formularios
- Búsqueda tolerante a acentos
- Animaciones para mejorar percepción de fluidez
- Diseño responsive (mobile-first)

---

### Decisión de estilos
Se eligió Tailwind CSS para:
- rapidez en desarrollo
- consistencia visual
- adaptación responsive sin overrides complejos

---

## 🧪 Testing (extra)

```bash
npm test
# solo la primera vez para E2E
npx playwright install chromium
npm run test:e2e
npm run test:e2e:smoke
```

Cobertura en:
- validaciones
- normalización
- lógica de búsqueda
- smoke E2E de navegación principal

---

## ✨ Funcionalidades adicionales (plus)

- 🌙 Dark mode
- 🎬 Animaciones con Framer Motion
- 🧪 Testing unitario
- 🔐 Seguridad básica en backend (RLS en Supabase)

---

## 🧭 Posibles mejoras futuras

- Paginación o virtualización de listas
- Accesibilidad (ARIA, navegación por teclado)
- Internacionalización (i18n)

---

## 📄 Nota final

El proyecto fue desarrollado priorizando:
- claridad en arquitectura
- experiencia de usuario
- escalabilidad del código

Cumpliendo todos los requerimientos obligatorios y agregando mejoras adicionales.
