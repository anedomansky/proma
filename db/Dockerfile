FROM postgres:latest

LABEL maintainer="an89"

# set up user and database
ENV POSTGRES_USER=dev
ENV POSTGRES_PASSWORD=dev123
ENV POSTGRES_DB=proma

# initialize tables
COPY create_tables.sql docker-entrypoint-initdb.d/create_tables.sql

EXPOSE 5432

# add persisted volumes for backup
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]
