# Leopple Games

Leopple Games is an npm workspaces monorepo powered by Turborepo. It contains a NestJS backend, multiple frontend applications, and shared packages for styles, TypeScript, and ESLint configuration.

## Project Structure

```text
apps/
  backend/              NestJS API with TypeORM, PostgreSQL, Redis, and local S3
  login-screen/         Vue + Vite frontend
  games-list-screen/    React + Vite frontend
  my-games-screen/      SvelteKit + Vite frontend
  config-screen/        Angular frontend
  details-game-screen/  Solid + Vite frontend
packages/
  eslint/               Shared ESLint configurations
  styles/               Shared SCSS, themes, and bootstrap helpers
  typescript/           Shared TypeScript configurations
```

## Required Tools

- Node.js `24.13.0` from `.nvmrc`
- npm `11.6.2` from `packageManager`
- Docker and Docker Compose for PostgreSQL, Redis, local S3, and containerized apps
- Git, with Husky hooks installed by `npm install`

If you use `nvm`, start with:

```sh
nvm use
npm install
```

## Local Setup

Install dependencies from the repository root:

```sh
npm install
```

Create the backend environment file:

```sh
cp apps/backend/.env.example apps/backend/.env
```

When the backend runs in Docker, use Docker service hosts such as `postgresql`, `redis`, and `http://s3ninja:9000`. When it runs directly on your machine, use `127.0.0.1` or `localhost` as indicated in `apps/backend/.env.example`.

Start the supporting services:

```sh
npm run docker:db
npm run docker:service
```

## Main Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Runs all workspace development tasks through Turbo. |
| `npm run build` | Builds every app and package that defines a build script. |
| `npm run lint` | Runs ESLint across the workspaces. |
| `npm run check-types` | Runs TypeScript validation across the workspaces. |
| `npm run test` | Runs tests for workspaces that define a test script. |
| `npm run format` | Formats `ts`, `tsx`, and `md` files with Prettier. |
| `npm run commit` | Opens the guided Commitizen commit flow. |

Run a single workspace with npm workspace targeting:

```sh
npm run dev -w backend
npm run dev -w login-screen
npm run test:unit -w login-screen
npm run test:e2e -w backend
```

## Docker Commands

| Command | Description |
| --- | --- |
| `npm run docker:dev:all` | Starts every app and service from `docker-compose.dev.yml`. |
| `npm run docker:dev` | Runs each workspace `docker:dev` script through Turbo. |
| `npm run docker:db` | Starts PostgreSQL and Redis. |
| `npm run docker:service` | Starts the local S3 service with S3 Ninja. |
| `npm run docker:dev:build` | Rebuilds the Docker images. |
| `npm run docker:dev:down` | Stops the development Docker stack. |

Default local ports:

- Backend API: `http://localhost:8081`
- Swagger: `http://localhost:8081/api`
- Login screen: `http://localhost:3000`
- Games list screen: `http://localhost:3001`
- My games screen: `http://localhost:3002`
- Config screen: `http://localhost:3003`
- Game details screen: `http://localhost:3004`
- PostgreSQL: `5432`
- Redis: `6379`
- S3 Ninja: `http://localhost:9444`

## Quality, Tests, and Commits

The project uses TypeScript, ESLint, Prettier, Husky, lint-staged, Commitlint, Commitizen, and Changesets. Before opening a pull request, run:

```sh
npm run lint
npm run check-types
npm run test
npm run build
```

Commits must follow Conventional Commits with a required scope:

```sh
feat(53): create route me
fix(761): adjust auth validation
```

For versioned package changes, create a changeset:

```sh
npm run changeset
```
