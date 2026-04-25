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

## Gate funcional en navegador (obligatorio)

Antes de considerar una fase como completada:

1. Validar flujo funcional en navegador local (`npm run dev`) sobre el alcance de la fase.
2. Validar API remota (Supabase REST) para las rutas/datos usados en la fase.
3. Validar preview remoto del frontend (PR/Preview en Vercel) cuando exista impacto visual o de integración.

Si falla cualquiera de los puntos anteriores, la fase queda en estado parcial y no debe pasarse a ready.

### Matriz mínima por fase

- Fase 1 (Supabase): API remota y políticas RLS verificadas; UI puede ser parcial.
- Fase 2 (Núcleo UI SPA): navegación SPA, filtros y responsive verificados en local; consumo de programas desde API remota verificado.
- Fase 3 (Leads): flujo end-to-end de formulario en local + persistencia localStorage + inserción remota en Supabase.
- Fases 4+ (plus/calidad/deploy): además de local, validar preview remoto antes de cierre.

## Flujo operativo recomendado

1. Desarrollar en rama `feature/*`, `fix/*` o `docs/*`.
2. Verificar cambios locales (`npx tsc --noEmit`, `npx vitest run`).
3. Ejecutar validación funcional en navegador según la fase (local + remoto si aplica).
4. Abrir PR draft para activar CI temprano.
5. Revisar checks/runs y corregir antes de pasar a ready.
6. Validar despliegue preview en Vercel (si aplica).
7. Merge por PR con historial limpio.

## Convención de nombres de rama (obligatoria)

- Nombrar ramas por acción/resultado técnico, no por número de fase.
- Formato: `feature/<accion-kebab-case>`, `fix/<accion-kebab-case>`, `docs/<accion-kebab-case>`.
- Evitar nombres como `feature/fase1-*`, `feature/fase2-*`, etc.

Ejemplos recomendados:
- `feature/supabase-productivo`
- `feature/programas-filtro-avanzado`
- `feature/leads-validacion-normalizacion`

Ejemplos no recomendados:
- `feature/fase1-supabase`
- `feature/fase2-ui`

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
