drop table if exists submitted;

create table submitted(
	id serial,
	bbq varchar(255),
	type_b int not null default 1,
	title varchar(255),
	cid int not null default 0,
	team text default 'none',
    cname text default 'none',
    uname text default 'none',
	t_submit int not null,
	avatar varchar(255),
	url_i varchar(255),
	primary key(id)
);