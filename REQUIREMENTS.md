# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply

## API Endpoints
#### Products
- Index  `'products/`
- Show  `'products/:id/'`
- Create [token required] `'products/[POST]'`
- DELETE `'products/:id' [DELETE]`

#### Users
- Index [token required] `'users/'`
- Show [token required] `'users/:id'`
- Create N[token required] `'users/[POST]'`
- DELETE [token required] `'users/:id' [DELETE]`

#### Orders
- Current Order by user (args: user id)[token required] `'orders/:id'`
- Create N[token required] `'orders/[POST]'`
- Get all orders [token required]`'orders/'`
- UPDATE order status `'orders/:id&:status'`
- DELETE [token required] `'orders/:id'` [DELETE]

## Data Shapes
#### Product
` TABLE products(id SERIAL PRIMARY KEY,name VARCHAR(100),price NUMERIC); `

### User
` TABLE users(id SERIAL PRIMARY KEY,firstName VARCHAR(50),lastName VARCHAR(50),password VARCHAR(60)); `

### Order
` TABLE orders(id SERIAL PRIMARY KEY,user_id INTEGER,status mood, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE ); `

### Order_Products
` CREATE TABLE order_products(id SERIAL PRIMARY KEY,order_id INTEGER,quantity INTEGER DEFAULT 1,product_id INTEGER,FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE ); `

### ENUM status
` TYPE mood AS ENUM ('active', 'complete'); `