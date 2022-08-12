FROM node:latest

WORKDIR /src

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8001
CMD [ "node", "app.js" ]