---
description: how to run and manage E2E tests with Playwright
---
// turbo-all

# E2E Tests — Workflow

## Prerequisites
- Node.js instalado
- Dependencias instaladas con `npm install`
- Variables de entorno configuradas (`.env`)
- Navegador Playwright instalado (solo primera vez)

## Ejecutar todos los tests E2E

1. Instalar Playwright browsers (solo la primera vez)
```bash
npx playwright install chromium
```

2. Ejecutar todos los tests
```bash
npm run test:e2e
```

## Ejecutar smoke test para CI

3. Ejecutar solo tests etiquetados como smoke
```bash
npm run test:e2e:smoke
```

## Ejecutar un archivo específico

4. Ejecutar una spec concreta
```bash
npx playwright test tests/e2e/navigation.spec.ts
```

## Ver reporte HTML

5. Ver reporte visual de la última ejecución
```bash
npx playwright show-report
```

## Crear un nuevo test

6. Crear un nuevo spec dentro de `tests/e2e/`:
   - Nombrar el archivo como `<feature>.spec.ts`
   - Usar locators accesibles (`getByRole`, `getByLabel`, `getByText`)
   - Marcar tests críticos con etiqueta `@smoke` para ejecución en CI

## Estructura de carpetas
```
tests/e2e/
└── navigation.spec.ts
```

## Variables de entorno
Variables relevantes para ejecución:
- `E2E_BASE_URL` (opcional): si se define, Playwright no levanta webServer local
- Sin `E2E_BASE_URL`: Playwright usa `http://127.0.0.1:4173` y levanta servidor automático
