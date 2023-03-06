FROM node:18 AS builder

WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=web --docker
RUN turbo prune --scope=server --docker

FROM node:18 AS installer
RUN npm i -g pnpm
WORKDIR /app

COPY --from=builder /app/out/json .
COPY --from=builder /app/out/pnpm-lock.yaml .
RUN pnpm install

COPY --from=builder /app/out/full .
RUN pnpm turbo run build --filter=web
RUN pnpm turbo run build --filter=server

FROM node:alpine AS runner
WORKDIR /app

RUN npm i -g pnpm

COPY --from=installer  /app/apps/server/package.json .
COPY --from=installer  /app/apps/server/node_modules ./node_modules
COPY --from=installer  /app/apps/server/dist .
COPY --from=installer  /app/apps/web/out ./client

RUN pnpm i -P

EXPOSE 8080
CMD node main.js