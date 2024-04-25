FROM node:18-alpine as builder

COPY package.json yarn.lock ./
COPY . .
WORKDIR /app
RUN yarn install
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENTRYPOINT ["npm", "start"]