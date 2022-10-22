drop table if exists mezfes;

create table mezfes(
	id serial,
	discord_id varchar(255),
    Panic_Honey int not null,
    Guuku_Scoop int not null,
    Dokkan_Battle_Cats int not null,
    Nyanrendo int not null,
    Uruki_Pachinko int not null,
    total int not null,
	primary key(id),
    CONSTRAINT fk_discord
      FOREIGN KEY(discord_id) 
	  REFERENCES discord(discord_id)
);