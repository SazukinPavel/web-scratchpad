FROM node:alpine

WORKDIR /app

COPY / /app

WORKDIR /app

RUN npm install --force -g @nestjs/cli yarn
RUN yarn

RUN yarn build

CMD [ "yarn", "start:prod" ]