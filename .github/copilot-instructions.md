# Instrucciones del Proyecto — Javeriana Lead & Events Manager

## Idioma

- **Documentación, comentarios, commits y comunicación**: Siempre en español
- **Identificadores de código** (clases, funciones, variables): En inglés
- **Nombres de tablas y columnas SQL**: snake_case en español

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Vite 6 + React 19 + TypeScript (modo estricto) |
| Estilos | Tailwind CSS 4 |
| Gestión de Estado | Context API + useReducer |
| Backend/API | Supabase (PostgreSQL + PostgREST automático) |
| Testing Unitario | Vitest + React Testing Library |
| Testing E2E | Playwright (opcional) |
| CI/CD | GitHub Actions |
| Deploy | Vercel |

## Estructura del Proyecto

```
src/
├── components/
│   ├── ui/          → Primitivos reutilizables (Button, Input, Card, Badge, etc.)
│   ├── layout/      → Header, Footer, Layout, SectionTitle
│   ├── programs/    → ProgramCard, ProgramGrid, ProgramFilters
│   └── leads/       → LeadForm, LeadList, LeadStats
├── context/         → ProgramContext, LeadContext, ThemeContext (useReducer)
├── hooks/           → usePrograms, useLeads, useLocalStorage, useDebounce, useTheme
├── lib/             → supabase.ts (cliente Supabase)
├── services/        → programService.ts, leadService.ts (fetch REST)
├── types/           → program.ts, lead.ts, database.ts, state.ts
├── utils/           → validators.ts, normalizers.ts, constants.ts
├── __tests__/       → Tests unitarios
├── App.tsx          → SPA con secciones (scroll-to)
├── main.tsx         → Entry point + Providers
└── index.css        → Tailwind + tema Javeriana
```

## Convenciones de Código

- **TypeScript**: strict, sin `any`, interfaces explícitas para todo
- **Componentes**: funcionales con hooks, nunca clases
- **Estado**: Context API + useReducer con acciones tipadas (discriminated unions)
- **Estilos**: Tailwind utility classes, design tokens en @theme
- **Commits**: Conventional Commits en español — `feat(programas): agregar filtro por categoría`
- **Ramas**: `feature/<nombre>`, `fix/<nombre>`, `docs/<nombre>`
- **Hooks**: prefijo `use`, retornan estado + handlers tipados
- **Services**: funciones async puras, nunca acceso directo a Supabase fuera de services/

## Patrones del Frontend

- Cada componente: un archivo `.tsx` con export nombrado
- Context Providers envuelven la app en `main.tsx`
- Custom hooks consumen los Context, nunca acceso directo al Context desde componentes
- Validación: funciones puras en `utils/validators.ts`, retornan `ValidationResult`
- Normalización: funciones puras en `utils/normalizers.ts`, se aplican antes del envío

## Diseño Visual — Identidad Javeriana

- **Colores institucionales**: Azul `#003366`, Dorado `#C8A961`, Dorado brillante `#FDB813`
- **Tipografía**: Open Sans (body) + Playfair Display (headings)
- **Patrones**: botones capsulares, cards con overlay, línea dorada bajo títulos
- **Dark mode**: ThemeContext + Tailwind `dark:` + persistencia localStorage

## Contexto de Negocio

Prueba técnica para la Dirección de Mercadeo de la Pontificia Universidad Javeriana:
- SPA que permite visualizar oferta académica (programas) y gestionar leads
- Consumo de API REST desde Supabase
- Filtrado avanzado sin recarga
- Formulario de leads con validación y normalización
- Persistencia en localStorage
