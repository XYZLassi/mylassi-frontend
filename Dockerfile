# Stage 1
FROM node:16-alpine as build-step

RUN mkdir -p /app

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

RUN npm run build

# Stage 2

FROM nginx:alpine as production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/dist/mylassixyz-frontend /usr/share/nginx/html

