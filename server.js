const express = require('express');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcryptjs');
app.use(express.json());

// Define routes here

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});

app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await db.users.create({
            username,
            password: hashedPassword,
        });

        res.json({ message: "User registered successfully!", userId: user.id });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await db.categories.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/products/category/:categoryId', async (req, res) => {
    try {
        const products = await db.products.findAll({
            where: { categoryId: req.params.categoryId }
        });
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await db.products.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add to cart
app.post('/api/cart', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const item = await db.cart.create({ userId, productId, quantity });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// View cart
app.get('/api/cart/:userId', async (req, res) => {
    try {
        const cartItems = await db.cart.findAll({
            where: { userId: req.params.userId }
        });
        res.json(cartItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update cart item quantity
app.put('/api/cart/:id', async (req, res) => {
    try {
        const { quantity } = req.body;
        const updated = await db.cart.update({ quantity }, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.send('Cart updated');
        } else {
            res.status(404).send('Cart item not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Remove item from cart
app.delete('/api/cart/:id', async (req, res) => {
    try {
        const deleted = await db.cart.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.send('Item removed from cart');
        } else {
            res.status(404).send('Cart item not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { userId, products } = req.body; // Assume products is an array of { productId, quantity }
        const total = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

        const order = await db.order.create({ userId, total, status: 'pending' });

        // Ideally, you should also create order items here, linking each product to the order

        res.status(201).json(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/orders/user/:userId', async (req, res) => {
    try {
        const orders = await db.order.findAll({
            where: { userId: req.params.userId }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await db.order.findByPk(req.params.id);
        if (order) {
            // Optionally, fetch and include order items details here
            res.json(order);
        } else {
            res.status(404).send('Order not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});
