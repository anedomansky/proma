FROM postgres:latest

LABEL maintainer="an89"

ENV POSTGRES_USER=dev
ENV POSTGRES_PASSWORD=dev123
ENV POSTGRES_DB=proma

COPY create_tables.sql docker-entrypoint-initdb.d/create_tables.sql

EXPOSE 5432

VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]
