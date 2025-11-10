FROM node:24-alpine

ADD . /app
WORKDIR /app

ENV PREFIX=?

RUN npm ci
RUN npm run build
CMD ["npm", "run", "start"]
