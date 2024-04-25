FROM node:18-alpine as builder

COPY package.json yarn.lock ./
COPY . .
WORKDIR /app
RUN yarn install
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /app

COPY --from=builder /package.json .
COPY --from=builder /yarn.lock .
COPY --from=builder /next.config.js ./
COPY --from=builder /public ./public
COPY --from=builder /.next/standalone ./
COPY --from=builder /.next/static ./.next/static

EXPOSE 3000
ENTRYPOINT ["npm", "start"]