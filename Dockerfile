FROM node:12.9

LABEL maintainer="Douglas Pires Vilela da Silva <douglas.pires@live.com>"

COPY package.json package.json

RUN npm install

RUN npm install -g nodemon
RUN npm install -g typescript

COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/app.js" ] // start server inside container
