create database mentorg;

-- goto mentorg database and run below script
CREATE TABLE public."template" (
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	title varchar NOT NULL,
	"cost" numeric NOT NULL,
	description varchar NOT NULL,
	thumbnail varchar NOT NULL,
	image varchar NOT NULL
);

insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7111,'Business Site Template - 7111',45.00,'Lorem ipsum dolor sit amet, dictum et quisque aliquet malesuada at, rutrum ac nullam, elit massa facilisis','7111-m.jpg','7111-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7112,'Business Site Template - 7112',55.00,'Laoreet eu amet soluta error a nulla, sed maecenas est risus augue turpis varius, torquent fermentum diam in augue.','7112-m.jpg','7112-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7118,'Business Site Template - 7118',65.00,'Lorem ipsum dolor sit amet, dictum et quisque aliquet malesuada at, rutrum ac nullam, elit massa facilisis','7118-m.jpg','7118-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7124,'Business Site Template - 7124',55.00,'Laoreet eu amet soluta error a nulla, sed maecenas est risus augue turpis varius, torquent fermentum diam in augue.','7124-m.jpg','7124-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7130,'Business Site Template - 7130',45.00,'Lorem ipsum dolor sit amet, dictum et quisque aliquet malesuada at, rutrum ac nullam, elit massa facilisis','7130-m.jpg','7130-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7131,'Business Site Template - 7131',55.00,'Laoreet eu amet soluta error a nulla, sed maecenas est risus augue turpis varius, torquent fermentum diam in augue.','7131-m.jpg','7131-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7141,'Business Site Template - 7141',65.00,'Lorem ipsum dolor sit amet, dictum et quisque aliquet malesuada at, rutrum ac nullam, elit massa facilisis','7141-m.jpg','7141-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7143,'Business Site Template - 7143',35.00,'Laoreet eu amet soluta error a nulla, sed maecenas est risus augue turpis varius, torquent fermentum diam in augue.','7143-m.jpg','7143-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7147,'Business Site Template - 7147',47.00,'Lorem ipsum dolor sit amet, dictum et quisque aliquet malesuada at, rutrum ac nullam, elit massa facilisis','7147-m.jpg','7147-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7150,'Business Site Template - 7150',53.00,'Laoreet eu amet soluta error a nulla, sed maecenas est risus augue turpis varius, torquent fermentum diam in augue.','7150-m.jpg','7150-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7152,'Business Site Template - 7152',62.00,'Lorem ipsum dolor sit amet, dictum et quisque aliquet malesuada at, rutrum ac nullam, elit massa facilisis','7152-m.jpg','7152-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7155,'Business Site Template - 7155',60.00,'Laoreet eu amet soluta error a nulla, sed maecenas est risus augue turpis varius, torquent fermentum diam in augue.','7155-m.jpg','7155-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7160,'Business Site Template - 7160',47.00,'Lorem ipsum dolor sit amet, dictum et quisque aliquet malesuada at, rutrum ac nullam, elit massa facilisis','7160-m.jpg','7160-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7162,'Business Site Template - 7162',42.00,'Laoreet eu amet soluta error a nulla, sed maecenas est risus augue turpis varius, torquent fermentum diam in augue.','7162-m.jpg','7162-b.jpg');
insert into "template"(id,title,cost,description,thumbnail,image) OVERRIDING system VALUE values(7164,'Business Site Template - 7164',67.00,'Lorem ipsum dolor sit amet, dictum et quisque aliquet malesuada at, rutrum ac nullam, elit massa facilisis','7164-m.jpg','7164-b.jpg');
