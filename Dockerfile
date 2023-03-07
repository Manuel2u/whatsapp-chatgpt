FROM node:18.12.1-alpine3.16

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn add vite-node

CMD yarn run dev

