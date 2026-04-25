---
description: workflow para detectar, instalar y gobernar skills externas con autoskills en JaverianaLeadManager
---
// turbo-all

# Autoskills - Workflow de Gobernanza

## Objetivo

Estandarizar la adopción de skills externas sin perder control de arquitectura, calidad y trazabilidad.

## Paso 1: Detectar (sin instalar)

```bash
npx -y autoskills --dry-run -a github-copilot
```

Resultado esperado:
- Lista de tecnologías detectadas (React, Vite, Tailwind, TypeScript, Vitest, Supabase)
- Lista de skills candidatas

## Paso 2: Revisar candidatas

- Validar que las skills candidatas se alineen al stack del proyecto.
- Solo aprobar skills que aporten al stack: React, Vite, Tailwind CSS, TypeScript, Vitest, Vercel, Supabase, Playwright.
- Rechazar skills de stacks no usados (NestJS, Next.js, Flutter, Angular, etc.).

## Paso 3: Instalar

```bash
npx -y autoskills -y -a github-copilot
```

Resultado esperado:
- Instalación completa sin errores
- Skills disponibles en `.agents/skills/`

## Paso 4: Verificar instalación

```bash
Get-ChildItem .agents/skills
```

## Paso 5: Documentar cambios

- Actualizar guías/skills internas cuando se ajuste la gobernanza.

## Regla operativa

No adoptar skills externas que contradigan:
- `.github/copilot-instructions.md`
- Convenciones del stack en `.github/instructions/`
