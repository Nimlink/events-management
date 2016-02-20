-- SEQUENCE CREATION (global for all schemas)
DROP SEQUENCE IF EXISTS seq CASCADE;
CREATE SEQUENCE seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 10 NO CYCLE OWNED BY NONE;

DROP TABLE IF EXISTS t_usertypes CASCADE;
CREATE TABLE t_usertypes (
   id INTEGER NOT NULL DEFAULT nextval('seq'),
   code VARCHAR(3),
   type VARCHAR(50)
);
ALTER TABLE t_usertypes ADD CONSTRAINT pk_usertypes PRIMARY KEY (id);
CREATE UNIQUE INDEX uidx_usertypes ON t_usertypes(code);
INSERT INTO t_usertypes (code,type) VALUES ('PRO','Propriétaire');
INSERT INTO t_usertypes (code,type) VALUES ('ADM','Administrateur');
INSERT INTO t_usertypes (code,type) VALUES ('LOC','Locataire');


DROP TABLE IF EXISTS t_users CASCADE;
CREATE TABLE t_users (
   id INTEGER NOT NULL DEFAULT nextval('seq'),
   firstname VARCHAR(255),
   firstname_lower VARCHAR(255),
   lastname VARCHAR(255),
   lastname_lower VARCHAR(255),
   id_usertype INTEGER NOT NULL,
   inscription_date TIMESTAMP NOT NULL,
   nb_request INTEGER NOT NULL
);
ALTER TABLE t_users ADD CONSTRAINT pk_users PRIMARY KEY (id);
ALTER TABLE t_users ADD CONSTRAINT fk_users_usertype FOREIGN KEY (id_usertype) REFERENCES t_users(id);
CREATE UNIQUE INDEX uidx_users ON t_users(firstname_lower, lastname_lower, id_usertype);


DROP TABLE IF EXISTS t_towns CASCADE;
CREATE TABLE t_towns (
   id INTEGER NOT NULL DEFAULT nextval('seq'),
   postal_code VARCHAR(5),
   town VARCHAR(255)
);
ALTER TABLE t_towns ADD CONSTRAINT pk_towns PRIMARY KEY (id);
CREATE INDEX idx_towns ON t_towns(postal_code);


DROP TABLE IF EXISTS t_notes CASCADE;
CREATE TABLE t_notes (
   id INTEGER NOT NULL DEFAULT nextval('seq'),
   id_owner INTEGER NOT NULL,
   id_tenant INTEGER NOT NULL,
   id_town INTEGER NOT NULL,
   date_start TIMESTAMP NOT NULL,
   date_end TIMESTAMP NOT NULL,
   capacity INTEGER,
   attitude INTEGER,
   degradation INTEGER
);
ALTER TABLE t_notes ADD CONSTRAINT pk_notes PRIMARY KEY (id);
ALTER TABLE t_notes ADD CONSTRAINT fk_notes_owner FOREIGN KEY (id_owner) REFERENCES t_users(id);
ALTER TABLE t_notes ADD CONSTRAINT fk_notes_tenant FOREIGN KEY (id_tenant) REFERENCES t_users(id);
ALTER TABLE t_notes ADD CONSTRAINT fk_notes_town FOREIGN KEY (id_town) REFERENCES t_towns(id);
CREATE UNIQUE INDEX uidx_notes ON t_notes(id_owner, id_tenant, id_town, date_start, date_end);
CREATE INDEX idx_notes_owner ON t_notes(id_owner);
CREATE INDEX idx_notes_tenant ON t_notes(id_tenant);
