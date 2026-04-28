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
```

### Flujo general

```text
Service -> Context -> Hook -> Component
```

Este enfoque desacopla la lógica de negocio de la capa visual y permite crecimiento ordenado del sistema.

---

## Funcionalidades implementadas

### Visualización de datos

* Consumo de endpoints REST para programas y eventos.
* Renderizado en tarjetas reutilizables.
* Estados de carga y manejo de errores.
* Diseño adaptable según resolución.

### Filtrado avanzado

* Búsqueda por nombre.
* Filtro por categoría.
* Actualización inmediata sin recarga.
* Normalización de texto para búsquedas más precisas.

### Captura de leads

* Formulario validado.
* Validación de estructura de correo electrónico.
* Preferencia por dominio institucional `@javeriana.edu.co`.
* Limpieza de espacios y capitalización antes del guardado.
* Confirmación visual al usuario.

### Persistencia

* Uso de `localStorage`.
* Recuperación automática al reiniciar la aplicación.

### API Docs

* Sección integrada con Swagger UI.
* Visualización de endpoints, parámetros y respuestas.
* Pruebas manuales de consumo desde la interfaz.

---

## Decisiones técnicas

### TypeScript

Se utilizó tipado estricto para reducir errores en tiempo de desarrollo, mejorar autocompletado y mantener contratos claros entre capas.

### Context API + useReducer

Se eligió una solución nativa de React para gestionar estado compartido sin agregar dependencias innecesarias.

### Tailwind CSS

Permitió construir una interfaz consistente, responsive y mantenible con velocidad de desarrollo alta.

### Arquitectura modular

La separación por dominios mejora legibilidad y facilita futuras extensiones.

### Supabase REST

Se utilizó como backend ligero para exponer datos reales mediante API REST, simplificando integración.

### Optimización de filtros

Se minimizaron cálculos innecesarios y se mantuvo una experiencia fluida durante búsquedas y cambios de categoría.

---

## Experiencia de usuario

* Navegación clara entre secciones.
* Responsive design mobile-first.
* Soporte de tema claro y oscuro.
* Animaciones sutiles orientadas a percepción de calidad.
* Jerarquía visual enfocada en legibilidad.

---

## Testing

La solución incorpora validaciones automatizadas para lógica crítica y flujos principales.

### Unit Testing

```bash
npm run test
```

### Cobertura

```bash
npm run test:coverage
```

### End to End

```bash
npm run test:e2e
```

### Smoke Test

```bash
npm run test:e2e:smoke
```

---

## Instalación local

### Requisitos previos

* Node.js
* npm

### Variables de entorno

Crear archivo `.env` basado en `.env.example`

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxx
VITE_SUPABASE_PUBLISHABLE_KEY=xxxxx
```

### Pasos

```bash
git clone https://github.com/JuanCastrejon/JaverianaLeadAndEventsManager.git
cd JaverianaLeadAndEventsManager
npm install
npm run dev
```

Aplicación disponible en:

```text
http://localhost:5173/
```

---

## Scripts disponibles

```bash
npm run dev
```

Servidor local.

```bash
npm run build
```

Build de producción.

```bash
npm run preview
```

Vista previa del build.

```bash
npm run lint
```

Análisis estático de código.

```bash
npm run test
```

Pruebas unitarias.

```bash
npm run test:e2e
```

Pruebas end-to-end.

---

## Valor agregado implementado

Además de los requisitos mínimos solicitados, el proyecto incorpora:

* Documentación API integrada.
* Testing automatizado.
* Tema oscuro.
* Animaciones UI.
* Arquitectura escalable.
* Código tipado y modular.
* Deploy productivo.
