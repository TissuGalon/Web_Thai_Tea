-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2024 at 12:27 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thaitea_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `keranjang`
--

CREATE TABLE `keranjang` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `produk_id` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `tgl_ditambahkan` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `keranjang`
--

INSERT INTO `keranjang` (`id`, `user_id`, `produk_id`, `jumlah`, `subtotal`, `tgl_ditambahkan`) VALUES
(1, 1, 1, 2, 50000.00, '2024-05-31 20:38:32'),
(2, 2, 3, 1, 27000.00, '2024-05-31 20:38:32'),
(3, 3, 2, 3, 90000.00, '2024-05-31 20:38:32');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nohp` varchar(15) NOT NULL,
  `alamat` text NOT NULL,
  `tgl_pesan` date NOT NULL,
  `status_pesanan` varchar(50) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`id`, `nama`, `nohp`, `alamat`, `tgl_pesan`, `status_pesanan`, `total`, `user_id`) VALUES
(1, 'Andi Wijaya', '08123456789', 'Jl. Mawar No. 1', '2024-05-01', 'Dikirim', 75000.00, 1),
(2, 'Budi Santoso', '08234567890', 'Jl. Melati No. 2', '2024-05-02', 'Dikirim', 27000.00, 2),
(3, 'Citra Dewi', '08345678901', 'Jl. Anggrek No. 3', '2024-05-03', 'Selesai', 90000.00, 3);

-- --------------------------------------------------------

--
-- Table structure for table `pesanan_detail`
--

CREATE TABLE `pesanan_detail` (
  `id` int(11) NOT NULL,
  `pesanan_id` int(11) NOT NULL,
  `produk` varchar(255) NOT NULL,
  `harga` decimal(10,2) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pesanan_detail`
--

INSERT INTO `pesanan_detail` (`id`, `pesanan_id`, `produk`, `harga`, `jumlah`, `subtotal`) VALUES
(1, 1, 'Thai Tea Asli', 25000.00, 2, 50000.00),
(2, 1, 'Thai Tea Segar', 27000.00, 1, 27000.00),
(3, 2, 'Thai Tea Segar', 27000.00, 1, 27000.00),
(4, 3, 'Thai Tea Klasik', 30000.00, 3, 90000.00);

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `deskripsi` varchar(250) NOT NULL,
  `harga` decimal(10,2) NOT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `jenis` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id`, `nama`, `deskripsi`, `harga`, `gambar`, `jenis`) VALUES
(1, 'Thai Tea Asli', 'Rasakan sensasi autentik Thai Tea dengan cita rasa klasik yang memikat, menyegarkan dengan setiap tegukan.', 25000.00, 'gambar_thaitea.jpg', 'Minuman'),
(2, 'Thai Tea Segar', 'Kesegaran Thai Tea terbaik dalam setiap sajian, memberikan pengalaman minum yang memuaskan di setiap kesempatan.', 27000.00, 'gambar_thaitea.jpg', 'Minuman'),
(3, 'Thai Tea Klasik', 'Hadir dengan sentuhan klasik yang kaya rasa, Thai Tea ini adalah pilihan tepat untuk menikmati minuman yang autentik.', 30000.00, 'gambar_thaitea.jpg', 'Minuman'),
(4, 'Thai Tea Autentik', 'Rasakan keaslian cita rasa Thai Tea dengan balutan aroma unik yang akan memanjakan lidah Anda.', 28000.00, 'gambar_thaitea.jpg', 'Minuman'),
(5, 'Thai Tea Premium', 'Nikmati sensasi minum Thai Tea dengan kualitas premium yang tak tertandingi, memberikan pengalaman minum yang istimewa.', 26000.00, 'gambar_thaitea.jpg', 'Minuman'),
(6, 'Thai Tea Nikmat', 'Kehangatan Thai Tea yang nikmat menyatu dengan aroma lezatnya, memberikan pengalaman minum yang tiada tara.', 29000.00, 'gambar_thaitea.jpg', 'Minuman'),
(7, 'Thai Tea Lezat', 'Kenikmatan Thai Tea yang memikat dengan sentuhan rasa yang lezat, memanjakan indera pengecap Anda.', 25500.00, 'gambar_thaitea.jpg', 'Minuman'),
(8, 'Thai Tea Mantap', 'Kekuatan rasa Thai Tea yang mantap, memberikan kepuasan tiada tara setiap kali Anda menikmatinya.', 28500.00, 'gambar_thaitea.jpg', 'Minuman'),
(9, 'Thai Tea Enak', 'Kecapatan Thai Tea yang enak dan memikat, membuat setiap tegukan menjadi pengalaman yang menyenangkan.', 31000.00, 'gambar_thaitea.jpg', 'Minuman'),
(10, 'Thai Tea Original', 'Kesegaran Thai Tea yang asli dan otentik, memberikan pengalaman minum yang tak terlupakan dalam setiap sajian.', 27500.00, 'gambar_thaitea.jpg', 'Minuman');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `nohp` varchar(15) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `tgl_daftar` date NOT NULL DEFAULT current_timestamp(),
  `role` enum('admin','customer') DEFAULT 'customer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `nama_lengkap`, `nohp`, `alamat`, `tgl_daftar`, `role`) VALUES
(1, 'andi123', '123', '123@gmail.com', 'Andi Wijaya', '08123456789', 'Jl. Mawar No. 1', '2024-05-01', 'customer'),
(2, 'budi456', 'hashed_password_budi', 'budi@example.com', 'Budi Santoso', '08234567890', 'Jl. Melati No. 2', '2024-05-02', 'customer'),
(3, 'citra789', 'hashed_password_citra', 'citra@example.com', 'Citra Dewi', '08345678901', 'Jl. Anggrek No. 3', '2024-05-03', 'customer'),
(4, 'admin01', 'gg', 'gg@gmail.com', 'Admin Site', '08456789012', 'Jl. Kenanga No. 4', '2024-05-01', 'admin'),
(5, '', 'wew', 'wew@gmail.com', '', NULL, NULL, '0000-00-00', 'customer'),
(7, '', 'hehew', 'hehew@gmail.com', '', NULL, NULL, '2024-06-01', 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `produk_id` int(11) NOT NULL,
  `tgl_ditambahkan` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `user_id`, `produk_id`, `tgl_ditambahkan`) VALUES
(1, 1, 2, '2024-05-31 20:40:20'),
(2, 1, 4, '2024-05-31 20:40:20'),
(3, 2, 1, '2024-05-31 20:40:20'),
(4, 3, 3, '2024-05-31 20:40:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `produk_id` (`produk_id`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `pesanan_detail`
--
ALTER TABLE `pesanan_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pesanan_id` (`pesanan_id`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `produk_id` (`produk_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `keranjang`
--
ALTER TABLE `keranjang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pesanan_detail`
--
ALTER TABLE `pesanan_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD CONSTRAINT `keranjang_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `keranjang_ibfk_2` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pesanan_detail`
--
ALTER TABLE `pesanan_detail`
  ADD CONSTRAINT `pesanan_detail_ibfk_1` FOREIGN KEY (`pesanan_id`) REFERENCES `pesanan` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
