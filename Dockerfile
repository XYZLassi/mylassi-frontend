# Stage 1
FROM ghcr.io/puppeteer/puppeteer:latest as puppeteer-step

USER pptruser
RUN mkdir -p /home/pptruser/app

WORKDIR /home/pptruser/app
COPY package.json /home/pptruser/app


COPY --chown=pptruser:pptruser . /home/pptruser/app
RUN ls -la /home/pptruser/app

RUN ./bin/create_favicons.sh

FROM node:alpine as build-step

RUN mkdir -p /app

WORKDIR /app
COPY --from=puppeteer-step /home/pptruser/app /app

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    imagemagick

RUN npm install

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
