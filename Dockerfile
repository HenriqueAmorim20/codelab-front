FROM node:20.11.1-alpine

RUN apk --update add --no-cache bash

RUN npm install -g npm@10.5.1

RUN npm install -g @angular/cli@17.3.2

USER node

WORKDIR /home/node/app

COPY . .
