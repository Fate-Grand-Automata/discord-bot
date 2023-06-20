FROM node:18-alpine

ADD . /app
WORKDIR /app

RUN npm install
CMD node deployCommands.js ; node index.js
