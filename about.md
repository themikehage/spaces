# About - Spaces

Spaces es un espacio de trabajo en la nube para coordinar proyectos asistidos por agentes de IA. Cada proyecto reúne sesiones, archivos, agentes, equipos, configuración de modelos, herramientas MCP y un entorno de ejecución/preview.

## Arquitectura

El repositorio es un monorepo con workspaces de `pnpm`:

- **`apps/client`**: aplicación principal en React 19, Vite, TypeScript y Tailwind CSS v4. Incluye chat, proyectos, agentes, equipos, sesiones, delegaciones, workspace de archivos, preview, timeline, logs, plugins, skills y ajustes.
- **`apps/landing`**: landing de producto en React, Vite y Tailwind CSS v4.
- **`apps/server`**: servidor Bun + Hono. Expone API REST, autenticación, WebSocket y los servicios de ejecución del producto.
- **`packages/shared`**: contratos, esquemas Zod, tipos y utilidades compartidos entre aplicaciones.

## Capacidades principales

- Gestión de proyectos, sesiones, archivos y workspaces.
- Orquestación de agentes y equipos, incluidas delegaciones y aprobaciones humanas.
- Catálogo y configuración de proveedores y modelos de IA por usuario.
- Integración con skills, plugins y servidores MCP.
- Previsualización de proyectos, backups, logs y galería/factory.
- Comunicación en tiempo real mediante WebSocket en `/ws`.

## Backend

El punto de entrada está en `apps/server/src/index.ts`. Las rutas se agrupan bajo `/api`; entre ellas se incluyen autenticación, sesiones, archivos, modelos, proveedores, agentes, equipos, preview, backup, logs, MCP, ajustes, galería, factory y aprobaciones.

La configuración y las credenciales por usuario se almacenan localmente. Los secretos de proveedores se cifran antes de persistirse. El servidor también inicia la infraestructura de preview y realiza limpieza periódica de sesiones.

## Decisiones técnicas

- **Gestión de paquetes:** `pnpm` workspaces.
- **Runtime y API:** Bun y Hono.
- **Interfaz:** React 19, Vite y Tailwind CSS v4.
- **Contratos y validación:** TypeScript estricto y Zod.
- **Tiempo real:** WebSocket integrado en Bun/Hono.

## Comandos habituales

- `pnpm dev`: inicia cliente, landing y servidor en paralelo.
- `pnpm build`: compila todos los workspaces.
- `pnpm --filter client run dev`: inicia la aplicación principal.
- `pnpm --filter landing run dev`: inicia la landing.
- `pnpm --filter server run dev`: inicia el servidor en modo desarrollo.
