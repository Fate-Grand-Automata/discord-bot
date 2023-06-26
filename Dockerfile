FROM node:18-alpine

ADD . /app
WORKDIR /app

ENV PREFIX ?

RUN npm ci
RUN npm run build
CMD npm run start
