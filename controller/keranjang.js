const connection = require('../koneksi');

// Fungsi untuk mengambil semua data keranjang dari database
function getAllCart(callback) {
    connection.query('SELECT * FROM keranjang', (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results);
    });
}

// Fungsi untuk mengambil data keranjang berdasarkan ID
function getCartById(id, callback) {
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


module.exports = {
    getAllCart,
    getCartById,
};