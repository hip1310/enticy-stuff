create database enticy;

-- goto enticy database and run below script
CREATE TABLE public."user" (
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	email varchar NOT NULL,
	email_verified bool NOT NULL,
	name varchar NOT NULL,
	nickname varchar NOT NULL,
	picture varchar NOT NULL,
	sub varchar NOT NULL,
	updated_at timestamp NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE public."cart" (
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	name varchar NOT NULL,
	image varchar NOT NULL,
	qty int NOT NULL,
	price varchar NOT NULL,
	category varchar NOT NULL,
	user_id int,
	updated_at timestamp default current_timestamp,
	PRIMARY KEY(id),
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES public."user"(id)
);

CREATE TABLE public."order" (
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	name varchar NOT NULL,
	image varchar NOT NULL,
	qty int NOT NULL,
	price varchar NOT NULL,
	category varchar NOT NULL,
	status varchar,
	user_id int,
	updated_at timestamp default current_timestamp,
	PRIMARY KEY(id),
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES public."user"(id)
);

CREATE TABLE public."warehouse" (
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	name varchar NOT NULL,
	address varchar NOT NULL,
	updated_at timestamp default current_timestamp,
	PRIMARY KEY(id)
);

INSERT INTO public.warehouse ("name",address,updated_at) VALUES
	('Naranpura Warehouse','Naranpura ahmedabad','2023-09-20 09:13:54.734997'),
	('Bopal Warehouse','Bopal ahmedabad','2023-09-20 09:15:50.055034'),
	('Mumbai Warehouse','Mumbai Maharastra','2023-09-20 09:16:06.521375');


CREATE TABLE public."warehouse-category-mapping" (
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	category varchar NOT NULL,
	warehouse_id int,
	updated_at timestamp default current_timestamp,
	PRIMARY KEY(id),
	CONSTRAINT fk_warehouse FOREIGN KEY(warehouse_id) REFERENCES public."warehouse"(id)
);

INSERT INTO public."warehouse-category-mapping" (category,warehouse_id,updated_at) VALUES
	('Honey',1,'2023-09-20 09:15:11.888062'),
	('Christmas/New Year',1,'2023-09-20 09:15:28.53933'),
	('Diwali',1,'2023-09-20 09:15:28.549582'),
	('Raksha Bandhan',2,'2023-09-20 09:16:23.364042'),
	('August Bonanza',3,'2023-09-20 09:16:39.231807'),
	('Hamper CN22',3,'2023-09-20 09:17:01.577536'),
	('Client choice',2,'2023-09-20 09:17:11.220148'),
	('Natural Fiber Hampers',1,'2023-09-20 09:17:27.19872'),
	('Amazing Laptop Bag',1,'2023-09-20 09:17:49.092932'),
	('Corporate Swag',2,'2023-09-20 09:17:49.102984');


CREATE TABLE public."warehouse-order-mapping" (
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	order_id int,
	warehouse_id int,
	updated_at timestamp default current_timestamp,
	PRIMARY KEY(id),
	CONSTRAINT fk_warehouse FOREIGN KEY(warehouse_id) REFERENCES public."warehouse"(id),
	CONSTRAINT fk_order FOREIGN KEY(order_id) REFERENCES public."order"(id)
);