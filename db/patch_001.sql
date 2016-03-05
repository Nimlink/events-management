-- SEQUENCE CREATION (global for all schemas)
DROP SEQUENCE IF EXISTS seq CASCADE;
CREATE SEQUENCE seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 10 NO CYCLE OWNED BY NONE;

DROP TABLE IF EXISTS t_usertypes CASCADE;
CREATE TABLE t_usertypes (
   id INTEGER NOT NULL DEFAULT nextval('seq'),
   code VARCHAR(3) NOT NULL,
   type VARCHAR(50) NOT NULL
);
ALTER TABLE t_usertypes ADD CONSTRAINT pk_usertypes PRIMARY KEY (id);
CREATE UNIQUE INDEX uidx_usertypes ON t_usertypes(code);


DROP TABLE IF EXISTS t_users CASCADE;
CREATE TABLE t_users (
   id INTEGER NOT NULL DEFAULT nextval('seq'),
   hash VARCHAR(255) NOT NULL,
   mail VARCHAR(255),
   password VARCHAR(255),
   firstname VARCHAR(255) NOT NULL,
   firstname_lower VARCHAR(255) NOT NULL,
   lastname VARCHAR(255) NOT NULL,
   lastname_lower VARCHAR(255) NOT NULL,
   inscription_date TIMESTAMP,
   nb_request INTEGER NOT NULL DEFAULT 0,
   isMailActivated BOOLEAN NOT NULL DEFAULT false,
   mailActivationHash VARCHAR(255) NOT NULL,
   isActivated BOOLEAN NOT NULL DEFAULT false,
   attestationActivationHash VARCHAR(255) NOT NULL
);
ALTER TABLE t_users ADD CONSTRAINT pk_users PRIMARY KEY (id);
CREATE INDEX idx_users ON t_users(firstname_lower, lastname_lower);
CREATE UNIQUE INDEX uidx_users_mail ON t_users(mail);
CREATE UNIQUE INDEX uidx_users_hash ON t_users(hash);

DROP TABLE IF EXISTS t_users_usertypes CASCADE;
CREATE TABLE t_users_usertypes (
   id_user INTEGER NOT NULL,
   id_usertype INTEGER NOT NULL
);
ALTER TABLE t_users_usertypes ADD CONSTRAINT pk_users_usertypes PRIMARY KEY (id_user, id_usertype);
ALTER TABLE t_users_usertypes ADD CONSTRAINT fk_users_usertypes_users FOREIGN KEY (id_user) REFERENCES t_users(id);
ALTER TABLE t_users_usertypes ADD CONSTRAINT fk_users_usertypes_usertypes FOREIGN KEY (id_usertype) REFERENCES t_usertypes(id);

DROP TABLE IF EXISTS t_towns CASCADE;
CREATE TABLE t_towns (
   id INTEGER NOT NULL DEFAULT nextval('seq'),
   postal_code VARCHAR(5) NOT NULL,
   town VARCHAR(255) NOT NULL
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

INSERT INTO t_usertypes (code,type) VALUES ('PRO','Propriétaire');
INSERT INTO t_usertypes (code,type) VALUES ('ADM','Administrateur');
INSERT INTO t_usertypes (code,type) VALUES ('LOC','Locataire');

insert into t_users (hash, mail, password, firstname, firstname_lower, lastname, lastname_lower, inscription_date, nb_request) values ('sebastienthomass','sebastienthomass@gmail.com', 'password', 'Sébastien','sebastien','THOMAS', 'thomas', '01/01/2016', 0);
insert into t_users (hash, mail, password, firstname, firstname_lower, lastname, lastname_lower, inscription_date, nb_request, isActivated) values ('juliencapgras','juliencapgras@gmail.com', 'password', 'Julien','julien','CAPGRAS', 'capgras', '01/01/2016', 0, true);
insert into t_users (hash, mail, password, firstname, firstname_lower, lastname, lastname_lower, inscription_date, nb_request) values ('test','test@gmail.com', 'password', 'Test','test','TEST', 'test', '01/01/2016', 0);
insert into t_users (hash, mail, password, firstname, firstname_lower, lastname, lastname_lower, inscription_date, nb_request) values ('test1','test1@gmail.com', 'password', 'Test1','test1','TEST1', 'test1', '01/01/2016', 0);
insert into t_users (hash, mail, password, firstname, firstname_lower, lastname, lastname_lower, inscription_date, nb_request) values ('test2','test2@gmail.com', 'password', 'Test2','test2','TEST2', 'test2', '01/01/2016', 0);
insert into t_users (hash, mail, password, firstname, firstname_lower, lastname, lastname_lower, inscription_date, nb_request) values ('test3','test3@gmail.com', 'password', 'Test3','test3','TEST3', 'test3', '01/01/2016', 0);
insert into t_users (hash, mail, password, firstname, firstname_lower, lastname, lastname_lower, inscription_date, nb_request) values ('test4','test4@gmail.com', 'password', 'Test4','test4','TEST4', 'test4', '01/01/2016', 0);
insert into t_users (hash, mail, password, firstname, firstname_lower, lastname, lastname_lower, inscription_date, nb_request) values ('test5','test5@gmail.com', 'password', 'Test5','test5','TEST5', 'test5', '01/01/2016', 0);
insert into t_users (hash, mail, password, firstname, firstname_lower, lastname, lastname_lower, inscription_date, nb_request) values ('test6','test6@gmail.com', 'password', 'Test6','test6','TEST6', 'test6', '01/01/2016', 0);
insert into t_users (hash, mail, password, firstname, firstname_lower, lastname, lastname_lower, inscription_date, nb_request) values ('test7','test7@gmail.com', 'password', 'Test7','test7','TEST7', 'test7', '01/01/2016', 0);
insert into t_users (hash, mail, password, firstname, firstname_lower, lastname, lastname_lower, inscription_date, nb_request) values ('test8','test8@gmail.com', 'password', 'Test8','test8','TEST8', 'test8', '01/01/2016', 0);
insert into t_users (hash, mail, password, firstname, firstname_lower, lastname, lastname_lower, inscription_date, nb_request) values ('test9','test9@gmail.com', 'password', 'Test9','test9','TEST9', 'test9', '01/01/2016', 0);
insert into t_users (hash, mail, password, firstname, firstname_lower, lastname, lastname_lower, inscription_date, nb_request) values ('testProp','testProp@gmail.com', 'password', 'TestProp','prop','TESTPROP', 'testprop', '01/01/2016', 0);

insert into t_users_usertypes values (4,3);
insert into t_users_usertypes values (5,1);
insert into t_users_usertypes values (7,3);
insert into t_users_usertypes values (8,3);
insert into t_users_usertypes values (9,3);
insert into t_users_usertypes values (10,3);
insert into t_users_usertypes values (11,3);
insert into t_users_usertypes values (12,3);
insert into t_users_usertypes values (13,3);
insert into t_users_usertypes values (14,3);
insert into t_users_usertypes values (15,3);
insert into t_users_usertypes values (16,1);

insert into t_towns (postal_code,town) values ('01190','Ozan');
insert into t_towns (postal_code,town) values ('01290','Cormoranche-sur-Saône');
insert into t_towns (postal_code,town) values ('01130','Plagne');
insert into t_towns (postal_code,town) values ('01250','Tossiat');
insert into t_towns (postal_code,town) values ('01250','Pouillat');
insert into t_towns (postal_code,town) values ('01230','Torcieu');
insert into t_towns (postal_code,town) values ('01620','Replonges');
insert into t_towns (postal_code,town) values ('01110','Corcelles');

insert into t_notes (id_owner, id_tenant, id_town, date_start, date_end, capacity, attitude, degradation) values (5,4,17,'12/02/2012','16/07/2013',2,3,5);
insert into t_notes (id_owner, id_tenant, id_town, date_start, date_end, capacity, attitude, degradation) values (16,4,19,'17/08/2013','16/07/2015',1,1,1);
insert into t_notes (id_owner, id_tenant, id_town, date_start, date_end, capacity, attitude, degradation) values (16,4,18,'12/02/2015','16/07/2016',null,1,4);
insert into t_notes (id_owner, id_tenant, id_town, date_start, date_end, capacity, attitude, degradation) values (5,7,17,'12/02/2011','16/07/2013',2,4,5);
insert into t_notes (id_owner, id_tenant, id_town, date_start, date_end, capacity, attitude, degradation) values (5,8,17,'12/02/2012','16/07/2013',1,null,5);
insert into t_notes (id_owner, id_tenant, id_town, date_start, date_end, capacity, attitude, degradation) values (5,9,17,'12/02/2012','16/07/2013',5,5,5);
insert into t_notes (id_owner, id_tenant, id_town, date_start, date_end, capacity, attitude, degradation) values (5,10,17,'12/02/2012','16/07/2013',1,3,5);
