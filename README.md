# E-commerseAPI
This project is a RESTful API for e-commerce operations, including product and category management, cart handling, and order processing. It's built with Node.js, Express, and Sequelize ORM, utilizing a PostgreSQL database to store data.

**Features**

User authentication and registration

Category listing and management

Product listing with category-based filtering

Cart management (add, update, view, delete)

Order placement and history retrieval

Detailed views for products and orders

*Getting Started*

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

**Prerequisites**
Node.js (v14 or later recommended)
PostgreSQL
npm (Node Package Manager)

**Installation**
Clone the repository:
```
git clone https://github.com/sujanMidatani7/E-commerseAPI.git
cd E-commerceAPI
```
**Install NPM packages:**

```
npm install
```
Create a .env file in the root directory and add your database connection string and any other environment variables:
bash
```
DATABASE_URL=postgres://username:password@localhost:5432/yourdatabasename
JWT_SECRET=your_jwt_secret
```
Run database migrations (ensure your PostgreSQL server is running):

```
npx sequelize-cli db:migrate
```

**Start the server:**

```
npm start
```
The server should now be running on http://localhost:3000.

**API Endpoints**
Below is a list of available API endpoints:

*Auth*

POST /api/auth/register - Register a new user

POST /api/auth/login - Login a user

*Categories*

GET /api/categories - List all categories

*Products*

GET /api/products - List all products

GET /api/products/:id - Get a single product by ID

GET /api/products/category/:categoryId - List products by category

*Cart*

POST /api/cart - Add a product to the cart

GET /api/cart/:userId - View the user's cart

PUT /api/cart/:id - Update cart item quantity

DELETE /api/cart/:id - Remove an item from the cart

*Orders*

POST /api/orders - Place an order

GET /api/orders/:id - Get order details

GET /api/orders/user/:userId - Get user's order history

*Testing*

You can test the API endpoints using tools like Postman or cURL. See the Testing section for example curl commands.
