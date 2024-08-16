CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    password VARCHAR(128) NOT NULL,
    phone_number VARCHAR(15),
    email VARCHAR(128) NOT NULL UNIQUE,
    user_type VARCHAR(32) NOT NULL,
    token VARCHAR(256) NOT NULL UNIQUE DEFAULT 'updating...'
);
CREATE TABLE user_address (
    addr_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INTEGER NOT NULL,
    address_line1 VARCHAR(256),
    address_line2 VARCHAR(256),
    city VARCHAR(128),
    pincode INTEGER,
    country VARCHAR(128),
    FOREIGN KEY (`user_id`) REFERENCES user(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE customer (
    cust_id INTEGER NOT NULL PRIMARY KEY,
    addr_id INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (cust_id) REFERENCES user(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE seller (
    seller_id INTEGER NOT NULL PRIMARY KEY,
    addr_id INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (seller_id) REFERENCES user(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (addr_id) REFERENCES user_address(addr_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE payment (
    payment_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    payment_date INTEGER NOT NULL,
    payment_type VARCHAR(128) NOT NULL,
    provider_name VARCHAR(128) NOT NULL,
    total_amount FLOAT(2) NOT NULL,
    payment_status VARCHAR(32),
    FOREIGN KEY (customer_id) REFERENCES user(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE product (
    product_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_type VARCHAR(64) NOT NULL,
    color VARCHAR(64) NOT NULL,
    size VARCHAR(32) NOT NULL,
    gender VARCHAR(32) NOT NULL,
    description VARCHAR(256) NOT NULL,
    img_url VARCHAR(512) NOT NULL UNIQUE,
    cost float(2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 6,
    seller_id INTEGER NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES seller(seller_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE past_order_details (
    order_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INTEGER NOT NULL,
    payment_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    product_desc VARCHAR(256) NOT NULL,
    order_date INTEGER NOT NULL,
    price FLOAT(2) NOT NULL,
    qty INTEGER NOT NULL,
    product_size VARCHAR(8) NOT NULL,
    product_color VARCHAR(64) NOT NULL,
    productImg VARCHAR(512) NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES user(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (payment_id) REFERENCES payment(payment_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE DISCOUNTS (
    discount_id INTEGER NOT NULL PRIMARY KEY,
    discount_amount DECIMAL(5, 2) DEFAULT 0,
    active BOOLEAN,
    FOREIGN KEY (discount_id) REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE CASCADE
);