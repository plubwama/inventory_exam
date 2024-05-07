// Install Express JS
const express = require('express');

// Install Mongoose
const mongoose = require('mongoose');

const app = express();
const port = 4000;

const cors = require('cors');

// Define the User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create the User Model
const User = mongoose.model('User', userSchema);

// Define the Product Schema
const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    SKU: { type: String, required: true, unique: true }, // Enforce unique SKU
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    supplier: { type: String, required: true },
    reorderLevel: { type: Number, required: true, default: 50 },
    comments: String // Comments can be optional
});

// Create the Product Model
const Product = mongoose.model('Product', productSchema);

// Connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/inventory').then((_) => {
    console.log('Connected to database')
}).catch(error => {
    console.error('Failed to connect to database');
})

// Enable JSON body parsing
app.use(express.json());

// Enable CORS
app.use(cors());

// Route: Register a new user (POST /register)
app.post('/register', async (req, res) => {
    const newUser = req.body;
    // Validate request body
    if (!newUser || !newUser.username || !newUser.password) {
        return res.status(400).json({
            status: 'FAILED',
            message: 'Please provide username and password',
            data: null
        });
    }

    try {
        const user = await User.create(newUser);
        res.json({
            status: 'SUCCESS',
            message: 'User registered successfully',
            data: user
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            status: 'FAILED',
            message: error.message,
            data: null
        });
    }
});

// Route: User login (POST /login)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({
                status: 'SUCCESS',
                message: 'User logged in successfully',
                data: user
            });
        } else {
            res.status(401).json({
                status: 'FAILED',
                message: 'Invalid username or password',
                data: null
            });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({
            status: 'FAILED',
            message: error.message,
            data: null
        });
    }
});

// Route: Search for a product by name (GET /search?name=<product name>)
app.get('/products/search', async (req, res) => {
    const productName = req.query.name;
    try {
        const products = await Product.find({ productName: { $regex: new RegExp(productName, 'i') } });
        res.json({
            status: 'SUCCESS',
            message: 'Products fetched successfully',
            data: products
        });
    } catch (error) {
        console.error('Error searching for product:', error);
        res.status(500).json({
            status: 'FAILED',
            message: error.message,
            data: null
        });
    }
});


// Route: Register a new product (POST /products/register)
app.post('/products/register', async (req, res) => {
    const newProductData = req.body;

    // Validate request body
    if (!newProductData || !newProductData.productName || !newProductData.SKU || !newProductData.price || !newProductData.quantity || !newProductData.supplier || !newProductData.reorderLevel) {
        return res.status(400).json({
            status: 'FAILED',
            message: 'Please provide all required fields',
            data: null
        });
    }

    try {
        const newProduct = await Product.create(newProductData);

        if (newProduct) {
            res.json({
                status: 'SUCCESS',
                message: 'New product added',
                data: newProduct
            });
        } else {
            res.status(500).json({
                status: 'FAILED',
                message: 'Failed to add new product data',
                data: null
            });
        }
    } catch (error) {
        console.error('Error registering product:', error);
        res.status(500).json({
            status: 'FAILED',
            message: error.message,
            data: null
        });
    }
});

// Route: Get all products (GET /products)
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            status: 'SUCCESS',
            message: 'Products fetched successfully',
            data: products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            status: 'FAILED',
            message: error.message,
            data: null
        });
    }
});

// Route: Get a product by ID (GET /products/:id)
app.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (product) {
            res.json({
                status: 'SUCCESS',
                message: 'Product fetched successfully',
                data: product
            });
        } else {
            res.status(404).json({
                status: 'FAILED',
                message: 'Product not found',
                data: null
            });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            status: 'FAILED',
            message: error.message,
            data: null
        });
    }
});

// Route: Edit a product (PUT/PATCH /products/:id/edit)
app.put('/products/:id/edit', async (req, res) => {
    const productId = req.params.id;
    const updatedProductData = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updatedProductData,
            { new: true }
        );
        if (updatedProduct) {
            res.json({
                status: 'SUCCESS',
                message: 'Product updated successfully',
                data: updatedProduct
            });
        } else {
            res.status(404).json({
                status: 'FAILED',
                message: 'Product not found',
                data: null
            });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            status: 'FAILED',
            message: error.message,
            data: null
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Product API listening on port ${port}`);
});
