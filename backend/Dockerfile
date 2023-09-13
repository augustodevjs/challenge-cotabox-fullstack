FROM node:18.12.1

WORKDIR /home/api

COPY package.json  .
COPY yarn.lock  .

RUN yarn install

COPY . .

CMD yarn run start:dev