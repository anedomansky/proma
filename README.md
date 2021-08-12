# Proma

Project management app written in Angular, Node, Postgresql

TODO:

- start the frontend part

## docker-compose

use names of services directly in order to communicate:

DATABASE_URL=postgres://dev:dev123@localhost:5432/proma ====> DATABASE_URL=postgres://dev:dev123@db:5432/proma

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
WARNING: Image for service frontend was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
