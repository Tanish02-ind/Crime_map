-- setup.sql
-- Enables PostGIS and other common extensions for spatial data and UUIDs
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- (Optional) Create a specific schema if needed
-- CREATE SCHEMA IF NOT EXISTS crime_data;
