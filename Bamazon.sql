CREATE DATABASE bamazon;

USE bamazon;


CREATE TABLE products (
	item_id INT NOT NULL,
	product_name VARCHAR(200) NOT NULL,
	department_name VARCHAR(200) NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
    stock_quantiy INT NOT NULL
	PRIMARY KEY (item_id)
);


CREATE TABLE favorite_foods (
  id integer(10) auto_increment not null,
  food varchar(30) not null,
  score integer(10),
  primary key (id)
);

CREATE TABLE products (
  item_id integer(10) auto_increment not null,
  product_name varchar(200) not null,
  department_name varchar(200) not null,
  price decimal(10, 2),
  stock_quantiy integer(10) not null,
  primary key (item_id)
);


DROP TABLE favorite_foods;