const connection = require('../koneksi');

// Fungsi untuk mengambil semua data produk dari database
function getAllProducts(callback) {
    connection.query('SELECT * FROM produk', (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results);
    });
}

// Fungsi untuk mengambil data produk berdasarkan ID
function getProductById(id, callback) {
    connection.query('SELECT * FROM produk WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        if (results.length === 0) {
            callback(null, {});
            return;
        }
        callback(null, results[0]);
    });
}

// Fungsi untuk menambahkan produk baru ke database
function addProduct(productData, callback) {
    connection.query('INSERT INTO produk SET ?', productData, (error, results, fields) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, results.insertId);
    });
}

// Fungsi untuk mengupdate data produk berdasarkan ID
function updateProduct(id, productData, callback) {
    connection.query('UPDATE produk SET ? WHERE id = ?', [productData, id], (error, results, fields) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, 'Product updated successfully');
    });
}

// Fungsi untuk menghapus data produk berdasarkan ID
function deleteProduct(id, callback) {
    connection.query('DELETE FROM produk WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, 'Product deleted successfully');
    });
}



// Fungsi untuk mengambil semua data pesanan dari database
function getAllPesanan(callback) {
    connection.query('SELECT * FROM pesanan', (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results);
    });
}

// Fungsi untuk mengambil semua data pesanan berdasarkan user_id
function getAllPesananByUserId(userId, callback) {
    connection.query('SELECT * FROM pesanan WHERE user_id = ?', [userId], (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results);
    });
}


// Fungsi untuk mengambil data pesanan berdasarkan ID
function getPesananById(id, callback) {
    connection.query('SELECT * FROM pesanan WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        if (results.length === 0) {
            callback(null, {});
            return;
        }
        callback(null, results[0]);
    });
}

// Fungsi untuk menambahkan pesanan baru ke database
function addPesanan(pesananData, callback) {
    connection.query('INSERT INTO pesanan SET ?', pesananData, (error, results, fields) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, results.insertId);
    });
}

// Fungsi untuk mengupdate data pesanan berdasarkan ID
function updatePesanan(id, pesananData, callback) {
    connection.query('UPDATE pesanan SET ? WHERE id = ?', [pesananData, id], (error, results, fields) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, 'Pesanan updated successfully');
    });
}

// Fungsi untuk menghapus data pesanan berdasarkan ID
function deletePesanan(id, callback) {
    connection.query('DELETE FROM pesanan WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, 'Pesanan deleted successfully');
    });
}

// Fungsi untuk mengubah status pesanan menjadi batal atau selesai berdasarkan ID
function updatePesananStatus(id, status, callback) {
    connection.query('UPDATE pesanan SET status = ? WHERE id = ?', [status, id], (error, results, fields) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, 'Status pesanan updated successfully');
    });
}

// Fungsi untuk mengambil semua data keranjang dari database
function getAllKeranjang(callback) {
    connection.query('SELECT * FROM keranjang', (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results);
    });
}

// Fungsi untuk mengambil data keranjang berdasarkan ID
function getKeranjangById(id, callback) {
    connection.query('SELECT * FROM keranjang WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        if (results.length === 0) {
            callback(null, {});
            return;
        }
        callback(null, results[0]);
    });
}

// Fungsi untuk menghapus data keranjang berdasarkan ID
function deleteKeranjang(id, callback) {
    connection.query('DELETE FROM keranjang WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, 'Keranjang deleted successfully');
    });
}

// Fungsi untuk menambahkan wishlist ke user_id tertentu
function addWishlist(wishlistData, callback) {
    connection.query('INSERT INTO wishlist SET ?', wishlistData, (error, results, fields) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, results.insertId);
    });
}

// Fungsi untuk menghapus wishlist berdasarkan ID
function deleteWishlist(id, callback) {
    connection.query('DELETE FROM wishlist WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, 'Wishlist deleted successfully');
    });
}

module.exports = {
    getAllPesanan,
    getAllPesananByUserId,
    getPesananById,
    addPesanan,
    updatePesanan,
    deletePesanan,
    updatePesananStatus,
    getAllKeranjang,
    getKeranjangById,
    deleteKeranjang,
    addWishlist,
    deleteWishlist,
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};
