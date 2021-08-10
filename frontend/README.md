# Proma (Frontend)

## Build image

docker build -t proma-frontend .

## See all images

docker images

## Start container

docker run -d -p 4000:4000 --name proma-frontend proma-frontend

docker run -d --rm -p 4000:4000 --name proma-frontend proma-frontend

## See all running containers

docker ps

## Show logs

docker logs proma-frontend

## Connect to container

docker exec -it proma-frontend bash
