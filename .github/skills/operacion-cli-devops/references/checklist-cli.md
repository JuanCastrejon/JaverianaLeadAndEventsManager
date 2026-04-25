# Checklist Operativo CLI

## Antes de abrir PR

- [ ] Rama correcta (`feature/*`, `fix/*`, `docs/*`)
- [ ] Rama nombrada por accion (no por fase), por ejemplo: `feature/supabase-productivo`
- [ ] `git status` limpio de archivos no intencionales
- [ ] Pruebas minimas del alcance ejecutadas
- [ ] Sin secretos ni archivos locales en staging

## Validacion funcional por fase (obligatoria)

- [ ] Fase actual validada en navegador local (`npm run dev`) contra su DoD visual/funcional
- [ ] API remota validada para el alcance de la fase (Supabase REST)
- [ ] Responsive validado en 375px, 768px y 1280px (si aplica a UI)
- [ ] Preview remoto validado en PR (si hay cambios de UI o integracion)

## PR Draft

- [ ] PR creado como draft
- [ ] Descripcion con archivo UTF-8 (`--body-file`)
- [ ] Checks iniciales en ejecucion

## Validacion CI

- [ ] `gh pr checks <numero_pr>` en verde
- [ ] Si falla, revisar `gh run view <run_id> --log-failed`
- [ ] Re-ejecutar validaciones tras correcciones

## Deploy (si aplica)

- [ ] Preview validado (`vercel`)
- [ ] Variables de entorno revisadas (`vercel env ls`)
- [ ] Produccion solo con checks en verde (`vercel --prod`)

## Supabase (si aplica)

- [ ] Proyecto enlazado (`supabase link --project-ref <ref>`)
- [ ] Estado esperado (`supabase status`)
- [ ] Migraciones aplicadas y verificadas (`supabase db push`)

## Skills externas (autoskills)

- [ ] Simulacion ejecutada (`--dry-run`)
- [ ] Skills candidatas revisadas una a una
- [ ] No contradicen reglas internas del repo
- [ ] Cambios documentados si impactan flujo del equipo
