drop table if exists discord_register;

create table discord_register(
	id serial,
	discord_id varchar(32) unique,
    user_id int,
    created_at timestamp without time zone default now(),
	primary key(id)
);