This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` (runs Vite dev server)
- **Build for production**: `pnpm build` (runs TypeScript compilation then Vite build)
- **Preview production build**: `pnpm preview`

## Project Architecture

This is a Vue 3 + TypeScript + Vite project with the following structure:

- **Entry point**: `src/main.ts` - Creates and mounts the Vue app
- **Root component**: `src/App.vue` - Main application component using `<script setup>` syntax
- **Components**: Located in `src/components/` directory
- **Build tool**: Vite with Vue plugin (`@vitejs/plugin-vue`)
- **TypeScript**: Uses multiple tsconfig files for different environments:
    - `tsconfig.json` - Base TypeScript configuration
    - `tsconfig.app.json` - Application-specific configuration
    - `tsconfig.node.json` - Node.js/build tool configuration

## Technology Stack

- **Vue 3**: Using Composition API with `<script setup>` syntax
- **TypeScript**: Full TypeScript support with strict type checking
- **Vite**: Build tool and development server
- **pnpm**: Package manager (indicated by lock files and directory structure)

## Development Notes

- This project uses Vue 3 Single File Components (SFCs) with TypeScript
- The template follows Vue 3 best practices using Composition API
- Vite handles module resolution and hot reloading during development
- TypeScript compilation is performed as part of the build process using `vue-tsc`% 