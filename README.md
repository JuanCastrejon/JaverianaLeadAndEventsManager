# Javeriana Lead & Events Manager

Dashboard de gestión de prospectos académicos y eventos para la Dirección de Mercadeo de la Pontificia Universidad Javeriana.

[![CI](https://github.com/JuanCastrejon/JaverianaLeadAndEventsManager/actions/workflows/ci.yml/badge.svg)](https://github.com/JuanCastrejon/JaverianaLeadAndEventsManager/actions)

![Vista desktop en dark mode](docs/preview.png)

---

## 🚀 Demo en producción

**[▶ javeriana-lead-events-manager.vercel.app](https://javeriana-lead-events-manage-git-2115b2-juancastrejons-projects.vercel.app/)**

---

## Stack técnico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | React | 19.2 |
| Lenguaje | TypeScript | 6.0 (strict) |
| Build | Vite | 8.0 |
| Estilos | Tailwind CSS | 4.2 |
| Animaciones | Framer Motion | 12.x |
| Backend | Supabase (PostgreSQL + REST) | 2.x |
| Testing | Vitest + Testing Library | 4.1 |
| Deploy | Vercel | — |
| CI | GitHub Actions | — |

---

## Ejecución local

```bash
# 1. Clonar
git clone https://github.com/JuanCastrejon/JaverianaLeadAndEventsManager.git
cd JaverianaLeadAndEventsManager

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# 4. Iniciar servidor de desarrollo
npm run dev
# → http://localhost:5173/
```

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (Vite HMR) |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | ESLint sobre `src/` |
| `npm test` | Tests unitarios (Vitest) |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:coverage` | Tests con reporte de cobertura |

---

## Arquitectura

```
src/
├── App.tsx                    # Orquestador de secciones SPA
├── main.tsx                   # Entry point con providers
├── components/                # UI pura, organizada por dominio
│   ├── events/                # EventCard, EventGrid
│   ├── layout/                # Header, Footer, SectionTitle
│   ├── leads/                 # LeadForm, LeadList, LeadStats
│   └── programs/              # ProgramCard, ProgramGrid, ProgramFilters
├── context/                   # Estado global con useReducer
│   ├── ProgramContext.tsx     # Programas + filtros
│   ├── EventContext.tsx       # Eventos desde Supabase
│   ├── LeadContext.tsx        # Leads con persistencia localStorage
│   └── ThemeContext.tsx       # Dark/Light mode
├── hooks/                     # Custom hooks por dominio
├── services/                  # Capa de acceso a datos (Supabase)
├── types/                     # Tipos TypeScript segregados
├── utils/                     # Validadores, normalizadores, constantes
├── lib/                       # Cliente Supabase con validación defensiva
└── test/                      # Setup de testing
```

### Flujo de datos

```
Service (Supabase/API) → Context (useReducer) → Hook → Component
```

Cada dominio (Programs, Events, Leads) sigue este patrón vertical:
1. **Service**: fetch/insert contra Supabase REST
2. **Context**: reducer con estado tipado + Provider
3. **Hook**: interfaz limpia con `useCallback`/`useMemo`
4. **Component**: UI pura que consume el hook

---

## Decisiones técnicas

### ¿Por qué Tailwind CSS 4 en lugar de Bootstrap 5?

Tailwind 4 con el plugin `@tailwindcss/vite` permite definir un **design system institucional** con tokens personalizados (`@theme`) que replican exactamente los colores Javeriana (`#003366`, `#C8A961`). Bootstrap impondría su propia identidad visual y requeriría overrides extensivos.

### ¿Por qué useReducer en lugar de useState?

Los contextos de Programs y Leads manejan lógica compleja (filtros combinados, estados de carga, errores). `useReducer` centraliza las transiciones de estado y facilita el testing del reducer puro.

### ¿Por qué persistencia dual (localStorage + Supabase)?

- **localStorage (P0)**: Respuesta inmediata. El lead aparece en la UI sin latencia de red.
- **Supabase (P1)**: Fire-and-forget. Si falla, no bloquea la UX. El dato local ya existe.

Esto cumple el requisito de "persistir en localStorage" y agrega valor con backend real.

### ¿Por qué Framer Motion?

Las animaciones elevan la percepción de calidad del producto. Se usa para:
- Stagger en grids de programas/eventos
- Transiciones de entrada/salida en filtrado
- Feedback táctil en botones (`whileTap`, `whileHover`)
- AnimatePresence para exit animations

### ¿Por qué búsqueda sin acentos (stripDiacritics)?

En español, los usuarios frecuentemente escriben sin tildes. La función `stripDiacritics` normaliza el texto con `NFD` + remoción de combining marks, permitiendo que "ingenieria" encuentre "Ingeniería".

### ¿Por qué el tema predeterminado es Light?

El branding institucional Javeriana (azul `#003366` + dorado) fue diseñado primariamente para fondos claros. El tema claro como default asegura que la primera impresión sea coherente con la identidad visual institucional.

---

## Seguridad (Supabase RLS)

| Tabla | Rol | Operación | Policy |
|-------|-----|-----------|--------|
| `leads` | `anon` | INSERT | Validación de campos obligatorios + formato email |
| `leads` | `authenticated` | SELECT | Acceso completo (futuro panel admin) |
| `leads` | `anon` | SELECT | ❌ Bloqueado (protección de PII) |
| `programs` | `anon` | SELECT | ✅ Lectura pública |
| `events` | `anon` | SELECT | ✅ Lectura pública |

La vista `leads_admin_view` usa `SECURITY INVOKER` (no `DEFINER`) para respetar las políticas RLS del usuario que consulta.

---

## Testing

```bash
npm test
```

**35 tests** cubriendo:
- `validators.test.ts` — Validación de email, teléfono y formulario completo
- `normalizers.test.ts` — Capitalización, trim, normalización de teléfono
- `search.test.ts` — Búsqueda sin acentos, filtrado por categoría, combinaciones

---

## CI/CD

### GitHub Actions (`ci.yml`)
Pipeline automático en cada push/PR a `develop` y `main`:
1. **Type-check**: `tsc --noEmit`
2. **Lint**: `eslint src/`
3. **Tests**: `vitest run`
4. **Build**: `vite build`

### Vercel
Deploy automático en cada push:
- `develop` → Preview deployment
- `main` → Production deployment

---

## Migraciones SQL

Las migraciones están en `supabase/migrations/` y se aplican con `supabase db push`:

| # | Archivo | Contenido |
|---|---------|-----------|
| 001 | `create_programs.sql` | Tabla de programas + seed |
| 002 | `create_leads.sql` | Tabla de leads + RLS + índices |
| 004 | `create_leads_admin_view.sql` | Vista anonimizada para admin |
| 005 | `apply_fase1_updates.sql` | Triggers + seed adicional |
| 007 | `create_events.sql` | Tabla de eventos + seed |
| 009 | `leads_select_policy.sql` | Policy SELECT authenticated |
| 011 | `security_fixes.sql` | Correcciones de seguridad RLS |

---

## Licencia

Proyecto académico — Pontificia Universidad Javeriana, 2026.
