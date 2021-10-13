FROM node:14

COPY . /creditu-players-assessment-api

WORKDIR /creditu-players-assessment-api

EXPOSE 3000

CMD node dist/main