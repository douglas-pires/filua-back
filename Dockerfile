FROM node:12.9

LABEL maintainer="Douglas Pires Vilela da Silva <douglas.pires@live.com>"

COPY package.json package.json

RUN npm install

RUN npm install -g nodemon
RUN npm install -g typescript

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "production" ] // start server inside container
