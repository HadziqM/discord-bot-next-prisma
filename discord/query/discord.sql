drop table if exists discord;

create table discord(
	id serial,
	char_id int not null,
	discord_id varchar(255) not null,
	is_male boolean default True,
	bounty int,
	primary key(id)
);