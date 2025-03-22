FROM oven/bun:alpine as base

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile --ignore-scripts


FROM installer as prisma
WORKDIR /app
RUN bun add -D zod-prisma-types
RUN bun prisma:generate

FROM installer as build
COPY --from=prisma ./app/lib ./node_modules/.prisma
RUN bun run build


FROM base as runner 
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY --from=installer ./app/tsconfig.json/ ./tsconfig.json
COPY --from=installer ./app/node_modules/ ./node_modules
COPY --from=prisma ./app/node_modules/.prisma ./node_modules/.prisma
COPY --from=prisma ./app/lib/ ./lib
COPY --from=build ./app/dist/ ./dist


EXPOSE 3000
CMD [ "bun","./dist/index.js" ]