
create schema mmust_homes;
create type mmust_homes.user_roles as enum('finder','provider');
create table mmust_homes.users(
user_id int,
user_email varchar(255),
first_name varchar(100),
last_name varchar(100),
user_role mmust_homes.user_roles default 'finder'
);

create table mmust_homes.houses(
id serial,
user_id int,
house_name varchar(255),
house_location varchar(255)
);


-- 1. Grant usage on the schema itself
GRANT USAGE ON SCHEMA mmust_homes TO anon, authenticated, service_role;

-- 2. Grant permissions on all existing tables in the schema
GRANT ALL ON ALL TABLES IN SCHEMA mmust_homes TO anon, authenticated, service_role;

-- 3. Grant permissions on all existing sequences (for auto-increment IDs)
GRANT ALL ON ALL SEQUENCES IN SCHEMA mmust_homes TO anon, authenticated, service_role;

-- 4. (Optional but recommended) Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA mmust_homes
GRANT ALL ON TABLES TO anon, authenticated, service_role;
