# Proma (Backend)

## Build image

docker build -t proma-backend .

## See all images

docker images

## Start container

docker run -d -p 4001:4001 --name proma-backend proma-backend

docker run -d --rm -p 4001:4001 --name proma-backend proma-backend

## See all running containers

docker ps

## Show logs

docker logs proma-backend

## Connect to container

docker exec -it proma-backend bash
