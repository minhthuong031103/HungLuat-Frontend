FROM node:18-alpine as builder

COPY package.json yarn.lock ./
COPY . .
WORKDIR /app
RUN yarn install
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /app

COPY . .

EXPOSE 3000
ENTRYPOINT ["npm", "start"]