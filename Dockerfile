FROM douglaspires/filua-back:latest

LABEL maintainer="Douglas Pires Vilela da Silva <douglas.pires@live.com>"

WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm install -g nodemon

CMD [ "npm", "start" ] // start server inside container
