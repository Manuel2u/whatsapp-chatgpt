FROM node:18.12.1-alpine3.16

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

RUN apk update && apk add --no-cache chromium
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"

COPY . .

RUN yarn add vite-node

CMD yarn run dev
