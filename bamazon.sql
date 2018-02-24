DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(40) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Luna Bars Variety Pack of 20', 'Grocery', 5.99, 10),
		('Snow Shovel', 'Patio and Garden', 20.00, 7),
		('Nike Running Shoes', 'Sport Clothing', 60.00, 25),
		('Neos Villager Overboots', 'Shoes and Boots', 55.00, 40),
		('Fox River Extra Heavy Duty Mittens', 'Clothing', 15.00, 30),
		('Arctix Mens Breakaway Full Zip Pants', 'Clothing', 70.00, 25),
		('Down Winter Coat', 'Clothing', 100.00, 5),
		('Balaclava by GearTOP', 'Clothing', 15.00, 100),
		('3M Half Facepiece Reusable Respirator', 'tools', 10.00, 20),
		('Darn Tough Socks', 'Clothing', 17.00, 50);
