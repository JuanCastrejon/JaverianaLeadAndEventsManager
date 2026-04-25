---
description: how to run and manage E2E tests with Playwright
---
// turbo-all

# E2E Tests — Workflow

## Prerequisites
- Node.js instalado
- API corriendo en `localhost:3000` (`cd apps/api && npm run start:dev`)
- Web corriendo en `localhost:3001` (`cd apps/web && npm run dev`)
- Base de datos PostgreSQL con seeds ejecutados

## Ejecutar todos los tests E2E

1. Instalar Playwright browsers (solo la primera vez)
```bash
cd apps/web
npx playwright install
```

2. Ejecutar todos los tests
```bash
cd apps/web
npx playwright test
```

## Ejecutar tests por módulo

3. Ejecutar tests de un módulo específico
```bash
cd apps/web
npx playwright test tests/e2e/terceros/
```

## Ejecutar tests por rol

4. Ejecutar tests del rol admin
```bash
cd apps/web
npx playwright test tests/e2e/roles/admin.spec.ts
```

## Ver reporte HTML

5. Ver reporte visual de la última ejecución
```bash
cd apps/web
npx playwright show-report
```

## Crear un nuevo test

6. Crear un nuevo spec dentro de la carpeta del módulo correspondiente:
   - Módulos disponibles: `auth/`, `dashboard/`, `terceros/`, `productos/`, `inventario/`, `facturacion/`, `compras/`, `cuentas/`, `impuestos/`, `reportes/`, `configuracion/`, `navigation/`, `roles/`
   - Importar utilidades desde `../support/auth`, `../support/assertions`, `../support/navigation`, `../support/test-data`
   - Seguir patrón existente: `test.describe('Módulo — Funcionalidad', () => { ... })`

## Estructura de carpetas
```
apps/web/tests/e2e/
├── support/          ← Utilidades compartidas
├── auth/             ← Login
├── dashboard/        ← KPIs
├── terceros/         ← CRUD + tabs
├── productos/        ← CRUD + tabs
├── inventario/       ← Bodegas
├── facturacion/      ← Facturas
├── compras/          ← Órdenes
├── cuentas/          ← CxC/CxP
├── impuestos/        ← CRUD
├── reportes/         ← Catálogo
├── configuracion/    ← Catálogos
├── navigation/       ← Sidebar
└── roles/            ← Tests por rol
```

## Variables de entorno
Las credenciales se pueden configurar via env vars:
- `E2E_ADMIN_EMAIL` / `E2E_ADMIN_PASSWORD`
- `E2E_VENDEDOR_EMAIL` / `E2E_VENDEDOR_PASSWORD`
- `E2E_CONTADOR_EMAIL` / `E2E_CONTADOR_PASSWORD`
- `E2E_CAJERO_EMAIL` / `E2E_CAJERO_PASSWORD`
- `E2E_BASE_URL` (por defecto: `http://localhost:3001`)
