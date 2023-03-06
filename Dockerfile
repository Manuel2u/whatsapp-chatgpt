FROM node:18.12.1-alpine3.16

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

CMD yarn run dev

