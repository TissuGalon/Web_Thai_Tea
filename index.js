const express = require('express');
const path = require('path');
const connection = require('./koneksi');
const query = require('./controller/query');
const ejs = require('ejs');

const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set EJS sebagai view engine
app.set('view engine', 'ejs');

// Tentukan lokasi folder views
app.set('views', path.join(__dirname, 'views'));



/* LOGIN LOGIC */

app.use(bodyParser.urlencoded({ extended: true }));


// Konfigurasi session login
app.use(session({
    secret: 'login_userid', // Ganti dengan secret key yang lebih aman
    resave: false,
    saveUninitialized: true,
}));

// Middleware untuk memeriksa apakah pengguna sudah login
function requireLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        return res.redirect('/login');
    }
}


// Route untuk proses login
app.post('/proses_login', (req, res) => {
    const { email, password } = req.body;
    
    // Query ke database untuk memeriksa email dan password
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) {
            console.error('Error executing login query:', error);
            return res.status(500).send('Internal Server Error');
        }

        // Jika data pengguna ditemukan
        if (results.length > 0) {
            const user = results[0];
            req.session.userId = user.id; // Simpan user ID dalam sesi

            // Periksa role pengguna
            if (user.role === 'customer') {
                return res.redirect('/');
            } else if (user.role === 'admin') {
                return res.redirect('/dashboard');
            } else {
                return res.redirect('/login?gagal');
            }
        } else {
            return res.redirect('/login?gagal');
        }
    });
});



// Route untuk halaman dashboard (hanya bisa diakses setelah login)
app.get('/dashboard', requireLogin, (req, res) => {
   res.render('admin/dashboard', { title: 'Dashboard' });
});

// Route untuk logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/login');
    });
});

/* CHECK SESSION */
app.get('/check-session', (req, res) => {
    if (req.session.userId) {
        // Jika pengguna sudah login, kirimkan userId dan username
        connection.query('SELECT username FROM users WHERE id = ?', [req.session.userId], (error, results) => {
            if (error) {
                console.error('Error fetching username:', error);
                return res.status(500).send('Internal Server Error');
            }

            if (results.length > 0) {
                const username = results[0].username;
                res.json({ userId: req.session.userId, username: username });
            } else {
                res.json({ userId: null });
            }
        });
    } else {
        // Jika pengguna belum login, kirimkan userId null
        res.json({ userId: null });
    }
});


/* LOGIN LOGIC */



/* REGISTER LOGIC */
// Route untuk proses registe
app.post('/proses_register', (req, res) => {
    const { email, password, confirm_password } = req.body;

    // Validasi password dan konfirmasi password
    if (password !== confirm_password) {
        return res.redirect('/register?error=password_mismatch');
    }

    // Simpan pengguna baru ke database
    connection.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, password, 'customer'], (error, results) => {
        if (error) {
            console.error('Error inserting new user:', error);
            return res.status(500).send('Internal Server Error');
        }

        // Redirect ke halaman login setelah berhasil registrasi
        res.redirect('/login?success=registered');
    });
});
/* REGISTER LOGIC */




// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve header.html from "views/component" directory
app.use('/component', express.static(path.join(__dirname, 'views/component')));



// Define a route for the home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Halaman Utama' });
});

// Define a route for the home page
app.get('/dashboard', (req, res) => {
    res.render('admin/dashboard', { title: 'Dashboard' });
});

app.get('/cart', (req, res) => {
    res.render('cart', { title: 'Keranjang Belanja' });
});

app.get('/checkout', (req, res) => {
    res.render('checkout', { title: 'Checkout' });
});

app.get('/checkout/:idproduk', (req, res) => {
    // Mengambil nilai parameter dari URL menggunakan req.params
    const idproduk = req.params.idproduk;
    let sql = `SELECT * FROM produk WHERE id = ${idproduk}`;
    // Menyediakan data ke template EJS
     connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('checkout', { produk: result[0] });
    });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

app.get('/pesanan', (req, res) => {
    res.render('pesanan', { title: 'Pesanan' });
});

app.get('/wishlist', (req, res) => {
    res.render('wishlist', { title: 'Wishlist' });
});





// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




/* ------------------------------------------------------ */




/* END POINT */

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

// Endpoint untuk mengambil semua data pesanan berdasarkan user_id
app.get('/getAllPesanan/:userId', (req, res) => {
    const userId = req.params.userId;
    query.getAllPesananByUserId(userId, (error, pesanan) => {
        if (error) {
            res.status(500).json({ error: 'I    nternal Server Error' });
            return;
        }
        res.json(pesanan);
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
        res.redirect('/dashboard'); // Redirect ke dashboard
    });
});

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
    addPesanan(pesananData, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.redirect('/pesanan'); // Redirect ke halaman pesanan setelah berhasil menambahkan pesanan
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
        res.redirect('/pesanan'); // Redirect ke halaman pesanan setelah berhasil menambahkan pesanan
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
    /* const status = req.body.status; */
    const statuss = 'Selesai';
    query.updatePesananStatus(id, statuss, (error, result) => {
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


// Endpoint untuk menghapus wishlist berdasarkan ID
app.delete('/deleteWishlist/:id', (req, res) => {
    const id = req.params.id;
    query.deleteWishlist(id, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Wishlist deleted successfully' });
    });
});




/* END POINT */




app.post('/Proses_Checkout', (req, res) => {
    let data = {
        nama: req.body.nama,
        nohp: req.body.nohp,
        alamat: req.body.alamat,
        tgl_pesan: req.body.tgl_pesan,
        status_pesanan: 'Dipesan',
        produk: req.body.produk,
        jumlah: req.body.jumlah,
        total: req.body.total,
        user_id: req.body.user_id
    };
    let sql = 'INSERT INTO pesanan SET ?';
    connection.query(sql, data, (err, result) => {
        if (err) throw err;
        // Redirect to success page
        res.redirect('/pesanan');
    });
});



// Endpoint to mark order as completed (PUT request)
app.put('/order_complete/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    // Update status_pesanan to 'Selesai' in pesananData (simulated database update)
    pesananData.forEach(pesanan => {
        if (pesanan.id === orderId) {
            pesanan.status_pesanan = 'Selesai';
        }
    });
    res.sendStatus(200); // Send status OK
});