---
name: contexto-proyecto
description: 'Carga el contexto del proyecto Javeriana Lead & Events Manager. Usar cuando: se necesita entender la arquitectura, stack, dominio de negocio, convenciones o estado actual del proyecto.'
---

# Contexto del Proyecto — Javeriana Lead & Events Manager

Skill que proporciona el contexto completo del proyecto para cualquier tarea de desarrollo.

## Cuándo Usar

- Al iniciar una sesión de trabajo para cargar contexto
- Antes de implementar funcionalidades nuevas
- Para entender cómo se relacionan los componentes
- Al tomar decisiones técnicas que requieren contexto de negocio

## Procedimiento

1. Leer las instrucciones del proyecto en `.github/copilot-instructions.md`
2. Revisar la estructura de carpetas en `src/`
3. Consultar las instrucciones por capa en `.github/instructions/`
4. Si la tarea involucra diseño UI/UX, cargar la skill `ui-ux-diseno`
5. Si la tarea involucra operaciones CLI/deploy, cargar la skill `operacion-cli-devops`

## Resumen del Proyecto

### Qué es
Prueba técnica para Desarrollador Frontend en la Dirección de Mercadeo de la Pontificia Universidad Javeriana. SPA para visualizar oferta académica, eventos y gestionar registro de leads.

### Stack
- **Frontend**: Vite 8 + React 19 + TypeScript strict
- **Estilos**: Tailwind CSS 4 con design tokens Javeriana
- **Estado**: Context API + useReducer (4 contextos: Program, Event, Lead, Theme)
- **Backend/API**: Supabase (PostgreSQL + PostgREST)
- **Testing**: Vitest + React Testing Library + Playwright (E2E opcional)
- **Deploy**: Vercel (SPA)
- **CI**: GitHub Actions

### Arquitectura de Estado

| Context | Responsabilidad |
|---------|----------------|
| `ProgramContext` | Programas académicos, filtros, loading/error |
| `EventContext` | Eventos académicos/culturales desde Supabase |
| `LeadContext` | Leads registrados, localStorage sync, estadísticas |
| `ThemeContext` | Dark mode, preferencia del sistema |

### Flujo de Datos
```
React SPA → fetch REST → Supabase PostgREST → PostgreSQL
React SPA → localStorage → Leads (persistencia obligatoria)
React SPA → lazy-loaded sections → chunks separados por dominio
```

### Requerimientos Funcionales
1. Visualización de programas en cards desde API REST
2. Visualización de eventos institucionales desde API REST
3. Filtrado por nombre (debounce) + categoría sin recarga
4. Formulario de leads con validación email y normalización
5. Persistencia en localStorage

## Validación operativa por fases

- Fase 2 debe demostrar navegación SPA + filtros sin recarga + responsive en navegador local.
- Para Fase 2, la API remota debe evidenciar carga real de programas (no mock).
- Fase 3 añade el requisito visible de formulario operativo e integración local/remota de leads.

### Convenciones Clave
- **Idioma**: Código en inglés, documentación/commits en español
- **TypeScript**: strict, sin any, interfaces explícitas
- **Componentes**: funcionales con hooks
- **Estado**: Context + useReducer, discriminated unions para acciones
- **Commits**: Conventional Commits en español
