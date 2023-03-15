FROM node:14-alpine

# Installs latest Chromium (100) package.
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v13.5.0 works with Chromium 100.

# Add user so we don't need --no-sandbox.

# Run everything after as non-privileged user.



WORKDIR /

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]

