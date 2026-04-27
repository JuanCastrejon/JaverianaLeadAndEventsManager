# Javeriana Lead & Events Manager

Aplicación de una sola página (SPA) para visualizar programas y eventos institucionales, y gestionar el registro de leads académicos de la Pontificia Universidad Javeriana.

Este proyecto fue desarrollado como respuesta a la prueba técnica de Frontend para la Dirección de Mercadeo.

## Demo

Aplicación desplegada en Vercel:

https://javeriana-lead-events-manager.vercel.app/

## Resumen

La solución implementa una experiencia centralizada para:

- consultar programas y eventos en formato de cards;
- buscar y filtrar sin recargar la página;
- registrar leads mediante un formulario con validaciones;
- persistir la información en `localStorage`;
- revisar la documentación de la API integrada en la misma interfaz.

## Alcance funcional

De acuerdo con el enunciado de la prueba técnica, esta implementación cubre los siguientes puntos:

- visualización de datos desde una API REST;
- buscador por nombre;
- filtro por categoría;
- formulario de inscripción con validaciones;
- validación de correo electrónico;
- normalización de los datos antes de mostrar el resultado;
- persistencia de leads en `localStorage`;
- diseño responsive;
- uso de una arquitectura escalable y tipada;
- documentación técnica accesible desde la aplicación.

## Stack tecnológico

- React
- TypeScript
- Vite
- Tailwind CSS
- Context API
- Hooks personalizados
- Supabase
- Swagger UI React
- Framer Motion
- Vitest
- Playwright

## Arquitectura del proyecto

La solución está organizada por responsabilidad funcional para facilitar mantenimiento, escalabilidad y lectura del código.

### Estructura principal

- `src/components`: componentes reutilizables y por dominio.
- `src/components/programs`: tarjetas, filtros y grillas de programas.
- `src/components/events`: tarjetas, filtros y grillas de eventos.
- `src/components/leads`: formulario, vista previa y estadísticas de leads.
- `src/components/sections`: secciones principales de la aplicación.
- `src/components/layout`: header, footer y contenedores generales.
- `src/context`: estado global por dominio.
- `src/hooks`: lógica reutilizable.
- `src/services`: consumo de datos y acceso a la API.
- `src/lib`: configuración de integraciones externas.
- `src/types`: tipos e interfaces del dominio.
- `src/utils`: validaciones, normalización, constantes y utilidades.

### Flujo general

```text
Service -> Context -> Hook -> Component
```

Este enfoque mantiene la lógica de negocio separada de la presentación y permite evolucionar la aplicación sin acoplar responsabilidades.

## Funcionalidades implementadas

### Visualización de programas y eventos

- consumo de API REST;
- listado de información en cards;
- estructura adaptable a escritorio y móvil;
- separación clara entre datos y UI.

### Filtrado avanzado

- búsqueda por nombre;
- filtro por categoría;
- normalización de texto para mejorar la experiencia de búsqueda;
- actualización inmediata de resultados sin recargar la página.

### Captura de leads

- formulario de inscripción con validaciones;
- validación de email con preferencia por dominio institucional;
- normalización de nombres y campos antes de confirmar el registro;
- retroalimentación visual clara para el usuario.

### Persistencia

- almacenamiento de leads en `localStorage`;
- recuperación automática tras recargar la aplicación.

### Documentación de API

- sección de API Docs integrada en la SPA;
- documentación visual con Swagger UI;
- configuración orientada a Supabase REST;
- manejo explícito cuando faltan variables de entorno.

### Experiencia de usuario

- interfaz responsive;
- soporte de tema claro y oscuro;
- animaciones suaves para mejorar la percepción visual;
- navegación consistente entre secciones.

## Diseño y decisiones técnicas

### TypeScript

Se utilizó TypeScript para definir tipos explícitos, reducir errores y mejorar la mantenibilidad del proyecto.

### Context API

Se eligió Context API para centralizar el estado de cada dominio y evitar prop drilling innecesario.

### Hooks personalizados

La lógica reutilizable se extrajo en hooks para mantener componentes más simples y legibles.

### Tailwind CSS

Tailwind CSS permitió construir una interfaz coherente, adaptable y rápida de mantener.

### Supabase REST

La aplicación consume datos desde Supabase REST como backend principal para programas, eventos y documentación asociada.

### Optimización de filtros

Se aplicaron utilidades de normalización y estrategias de renderizado para evitar trabajo innecesario durante la interacción del usuario.

## Requisitos técnicos y de ejecución

### Requisitos previos

- Node.js instalado
- npm instalado
- Variables de entorno configuradas

### Variables de entorno

El proyecto utiliza las variables definidas en `.env.example`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxx
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx
```

### Instalación local

```bash
git clone https://github.com/JuanCastrejon/JaverianaLeadAndEventsManager.git
cd JaverianaLeadAndEventsManager
npm install
```

Crea el archivo `.env` a partir de `.env.example` y completa los valores de tu proyecto de Supabase.

### Ejecución en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173/
```

## Scripts disponibles

```bash
npm run dev
```

Inicia el servidor de desarrollo.

```bash
npm run build
```

Compila el proyecto para producción.

```bash
npm run preview
```

Previsualiza el build generado.

```bash
npm run lint
```

Ejecuta ESLint sobre el proyecto.

```bash
npm run test
```

Ejecuta la suite de pruebas con Vitest.

```bash
npm run test:watch
```

Ejecuta Vitest en modo observación.

```bash
npm run test:coverage
```

Genera cobertura de pruebas.

```bash
npm run test:e2e
```

Ejecuta las pruebas end-to-end con Playwright.

```bash
npm run test:e2e:smoke
```

Ejecuta el smoke test principal de navegación.

## Pruebas incluidas

La solución incorpora pruebas unitarias y pruebas end-to-end para validar la lógica y los flujos principales de la aplicación.

Comandos recomendados:

```bash
npm run test
npm run test:e2e
npm run test:e2e:smoke
```

## Buenas prácticas incorporadas

- tipos definidos por dominio;
- componentes reutilizables;
- servicios desacoplados de la UI;
- validaciones explícitas;
- diseño responsive;
- documentación embebida;
- estructura clara por responsabilidad.

## Mejoras adicionales

Además de los requisitos base de la prueba, el proyecto incluye:

- modo oscuro;
- animaciones con Framer Motion;
- documentación API integrada;
- pruebas automatizadas;
- una presentación visual más pulida para demo técnica.

## Conclusión

Javeriana Lead & Events Manager fue desarrollado con foco en:

- claridad arquitectónica;
- calidad de código;
- experiencia de usuario;
- escalabilidad;
- cumplimiento de los requerimientos de la prueba técnica.

El resultado es una SPA lista para presentación técnica, con una base sólida para evolucionar hacia un producto real.
