FROM node

COPY package.json yarn.lock ./
COPY . .
WORKDIR /app
RUN yarn install
RUN npm run build


EXPOSE 3000
ENTRYPOINT ["npm", "start"]