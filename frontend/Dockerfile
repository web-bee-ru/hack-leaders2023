FROM node:18-alpine as builder

WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY ./tsconfig.json ./
COPY ./src ./src
RUN npm run generate-types

RUN npm run build


FROM node:18-alpine

WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY ./src ./src
COPY ./public ./public
COPY ./tsconfig.json ./
COPY ./next.config.js ./
COPY ./.prettierrc.js ./
COPY ./.eslintrc.js ./

CMD npm run dev
