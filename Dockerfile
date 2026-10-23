# ==========================================
# Multi-Stage Dockerfile for Astro SSR (Node Standalone)
# ==========================================

# Stage 1: Base Image
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Stage 2: Dependencies
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY astro-web/package.json ./astro-web/
RUN pnpm install --frozen-lockfile --filter astro-web...

# Stage 3: Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/astro-web/node_modules ./astro-web/node_modules
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY astro-web ./astro-web

# Build the Astro SSR standalone app
RUN pnpm --filter astro-web build

# Stage 4: Production Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# Copy build artifacts & runtime dependencies
COPY --from=builder /app/astro-web/dist ./dist
COPY --from=builder /app/astro-web/node_modules ./node_modules
COPY --from=builder /app/astro-web/package.json ./package.json

# Internal container port
EXPOSE 4321

# Start Astro standalone Node.js server
CMD ["node", "./dist/server/entry.mjs"]
