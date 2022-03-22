CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    order_id INTEGER,
    quantity INTEGER DEFAULT 1,
    product_id INTEGER,

    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE 
);