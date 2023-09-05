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
	user_id int,
  updated_at timestamp default current_timestamp,
	PRIMARY KEY(id),
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES public."user"(id)
);