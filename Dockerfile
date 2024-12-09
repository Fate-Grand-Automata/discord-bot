FROM node:22-alpine

ADD . /app
WORKDIR /app

ENV PREFIX ?

RUN npm ci
RUN npm run build
CMD npm run start
