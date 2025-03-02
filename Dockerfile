FROM node:22-alpine as base
RUN apk add --no-cache libc6-compat && apk update
WORKDIR /app
COPY . .
ARG APP
RUN echo "application ="${APP}
RUN npm i -g pnpm
RUN pnpx turbo prune ${APP}

FROM base as installer
RUN apk add --no-cache libc6-compat && apk update
WORKDIR /app
ARG APP
COPY --from=base ./app/out ./
COPY ./turbo.json turbo.json
RUN npm i -g pnpm
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    --mount=type=bind,source=.husky/install.mjs,target=.husky/install.mjs \
    pnpm install --ignore-scripts
RUN pnpx turbo run build:packages
RUN pnpx turbo run build  --filter=...${APP} && pnpm prune --prod


FROM  node:22-alpine  AS runner
RUN apk add --no-cache libc6-compat && apk update
RUN apk update
WORKDIR /app
ARG APP
RUN echo "application ="${APP}
COPY --from=installer /app/package.json ./package.json
COPY --from=installer /app/pnpm-lock.yaml ./pnpm-lock.yaml 
COPY --from=installer /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=installer /app/node_modules ./node_modules

#api
COPY --from=installer /app/apps/${APP}/node_modules ./apps/${APP}/node_modules
COPY --from=installer /app/apps/${APP}/dist ./apps/${APP}


# ENV PORT=3000
# EXPOSE 3000
# CMD [ "node", "./apps/${APP}/index.cjs"]
