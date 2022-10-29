ALTER TABLE discord ADD COLUMN IF NOT EXISTS latest_bounty varchar(10); 
ALTER TABLE discord ADD COLUMN IF NOT EXISTS latest_bounty_time bigint NOT NULL default 0;