FROM node:24.13.0-alpine AS base

FROM base AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune my-games-screen --docker

FROM base AS runner
WORKDIR /app

RUN npm install -g turbo

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ ./
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci
COPY --from=builder /app/out/full/ ./
COPY turbo.json turbo.json