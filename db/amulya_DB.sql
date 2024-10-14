-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 14, 2024 at 07:40 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `amulya_DB`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_ID` varchar(110) NOT NULL,
  `name` varchar(110) NOT NULL,
  `email` varchar(110) NOT NULL,
  `password` varchar(110) NOT NULL,
  `role` varchar(12) NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_ID`, `name`, `email`, `password`, `role`) VALUES
('Admin807712', 'Chirag Tyagi', 'tyagi.chirag1234@gmail.com', '$2b$10$0zaeFfMyS4/FLTN/YEWbD.2u4EqlNOiK16qpccn6TlyTZJEj4VECm', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `product_data`
--

CREATE TABLE `product_data` (
  `product_id` varchar(40) NOT NULL,
  `product_name` varchar(510) NOT NULL,
  `product_price` varchar(110) NOT NULL,
  `product_drop_price` varchar(110) DEFAULT NULL,
  `product_discription` varchar(1120) NOT NULL,
  `product_qty` int(110) NOT NULL,
  `product_status` varchar(40) DEFAULT NULL,
  `product_discount` varchar(40) DEFAULT NULL,
  `product_tax_class` varchar(60) DEFAULT NULL,
  `product_tax_amount` int(10) DEFAULT NULL,
  `product_raiting` varchar(110) DEFAULT NULL,
  `product_img` varchar(225) DEFAULT NULL,
  `date_added` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_data`
--

INSERT INTO `product_data` (`product_id`, `product_name`, `product_price`, `product_drop_price`, `product_discription`, `product_qty`, `product_status`, `product_discount`, `product_tax_class`, `product_tax_amount`, `product_raiting`, `product_img`, `date_added`) VALUES
('Product108678', 'Yoga Bag', '786', NULL, 'Yoga Jute Bags (set of 4 ) price 786 for medium (large 856) (xl 1096) ( pack of 3 price  596)', 87, 'published', '0', 'tax-free', 15, NULL, 'http://localhost:3000/uploads/1728745195236.jpeg', '2024-10-12'),
('Product204030', 'Love jute food bag ', '468', NULL, 'Pack of 2 pcs for medium 299\r\nPack of 2 pcs for large 399\r\nPack of 2 pcs for xl 499\r\nPack of 4 pcs for medium 499\r\nPack of 4 pcs for large 599\r\nPack of 4 pcs for xl 849\r\nPack of 6pcs for medium 699\r\nPack of 6pcs for large 799\r\nPack of 6 pcs for xl 1149\r\nPack of 8 pcs for medium 899\r\nPack of 8 pcs for large 999\r\nPack of 8 pcs for xl 1399\r\nPack of 10 pcs for medium 1199\r\nPack of 10 pcs for large 1299\r\nPack pf 10 pcs for xl 1699', 299, 'draft', '0', 'tax-free', 12, NULL, 'http://localhost:3000/uploads/1728746051124.jpeg', '2024-10-12'),
('Product268401', 'Tribal jute bags', '599', NULL, 'Tribal jute bags (one pack price 399)(pack of 2 599)(pack of 6 price 799) (pack of 12 price 1599)', 302, 'draft', '0', 'tax-free', 2, NULL, 'http://localhost:3000/uploads/1728745933280.jpeg', '2024-10-12'),
('Product336580', 'Madhubaani jute bags', '826', NULL, 'Multi pack of 6pcs 829\r\nMulti pack of 12pcs 1629\r\nMulti pack of 18pcs 2429\r\nMulti pack of 24pcs 3229\r\nMulti pack of 30pcs 4029\r\nMulti pack of 36pcs 4829\r\nMulti pack of 42 pcs 5629\r\nMulti pack of 48 pcs 6429\r\nMulti pack of 54 pcs 7229\r\nMulti pack of 60 pcs 8029', 100, 'inactive', '20%', 'taxable-goods', 5, NULL, 'http://localhost:3000/uploads/1728746700609.jpeg', '2024-10-12'),
('Product679613', 'Multi colour jute bags', '142', NULL, 'Pack of 5 -745\r\nPack of 10- 1495\r\nPack of 15-2245\r\nPack of 20-2995\r\nPack of 25-3745\r\nPack of 30-4495\r\nPack of 35-5245\r\nPack of 40-5995\r\nPack of 45-6745\r\nPack of 50-7495', 439, 'published', '0', 'tax-free', 12, NULL, 'http://localhost:3000/uploads/1728746099709.jpeg', '2024-10-12'),
('Product899433', 'Madhubaani jute bags', '826', NULL, 'Multi pack of 6pcs 829\r\nMulti pack of 12pcs 1629\r\nMulti pack of 18pcs 2429\r\nMulti pack of 24pcs 3229\r\nMulti pack of 30pcs 4029\r\nMulti pack of 36pcs 4829\r\nMulti pack of 42 pcs 5629\r\nMulti pack of 48 pcs 6429\r\nMulti pack of 54 pcs 7229\r\nMulti pack of 60 pcs 8029', 100, 'scheduled', '0', 'tax-free', 12, NULL, 'http://localhost:3000/uploads/1728745983904.jpeg', '2024-10-12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` varchar(64) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `marketing_accept` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_ID`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `admin_ID` (`admin_ID`);

--
-- Indexes for table `product_data`
--
ALTER TABLE `product_data`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
