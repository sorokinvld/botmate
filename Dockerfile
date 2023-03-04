FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=web --docker

FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN apk update
RUN npm i -g pnpm
WORKDIR /app

COPY --from=builder /app/out/json .
COPY --from=builder /app/out/pnpm-lock.yaml .
RUN pnpm install

COPY --from=builder /app/out/full .
RUN pnpm turbo run build --filter=web

FROM node:alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .
 
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
 
CMD node apps/web/server.js