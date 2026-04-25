# Javeriana Lead & Events Manager

Dashboard SPA para la gestión de prospectos académicos de la Pontificia Universidad Javeriana — Dirección de Mercadeo.

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Vite 6 + React 19 + TypeScript |
| Estilos | Tailwind CSS 4 |
| Estado | Context API + useReducer |
| Backend | Supabase (PostgreSQL + PostgREST) |
| Testing | Vitest + React Testing Library |
| Deploy | Vercel |

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React organizados por dominio
│   ├── ui/              # Primitivos reutilizables (Button, Input, Card)
│   ├── layout/          # Header, Footer, Layout
│   ├── programs/        # ProgramCard, ProgramGrid, ProgramFilters
│   └── leads/           # LeadForm, LeadList, LeadStats
├── context/             # Providers con useReducer
├── hooks/               # Custom hooks (usePrograms, useLeads, useTheme)
├── lib/                 # Cliente Supabase
├── services/            # Funciones de acceso a datos
├── types/               # Interfaces TypeScript
├── utils/               # Validación, normalización, constantes
└── __tests__/           # Tests unitarios
```

## ⚡ Inicio Rápido

```bash
# 1. Clonar el repositorio
git clone https://github.com/<user>/JaverianaLeadAndEventsManager.git
cd JaverianaLeadAndEventsManager

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# 4. Ejecutar en desarrollo
npm run dev
```

## 🧪 Testing

```bash
npm test              # Ejecutar tests
npm run test:watch    # Modo watch
npm run test:coverage # Con cobertura
```

## 🎨 Identidad Visual

- **Azul Javeriano**: `#003366`
- **Dorado**: `#C8A961`
- **Tipografía**: Open Sans (body) + Playfair Display (headings)
- **Dark Mode**: Soporte completo con ThemeContext

## 📊 Funcionalidades

- [x] Visualización de programas académicos desde API REST
- [x] Filtrado por nombre y categoría sin recarga
- [x] Formulario de leads con validación y normalización
- [x] Persistencia en localStorage
- [x] Dark mode con preferencia del sistema
- [x] Diseño responsive (mobile-first)

## 📄 Licencia

Prueba técnica — Dirección de Mercadeo, Pontificia Universidad Javeriana © 2026
