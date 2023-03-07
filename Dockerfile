FROM node:18.12.1-alpine3.16

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

CMD yarn start

