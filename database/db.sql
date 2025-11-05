
CREATE DATABASE crud_productos_nextjs;

USE crud_productos_nextjs;

CREATE TABLE product(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(200),
    image VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


