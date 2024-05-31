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



module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};