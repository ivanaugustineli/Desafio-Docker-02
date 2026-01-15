FROM node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Instala dockerize para aguardar o MySQL
ENV DOCKERIZE_VERSION = v0.6.1
RUN apk add --no-cache wget \
    && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3000

# Aguarda MySQL na porta 3306 antes de iniciar
CMD ["dockerize", "-wait", "tcp://db:3306", "-timeout", "30s", "node", "index.js"]
