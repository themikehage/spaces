# About - Scaffold Project

This is a modern monorepo scaffold designed to serve as a starting point for building scalable fullstack applications.

## Architecture

The project is structured as a monorepo using `pnpm` workspaces:

- **`apps/client`**: Main user application built using React 19, Vite, TypeScript, and TailwindCSS v4.
- **`apps/landing`**: Landing/marketing page built using React 19, Vite, TypeScript, and TailwindCSS v4.
- **`apps/server`**: Hono API backend powered by Bun, utilizing TypeScript and Zod for validation.
- **`packages/shared`**: Shared TypeScript module containing common Zod schemas, helper functions, and types used by both client and server applications.

## Technical Choices

- **Package Manager**: `pnpm` for efficient, cached workspace package dependency management.
- **Runtime**: `Bun` on the server for ultra-fast startup and execution.
- **Styling**: `TailwindCSS v4` utilizing CSS-first configuration and dynamic design properties.
- **Validation**: `Zod` to maintain single-source-of-truth types and validation schemas.
