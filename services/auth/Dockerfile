FROM node:22-alpine as base
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm i -g pnpm

FROM base AS installer
WORKDIR /app
COPY . .
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --ignore-scripts

FROM installer as prisma
WORKDIR /app
COPY --from=installer ./app/node_modules ./node_modules
RUN pnpm add -D zod-prisma-types 
RUN pnpm prisma:generate

FROM prisma as build
COPY --from=prisma ./app/node_modules ./node_modules
RUN pnpm build

FROM base as runner 
WORKDIR /app
COPY --from=installer ./app/tsconfig.json/ ./tsconfig.json
COPY --from=installer ./app/node_modules/ ./node_modules
COPY --from=prisma ./app/node_modules/.pnpm ./node_modules/.pnpm
COPY --from=build ./app/dist/ ./dist

EXPOSE 3000
CMD [ "node", "./dist/index.js" ]
