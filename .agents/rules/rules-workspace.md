---
trigger: always_on
description: "Global context and rules for the Leopple Games monorepo"
---

# Leopple Games - Workspace Rules

This file acts as your "global context" for the AI assistant (similar to an `/init` or a system prompt for the repository). It is loaded automatically due to the `trigger: always_on` configuration, ensuring that architectural rules and monorepo guidelines are always respected.

## 1. Context and Technology Stack
- **Typing:** TypeScript (Strict mode). Avoid using `any` or unsafe typecasting (`as unknown as ...`).
- **Monorepo Manager:** Turborepo. Main commands run via `turbo` (e.g., `turbo run build`, `turbo run lint`).
- **Backend:** NestJS, utilizing DDD concepts, Clean Architecture, dependency injection, and Swagger decorators for DTOs.
- **Frontend / Styles:** Centralized global configurations (`packages/styles` etc.) for sharing among the applications in `apps/`.
- **Database/ORM:** TypeORM / Postgres (strict mapping of dates and supported types, avoiding 'Object' columns).

## 2. Monorepo Structure
- **`apps/`**: Contains the final applications and runnable services (e.g., `backend`, `frontend`, admin panels). Each app is autonomous but can consume `packages/`.
- **`packages/`**: Contains logic, configurations (TSConfig, ESLint, unified SCSS styles), and generic modules shared across the entire workspace. 

## 3. Architectural and Coding Principles
- **Bounded Contexts:** In the backend (NestJS), each module must have clear responsibilities, without mixing indirect domains.
- **Exception Handling:** When dealing with the service layer in NestJS or other critical business rules, use standard system exceptions (like `LeoppleError`) so that global exception filters correctly capture and format HTTP messages.

## 4. Linting and Pre-commit (Husky and lint-staged)
- The monorepo uses `husky` + `lint-staged`. Commands executed in hooks should not pass files individually if the `turbo` script does not support it; you must ensure that commands run at the workspace/project level if the packages require it.

**(Note for AI):** Whenever proposing a structural change, consider the impact across multiple packages. If you do not know the version of a framework or library, **ask before assuming.**