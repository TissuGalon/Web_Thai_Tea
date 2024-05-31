const express = require('express');
const app = express.app();
const query = require('../query');

// Endpoint untuk mengambil semua data pesanan
app.get('/getAllPesanan', (req, res) => {
    query.getAllPesanan((error, pesanan) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(pesanan);
    });
});

// Endpoint untuk mengambil semua data pesanan berdasarkan user_id
app.get('/getAllPesanan/:userId', (req, res) => {
    const userId = req.params.userId;
    query.getAllPesananByUserId(userId, (error, pesanan) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(pesanan);
    });
});


// Endpoint untuk mengambil data pesanan berdasarkan ID
app.get('/getPesananById/:id', (req, res) => {
    const id = req.params.id;
    query.getPesananById(id, (error, pesanan) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (!pesanan) {
            res.status(404).json({ error: 'Pesanan not found' });
            return;
        }
        res.json(pesanan);
    });
});

// Endpoint untuk menambahkan pesanan baru
app.post('/addPesanan', (req, res) => {
    const pesananData = req.body;
    query.addPesanan(pesananData, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Pesanan added successfully', id: result });
    });
});

// Endpoint untuk menghapus pesanan berdasarkan ID
app.delete('/deletePesanan/:id', (req, res) => {
    const id = req.params.id;
    query.deletePesanan(id, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Pesanan deleted successfully' });
    });
});

// Endpoint untuk mengupdate pesanan berdasarkan ID
app.put('/updatePesanan/:id', (req, res) => {
    const id = req.params.id;
    const pesananData = req.body;
    query.updatePesanan(id, pesananData, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Pesanan updated successfully' });
    });
});

// Endpoint untuk merubah status pesanan menjadi batal atau selesai
app.put('/updatePesananStatus/:id', (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    query.updatePesananStatus(id, status, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Pesanan status updated successfully' });
    });
});

// Endpoint untuk mengambil semua data keranjang
app.get('/getAllKeranjang', (req, res) => {
    query.getAllKeranjang((error, keranjang) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(keranjang);
    });
});

// Endpoint untuk mengambil data keranjang berdasarkan ID
app.get('/getKeranjangById/:id', (req, res) => {
    const id = req.params.id;
    query.getKeranjangById(id, (error, keranjang) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (!keranjang) {
            res.status(404).json({ error: 'Keranjang not found' });
            return;
        }
        res.json(keranjang);
    });
});

// Endpoint untuk menghapus data keranjang berdasarkan ID
app.delete('/deleteKeranjang/:id', (req, res) => {
    const id = req.params.id;
    query.deleteKeranjang(id, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Keranjang deleted successfully' });
    });
});

// Endpoint untuk menambahkan wishlist ke user_id tertentu
app.post('/addWishlist', (req, res) => {
    const wishlistData = req.body;
    query.addWishlist(wishlistData, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Wishlist added successfully', id: result });
    });
});

// Endpoint untuk meng


// Endpoint untuk mengambil semua produk
app.get('/getAllProducts', (req, res) => {
    query.getAllProducts((error, products) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(products);
    });
});

// Endpoint untuk mengambil produk berdasarkan ID
app.get('/getProductById/:id', (req, res) => {
    const id = req.params.id;
    query.getProductById(id, (error, product) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(product);
    });
});

// Endpoint untuk menambahkan produk baru
app.post('/addProduct', (req, res) => {
    const productData = req.body;
    query.addProduct(productData, (error, productId) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Product added successfully', productId: productId });
    });
});

// Endpoint untuk mengupdate produk berdasarkan ID
app.put('/updateProduct/:id', (req, res) => {
    const id = req.params.id;
    const productData = req.body;
    query.updateProduct(id, productData, (error, message) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: message });
    });
});

// Endpoint untuk menghapus produk berdasarkan ID
app.delete('/deleteProduct/:id', (req, res) => {
    const id = req.params.id;
    query.deleteProduct(id, (error, message) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: message });
    });
});