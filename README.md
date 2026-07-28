# React Compiler Examples

A Vite + React 19 + TypeScript playground for exploring the [React Compiler](https://react.dev/learn/react-compiler) across common real-world patterns: forms, data tables, server state, global state, charts, and shadcn/ui component composition.

The React Compiler is enabled via `babel-plugin-react-compiler` in [vite.config.ts](vite.config.ts) (through `@rolldown/plugin-babel` and `reactCompilerPreset()`), so every example in this repo is auto-memoized by the compiler rather than hand-tuned with `useMemo`/`useCallback`.

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

- `npm run build` — type-check with `tsc -b` and build with Vite (bundle analyzer report opens after build)
- `npm run lint` — run ESLint (includes `eslint-plugin-react-compiler` and `eslint-plugin-react-hooks`)
- `npm run format` / `npm run format:check` — Prettier
- `npm run preview` — preview the production build

## Examples

Each route under `/src/pages` demonstrates the compiler working alongside a different library/pattern:

| Route | Page | Demonstrates |
| --- | --- | --- |
| `/` | Dashboard | Landing page / navigation |
| `/react-hook-form` | React Hook Form | Multi-section insurance claim form with `react-hook-form` + `zod` validation |
| `/tanstack-query` | TanStack Query | Server-state fetching, including a "broken" vs. "fixed" comparison |
| `/tanstack-table` | TanStack Table | Data table with column filtering, faceted filters, and pagination |
| `/redux-toolkit` | Redux Toolkit | Global state with slices and nested component re-render behavior |
| `/zustand` | Zustand | Lightweight global state store and nested component re-render behavior |
| `/shadcn-ui` | shadcn/ui | A gallery of composed shadcn/ui blocks (dialogs, drawers, command palette, scheduler, file manager, etc.) |
| `/recharts` | Recharts | Various chart types (bar, line, area, pie) with a shared control panel |

## Project structure

```
src/
  components/       Shared UI primitives (shadcn/ui) and reusable widgets
  features/         Feature-scoped code (components, api, types) per example
  hooks/            Shared hooks (e.g. render-count tracking)
  layouts/          App shell (header, layout)
  pages/            Route-level page components
  routes/           React Router route definitions and path constants
  store/            Redux Toolkit store and slices
```

## Notes

- Dev/build performance impact of the React Compiler is expected to be more noticeable than in a template without it — this repo intentionally keeps it on to demonstrate compiler behavior, not to optimize build speed.
- `vite-bundle-analyzer` runs on `npm run build` to inspect bundle composition.
