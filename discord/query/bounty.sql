drop table if exists bounty;

create table bounty(
	id serial,
	title varchar(255) not null,
	explain varchar(255),
	solo_point int not null,
	multi_point int not null,
	solo_ticket int not null,
	multi_ticket int not null,
	cooldown int not null,
	primary key(id)
);