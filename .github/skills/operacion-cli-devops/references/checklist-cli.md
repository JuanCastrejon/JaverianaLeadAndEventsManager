# Checklist Operativo CLI

## Antes de abrir PR

- [ ] Rama correcta (`feature/*`, `fix/*`, `docs/*`)
- [ ] Rama nombrada por accion (no por fase), por ejemplo: `feature/supabase-productivo`
- [ ] `git status` limpio de archivos no intencionales
- [ ] Pruebas minimas del alcance ejecutadas
- [ ] Sin secretos ni archivos locales en staging

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
