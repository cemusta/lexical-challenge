FROM node:12-slim

WORKDIR /app
COPY ./src .
COPY ./package.json .
COPY ./package-lock.json .

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE ${PORT}

RUN npm ci --production

ENTRYPOINT [ "npm", "start" ]
