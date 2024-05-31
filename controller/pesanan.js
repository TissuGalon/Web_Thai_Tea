const connection = require('../koneksi');

// Fungsi untuk mengambil semua data pesanan
function getAllPesanan(callback) {
    connection.query('SELECT * FROM pesanan', (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results);
    });
}

// Fungsi untuk mengambil data pesanan berdasarkan user_id
function getPesananByUserId(userId, callback) {
    connection.query('SELECT * FROM pesanan WHERE user_id = ?', [userId], (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results);
    });
}

// Fungsi untuk menambahkan pesanan baru
function addPesanan(pesanan, callback) {
    const { user_id, nama, produk, jumlah, harga } = pesanan;
    connection.query(
        'INSERT INTO pesanan (user_id, nama, produk, jumlah, harga) VALUES (?, ?, ?, ?, ?)',
        [user_id, nama, produk, jumlah, harga],
        (error, results, fields) => {
            if (error) {
                callback(error, null);
                return;
            }
            callback(null, results);
        }
    );
}

// Fungsi untuk menghapus pesanan berdasarkan id
function deletePesananById(id, callback) {
    connection.query('DELETE FROM pesanan WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results);
    });
}

// Fungsi untuk mengupdate pesanan berdasarkan id
function updatePesananById(id, updatedPesanan, callback) {
    const { nama, produk, jumlah, harga } = updatedPesanan;
    connection.query(
        'UPDATE pesanan SET nama = ?, produk = ?, jumlah = ?, harga = ? WHERE id = ?',
        [nama, produk, jumlah, harga, id],
        (error, results, fields) => {
            if (error) {
                callback(error, null);
                return;
            }
            callback(null, results);
        }
    );
}

module.exports = {
    getAllPesanan,
    getPesananByUserId,
    addPesanan,
    deletePesananById,
    updatePesananById
};
