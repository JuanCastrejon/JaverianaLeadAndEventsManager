# React + Vite — Convenciones del Frontend

## Stack

- Vite 6 + React 19 + TypeScript (modo estricto)
- Tailwind CSS 4
- Context API + useReducer
- Framer Motion (animaciones)

## Estructura de Componentes

- Un componente por archivo `.tsx`
- Export nombrado (no default): `export function ProgramCard() {}`
- Props tipadas con interface: `interface ProgramCardProps {}`
- Nunca usar `any` — tipar todo explícitamente

## Hooks

- Prefijo `use` obligatorio
- Cada hook en archivo separado en `src/hooks/`
- Retornan estado tipado + funciones handler
- Custom hooks consumen Context, componentes consumen hooks (nunca Context directo)

## Estado (Context API + useReducer)

- Acciones como discriminated unions: `type Action = { type: 'SET_X'; payload: T }`
- Reducer como función pura separada
- Provider en `main.tsx`
- Derivar estado filtrado con `useMemo`

## Servicios

- Funciones async puras en `src/services/`
- Acceso a Supabase solo vía `src/lib/supabase.ts`
- Manejo de errores con try/catch tipado
- Nunca importar supabase directamente desde componentes

## Estilos (Tailwind CSS 4)

- Usar utilidades de Tailwind, no CSS personalizado
- Design tokens en `@theme` dentro de `src/index.css`
- Dark mode con prefix `dark:`
- Responsive: mobile-first (`sm:`, `md:`, `lg:`)

## Performance

- `useMemo` para filtrado de listas
- `useCallback` para handlers pasados como props
- `useDebounce` para inputs de búsqueda (300ms)
- Evitar re-renders: no crear objetos/arrays inline en JSX

## Validación y Normalización

- Funciones puras en `src/utils/validators.ts`
- Retornan `ValidationResult` tipado
- Normalización en `src/utils/normalizers.ts` antes del envío
- Validación en tiempo real (onChange + onBlur)
