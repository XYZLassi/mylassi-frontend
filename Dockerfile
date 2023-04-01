# Stage 1
FROM node:slim as build-step

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt-get update && apt-get install imagemagick gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

RUN ./bin/create_favicons.sh
RUN ./bin/create_header_images.sh header.jpg
RUN npm run build:ssr

# Stage 2
FROM nginx:alpine as production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/dist/mylassi-frontend/browser /usr/share/nginx/html

FROM node:16-alpine AS ssr-server
COPY --from=build-step /app/dist /app/dist/
COPY ./package.json /app/package.json
WORKDIR /app
EXPOSE 4000
CMD npm run serve:ssr
