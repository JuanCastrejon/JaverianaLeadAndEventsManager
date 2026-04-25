---
name: ui-ux-diseno
description: "Guía de integración UI/UX para Javeriana Lead & Events Manager. Usar cuando: se diseña interfaz, se define sistema visual, se evalúa accesibilidad/usabilidad, o se adaptan skills externas de diseño al estándar del proyecto."
---

# UI/UX Diseño — Identidad Visual Javeriana

Skill para integrar y usar de forma controlada capacidades de diseño UI/UX en este proyecto.

## Objetivo

Implementar una interfaz que respete la identidad visual de la Pontificia Universidad Javeriana, con un diseño moderno tipo dashboard que se diferencie de soluciones genéricas.

## Cuándo Usar

- Diseño o rediseño de componentes en `src/components/`
- Definición de tokens, estilos y patrones visuales
- Revisión de accesibilidad, jerarquía visual y usabilidad
- Implementación de dark mode o animaciones

## Paleta de Colores Institucional

| Token | Color | Uso |
|-------|-------|-----|
| `--javeriana-blue` | `#003366` | Headers, botones primarios, footer, navbar |
| `--javeriana-blue-light` | `#0a4d8c` | Hover states, links |
| `--javeriana-blue-dark` | `#001f3f` | Gradientes, hero section |
| `--javeriana-gold` | `#C8A961` | Acentos, líneas decorativas, métricas |
| `--javeriana-gold-bright` | `#FDB813` | Iconos activos, highlights, dark mode accents |
| Surface | `#FFFFFF` / `#F8F9FA` | Contenido / secciones alternas |
| Footer | `#003366` | Fondo con texto/logo en blanco |

## Tipografía

- **Body**: `Open Sans` (400, 600, 700) — como javeriana.edu.co
- **Display**: `Playfair Display` (700) — headings con carácter
- **Decoración**: Línea gruesa corta en dorado bajo títulos de sección

## Patrones de Diseño

| Elemento | Implementación |
|----------|---------------|
| Botones | Capsular (border-radius alto), azul + texto blanco, hover dorado |
| Cards | Imagen con overlay azul semi-transparente, hover lift + sombra |
| Badges | Pills por categoría con colores diferenciados |
| Inputs | Bordes suaves, focus ring dorado `#C8A961` |
| Header | Sticky, fondo blanco, sombra sutil al scroll |
| Footer | Azul profundo `#003366`, logo blanco, redes sociales |
| Dark mode | Superficies `#0f1729`, texto claro, dorado brillante |

## Reglas de Integración

1. **No copiar flujos externos tal cual**: adaptar al stack React + Tailwind CSS.
2. **Consistencia visual**: respetar los design tokens definidos en `src/index.css`.
3. **Accesibilidad base**: contraste adecuado, estados interactivos claros, foco visible.
4. **Responsive**: Mobile-first (375px → 768px → 1280px).
5. **Animaciones**: Framer Motion para transiciones, nunca animaciones que bloqueen interacción.
