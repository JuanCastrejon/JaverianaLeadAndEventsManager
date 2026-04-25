---
name: documentacion-viva
description: 'Mantener sincronizada la documentación del proyecto Javeriana Lead & Events Manager. Usar cuando: se completa una funcionalidad, se toma una decisión técnica, se modifica la arquitectura, o se hace un release.'
---

# Documentación Viva — Mantenimiento y Sincronización

Skill que garantiza que la documentación y las skills del agente se mantengan actualizadas conforme avanza el proyecto.

## Cuándo Usar

- Al completar una funcionalidad o componente nuevo
- Al tomar una decisión técnica significativa
- Al modificar la arquitectura o estructura del proyecto
- Al preparar un release o entrega
- Cuando algo documentado ya no refleja la realidad del código

## Principio Fundamental

La documentación y las skills son **fuentes de contexto** que deben reflejar el estado real del proyecto.

## Procedimiento de Actualización

### 1. Identificar qué cambió

| Tipo de cambio | Documentos a actualizar |
|----------------|------------------------|
| Nuevo componente React | `README.md`, skill `contexto-proyecto` |
| Nuevo hook o servicio | `README.md`, skill `contexto-proyecto` |
| Cambio de convención | `copilot-instructions.md`, skill `contexto-proyecto` |
| Cambio de diseño visual | Skill `ui-ux-diseno` |
| Release/entrega | `README.md`, `CHANGELOG.md` |
| Cambio de stack/herramienta | `copilot-instructions.md`, skills relevantes |
| Nueva suite de tests | `README.md` |

### 2. Actualizar documentación fuente

- `README.md` — Documento principal visible para evaluadores
- `implementation_plan.md` — Plan de implementación (si cambian decisiones)

### 3. Sincronizar skills del agente

- `.github/copilot-instructions.md` — Si cambia stack o convenciones
- `.github/skills/contexto-proyecto/` — Si cambia arquitectura
- `.github/skills/ui-ux-diseno/` — Si cambian patrones visuales

### 4. Commit

Incluir los cambios de documentación en el mismo commit o en un commit `docs(...)`.

## Checklist de Sincronización

Al finalizar cualquier trabajo significativo:

- [ ] ¿El `README.md` refleja el estado actual?
- [ ] ¿El `copilot-instructions.md` sigue siendo preciso?
- [ ] ¿Las skills del agente están sincronizadas?
- [ ] ¿Se necesita actualizar el CHANGELOG?

## Archivos que gestiona esta skill

| Archivo | Cuándo actualizar |
|---------|-------------------|
| `README.md` | Cada funcionalidad completada o release |
| `.github/copilot-instructions.md` | Cambios fundamentales de stack |
| `.github/skills/contexto-proyecto/` | Cambios de arquitectura |
| `.github/skills/ui-ux-diseno/` | Cambios de patrones visuales |
| `CHANGELOG.md` | Cada hito de entrega |
