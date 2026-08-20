FROM postgis/postgis:15-3.3

# This Dockerfile inherits from the official PostGIS image.
# You can add custom initialization scripts here if needed, for example:
COPY setup.sql /docker-entrypoint-initdb.d/01-setup.sql
COPY dummy_data.sql /docker-entrypoint-initdb.d/02-dummy_data.sql
