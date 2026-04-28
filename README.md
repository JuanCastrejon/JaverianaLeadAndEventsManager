# Javeriana Lead & Events Manager

Aplicación de una sola página (SPA) desarrollada como solución para la prueba técnica de Desarrollador Frontend de la Pontificia Universidad Javeriana.

La plataforma permite visualizar programas académicos y eventos institucionales, aplicar filtros dinámicos y registrar nuevos leads mediante un formulario validado, persistiendo la información localmente.

---

## Demo

Producción desplegada en Vercel:

https://javeriana-lead-events-manager.vercel.app/

---

## Cumplimiento de requerimientos de la prueba técnica

| Requerimiento | Estado |
|---|---|
| Visualización de datos desde API REST | Cumplido |
| Listado en formato cards | Cumplido |
| Buscador por nombre sin recarga | Cumplido |
| Filtro por categoría sin recarga | Cumplido |
| Formulario de inscripción | Cumplido |
| Validación de email | Cumplido |
| Normalización de datos enviados | Cumplido |
| Persistencia en localStorage | Cumplido |
| Diseño responsive | Cumplido |
| React / TypeScript | Cumplido |
| Gestión de estado con Context API | Cumplido |

---

## Resumen funcional

La solución centraliza en una sola interfaz los procesos principales solicitados en la prueba:

- Consulta de programas académicos y eventos.
- Filtrado inmediato por texto y categoría.
- Registro de leads con validaciones.
- Persistencia local de datos tras recarga.
- Interfaz adaptable a escritorio, tablet y móvil.
- Documentación técnica integrada de la API consumida.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 19 |
| Lenguaje | TypeScript |
| Bundler | Vite |
| Estilos | Tailwind CSS |
| Estado global | Context API + useReducer |
| Backend / API | Supabase REST |
| Documentación API | Swagger UI React |
| Animaciones | Framer Motion |
| Testing unitario | Vitest |
| Testing E2E | Playwright |
| Deploy | Vercel |

---

## Arquitectura del proyecto

El proyecto fue estructurado por dominios funcionales para facilitar escalabilidad, mantenimiento y separación de responsabilidades.

```text
src/
├── components/
│   ├── events/
│   ├── programs/
│   ├── leads/
│   ├── layout/
│   └── sections/
├── context/
├── hooks/
├── services/
├── lib/
├── types/
├── utils/
└── test/