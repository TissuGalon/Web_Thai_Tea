const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));




// Define a route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cart.html'));
});

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'checkout.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/pesanan', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'pesanan.html'));
});

app.get('/wishlist', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'wishlist.html'));
});




// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
