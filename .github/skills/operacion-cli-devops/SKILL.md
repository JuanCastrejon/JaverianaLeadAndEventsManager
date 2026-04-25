---
name: operacion-cli-devops
description: 'Operación estándar con GitHub CLI, Vercel CLI y Supabase CLI, más gobernanza de skills externas (autoskills) para Javeriana Lead Manager. Usar cuando: se prepara un PR, se valida CI/checks, se despliega, o se incorporan nuevas skills externas.'
---

# Operación CLI DevOps y Gobernanza de Skills

Skill para asegurar trazabilidad operativa y adopción controlada de skills externas en el proyecto.

## Objetivo

- Mantener un flujo reproducible de PR/CI/deploy con CLI oficiales.
- Integrar skills externas sin romper convenciones internas ni arquitectura del proyecto.

## Regla de oro

No abrir PR final ni mergear a ramas de integración si existen checks fallidos en GitHub Actions.

## Flujo operativo recomendado

1. Desarrollar en rama `feature/*`, `fix/*` o `docs/*`.
2. Verificar cambios locales (`npx tsc --noEmit`, `npx vitest run`).
3. Abrir PR draft para activar CI temprano.
4. Revisar checks/runs y corregir antes de pasar a ready.
5. Validar despliegue preview en Vercel (si aplica).
6. Merge por PR con historial limpio.

## Comandos base GitHub CLI

- Estado de PRs: `gh pr status`
- Crear PR draft: `gh pr create --base main --head <rama> --title "feat(...): ..." --body-file <archivo.md> --draft`
- Pasar a ready: `gh pr ready <numero_pr>`
- Ver checks: `gh pr checks <numero_pr>`
- Ver runs recientes: `gh run list --limit 10`
- Ver log de fallo: `gh run view <run_id> --log-failed`
- Merge squash: `gh pr merge <numero_pr> --squash --delete-branch`

## Comandos base Supabase CLI

- Confirmar login: `supabase projects list`
- Enlazar proyecto: `supabase link --project-ref <project_ref>`
- Estado local: `supabase status`
- Crear migración: `supabase migration new <nombre>`
- Aplicar migraciones: `supabase db push`
- Generar tipos: `supabase gen types typescript --project-id <id> --schema public > src/types/database.ts`

## Comandos base Vercel CLI

- Confirmar login: `vercel whoami`
- Deploy preview: `vercel`
- Deploy producción: `vercel --prod`
- Variables de entorno: `vercel env ls`

## Gobernanza de skills externas (autoskills)

### Principio

Las skills internas del repo son fuente primaria para dominio y convenciones. Las skills externas son complemento técnico.

### Flujo de adopción

1. Simular detección: `npx -y autoskills --dry-run -a github-copilot`
2. Revisar cada skill candidata y su fuente.
3. Aprobar solo skills alineadas al stack (React, Vite, Tailwind, Supabase, Vitest, Vercel).
4. Instalar: `npx -y autoskills -y -a github-copilot`
5. Documentar decisión si impacta el flujo.

### Criterios de aceptación de una skill externa

- Aporta valor directo al stack usado.
- No contradice convenciones internas.
- No fuerza cambios de arquitectura fuera del plan.
- Puede auditarse y explicarse.
