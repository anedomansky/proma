FROM nikolaik/python-nodejs:python3.7-nodejs14-alpine

LABEL maintainer="an89"

WORKDIR /usr/src/app

COPY . .
RUN npm install

CMD ["npm", "start"]
EXPOSE 4001
