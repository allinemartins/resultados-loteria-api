CREATE TABLE GAMES (
    GAME_ID SERIAL PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL,
    LAST_DRAW INTEGER NOT NULL,
    NEXT_DRAW INTEGER NOT NULL,
    DATE_LAST_DRAW DATE NOT NULL,
    DATE_NEXT_DRAW DATE NOT NULL,
    NUMBER_MIN INTEGER NOT NULL,
    NUMBER_MAX INTEGER NOT NULL,
    DATE_UPDATE DATE DEFAULT CURRENT_DATE NOT NULL
);

/

CREATE TABLE GAME_DRAW (
    GAME_DRAW_ID SERIAL PRIMARY KEY,
    GAME_ID INTEGER REFERENCES GAMES(GAME_ID) NOT NULL,
    DRAW INTEGER NOT NULL,
    DATE_DRAW DATE NOT NULL,
    SCORES TEXT NOT NULL,
    DATE_UPDATE DATE DEFAULT CURRENT_DATE NOT NULL
);

/

CREATE TABLE GAME_STATISTICAL (
    GAME_STATISTICAL_ID SERIAL PRIMARY KEY,
    GAME_ID INTEGER REFERENCES GAMES(GAME_ID) NOT NULL,    
    STATISTICAL TEXT NOT NULL,
    DATE_UPDATE DATE DEFAULT CURRENT_DATE NOT NULL
);

/

ALTER TABLE games
ALTER COLUMN date_update TYPE timestamp;

/

ALTER TABLE game_draw
ALTER COLUMN date_update TYPE timestamp;

/

ALTER TABLE game_statistical
ALTER COLUMN date_update TYPE timestamp;

/

SELECT column_name, data_type, character_maximum_length
FROM information_schema.columns
WHERE table_name = 'game_statistical';

/

CREATE OR REPLACE FUNCTION update_date_update_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_update = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
/

CREATE TRIGGER games_update_trigger
BEFORE UPDATE ON games
FOR EACH ROW
EXECUTE FUNCTION update_date_update_column();

/
CREATE TRIGGER game_draw_update_trigger
BEFORE UPDATE ON game_draw
FOR EACH ROW
EXECUTE FUNCTION update_date_update_column();
/

CREATE TRIGGER game_statistical_update_trigger
BEFORE UPDATE ON game_statistical
FOR EACH ROW
EXECUTE FUNCTION update_date_update_column();


/

SELECT tgname AS trigger_name,
       pg_get_triggerdef(oid) AS trigger_definition,
       tgrelid::regclass AS table_name
FROM pg_trigger
ORDER BY trigger_name;

