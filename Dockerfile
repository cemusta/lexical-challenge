FROM node:12-slim

WORKDIR /app
COPY ./src .
COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

ENV PORT=8080
EXPOSE ${PORT}
ENTRYPOINT [ "npm start" ]
