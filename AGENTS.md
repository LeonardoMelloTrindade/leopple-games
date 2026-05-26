# Repository Guidelines

## Version Node in project

`nvm use 24.13.0`

## Project Structure & Module Organization

This is an npm/Turborepo monorepo. Application code lives in `apps/*`: `backend` is a NestJS API, while `games-list-screen`, `details-game-screen`, `login-screen`, `my-games-screen`, and `config-screen` are frontend apps using React, Vue, SvelteKit, and Angular. Shared packages live in `packages/*`: `styles` contains SCSS/bootstrap helpers, `typescript` contains TS configs, and `eslint` contains framework-specific ESLint configs. Backend migrations are in `apps/backend/database/migrations`; backend tests are split between `apps/backend/src/**/*.spec.ts` and `apps/backend/test`.

## Build, Test, and Development Commands

- `npm install`: install workspace dependencies using the locked npm version.
- `npm run dev`: run all workspace `dev` tasks through Turbo.
- `npm run build`: build all apps/packages that define `build`.
- `npm run lint`: run workspace ESLint tasks; app configs currently apply fixes.
- `npm run check-types`: run TypeScript checks across workspaces.
- `npm run test`: run workspace tests where defined.
- `npm run docker:dev:all`: start the full local Docker stack from `docker-compose.dev.yml`.
- `npm run docker:db`: start PostgreSQL and Redis only.

For a single workspace, use npm workspace targeting, for example `npm run dev -w backend` or `npm run test:unit -w login-screen`.

## Coding Style & Naming Conventions

Use TypeScript for application code. Follow local framework conventions: Nest modules/controllers/services in `backend`, React components as `.tsx`, Vue single-file components as `.vue`, Svelte routes under `src/routes`, and Angular files under `src/app`. Keep formatting consistent with Prettier; run `npm run format` for `ts`, `tsx`, and `md` files. Shared lint rules are provided by `@leopple-games/eslint`.

## Testing Guidelines

Name unit tests `*.spec.ts` to match existing Angular, Svelte, and Nest tests. Backend Jest tests run with `npm run test -w backend`; coverage is available with `npm run test:cov -w backend`, and e2e tests with `npm run test:e2e -w backend`. Vue unit tests use Vitest via `npm run test:unit -w login-screen`. Add tests beside the code they cover unless an app uses a dedicated `test` directory.

## Commit & Pull Request Guidelines

Commits must follow Conventional Commits with a required scope, enforced by commitlint: `feat(53): create route me`, `chore(65): add debug nest backend`. Allowed types include `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`, and `release`. Use `npm run commit` for the guided Commitizen flow.

Pull requests should include a short summary, linked issue or task number, test results, and screenshots for UI changes. Mention migrations, Docker changes, or new environment variables explicitly.
