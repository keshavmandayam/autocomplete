FROM node:14-alpine

WORKDIR /app

COPY package.json /app/package.json

COPY package-lock.json /app/package-lock.json

RUN npm install

COPY ./ /app

EXPOSE 9000

CMD [ "node", "backend/bin/www" ]