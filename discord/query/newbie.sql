ALTER TABLE discord ADD COLUMN IF NOT EXISTS newbie boolean NOT NULL default true;
ALTER TABLE discord ALTER COLUMN newbie SET DEFAULT true;
UPDATE discord SET newbie = true;