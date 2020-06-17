create table users (
user_id serial primary key,
username varchar(30),
password varchar(30),
email varchar(30)
);

create table trips (
id serial primary key,
trip_id integer,
user_id integer,
attraction_id integer, 
foreign key (user_id) references users(user_id),
foreign key (attraction_id) references attractions(attraction_id)
);

create table attractions (
attraction_id serial primary key,
name varchar(30),
location varchar(30)
);

create table ratings (
rating_id serial primary key,
attraction_id integer,
user_id integer,
rating integer,
comments varchar(500),
foreign key (user_id) references users(user_id),
foreign key (attraction_id) references attractions(attraction_id)
);name