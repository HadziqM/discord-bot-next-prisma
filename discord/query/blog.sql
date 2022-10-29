drop table if exists blog;

create table blog(
	id serial,
	title varchar(255) not null,
	thumbnail_url varchar(255),
	discord_name varchar(255) not null,
	avatar_url varchar(255) not null,
	content text,
    created int not null,
    category varchar(255) not null,
	primary key(id)
);