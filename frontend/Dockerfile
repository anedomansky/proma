# build environment
FROM node:lts-alpine as build

LABEL maintainer="an89"

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm build

# production environment
FROM nginx:stable-alpine

LABEL maintainer="an89"

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]
