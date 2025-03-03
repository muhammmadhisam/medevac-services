FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=auth --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/full .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN corepack enable
RUN pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm dlx turbo run build --filter=auth

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 honojs
RUN adduser --system --uid 1001 auth
USER auth

COPY --from=installer --chown=auth:honojs /app/package.json ./package.json
COPY --from=installer --chown=auth:honojs /app/pnpm-lock.yaml ./pnpm-lock.yaml 
COPY --from=installer --chown=auth:honojs /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=installer --chown=auth:honojs /app/node_modules ./node_modules

COPY --from=installer --chown=auth:honojs /app/packages/config/package.json ./packages/config/package.json
COPY --from=installer --chown=auth:honojs /app/packages/config/dist ./packages/config/dist
COPY --from=installer --chown=auth:honojs /app/packages/config/node_modules ./packages/config/node_modules

COPY --from=installer --chown=auth:honojs /app/packages/core/package.json ./packages/core/package.json
COPY --from=installer --chown=auth:honojs /app/packages/core/dist ./packages/core/dist
COPY --from=installer --chown=auth:honojs /app/packages/core/node_modules ./packages/core/node_modules

COPY --from=installer --chown=auth:honojs /app/packages/schema-auth/package.json ./packages/schema-auth/package.json
COPY --from=installer --chown=auth:honojs /app/packages/schema-auth/dist ./packages/schema-auth/dist
COPY --from=installer --chown=auth:honojs /app/packages/schema-auth/node_modules ./packages/schema-auth/node_modules

COPY --from=installer --chown=auth:honojs /app/packages/repository-auth/package.json ./packages/repository-auth/package.json
COPY --from=installer --chown=auth:honojs /app/packages/repository-auth/dist ./packages/repository-auth/dist
COPY --from=installer --chown=auth:honojs /app/packages/repository-auth/node_modules ./packages/repository-auth/node_modules
COPY --from=installer --chown=auth:honojs /app/packages/repository-auth/node_modules/prisma ./packages/repository-auth/node_modules/prisma
COPY --from=installer --chown=auth:honojs /app/packages/repository-auth/node_modules/@prisma ./packages/repository-auth/node_modules/@prisma


COPY --from=installer --chown=auth:honojs /app/apps/auth/package.json ./apps/auth/package.json
COPY --from=installer --chown=auth:honojs /app/apps/auth/node_modules ./apps/auth/node_modules
COPY --from=installer --chown=auth:honojs /app/apps/auth/dist ./apps/auth/dist

CMD node ./apps/auth/dist/index.cjs