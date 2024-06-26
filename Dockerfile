FROM node:18.15.0-alpine3.17

WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run prebuild
RUN npm run build
EXPOSE 3000

ENTRYPOINT npm run start:prod
