# 1. Install dependencies only when needed
FROM node:20-alpine AS deps

ENV NEXT_TELEMETRY_DISABLED 1
RUN apk update && \
    apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi


# 2. Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
ARG FRONTEND_ENVIRONMENT
ARG ASSET_HOST
ARG APP_VERSION
RUN yarn build

# 3. Production image, copy all the files and run next
FROM gcr.io/distroless/nodejs:18 AS runner
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./standalone

COPY --from=builder --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/.next/static ./.next/static

EXPOSE 8080
ENV PORT 8080
USER nonroot

CMD ["server.js", "-p", "8080"]
