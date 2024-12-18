-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 08, 2024 at 08:32 AM
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
-- Database: `amulya_db`
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
('Admin807712', 'Chirag Tyagi', 'tyagi.chirag1234@gmail.com', '$2b$10$0zaeFfMyS4/FLTN/YEWbD.2u4EqlNOiK16qpccn6TlyTZJEj4VECm', 'admin'),
('Admin808812', 'Admin', 'admin@amulya.in', '$2b$10$0zaeFfMyS4/FLTN/YEWbD.2u4EqlNOiK16qpccn6TlyTZJEj4VECm', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `user_id` varchar(64) NOT NULL,
  `product_id` varchar(40) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  `last_modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`user_id`, `product_id`, `quantity`, `date_added`, `last_modified`) VALUES
('User144098', 'Product127537', 20, '2024-10-27 23:56:05', '2024-10-27 23:56:28'),
('User669558', 'Product127537', 3, '2024-10-20 12:47:47', '2024-10-20 12:52:57'),
('User669558', 'Product203415', 1, '2024-10-20 12:52:58', '2024-10-20 12:52:58'),
('User669558', 'Product259499', 1, '2024-10-20 12:52:58', '2024-10-20 12:52:58');

-- --------------------------------------------------------

--
-- Table structure for table `contact-us`
--

CREATE TABLE `contact-us` (
  `id` int(11) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone_num` int(12) NOT NULL,
  `message` varchar(250) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_id` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `product_id` varchar(40) NOT NULL,
  `payment_method` varchar(40) NOT NULL,
  `price` bigint(12) NOT NULL,
  `order_status` varchar(100) DEFAULT 'pending',
  `product_qty` int(2) NOT NULL,
  `order_added` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_id`, `email`, `product_id`, `payment_method`, `price`, `order_status`, `product_qty`, `order_added`) VALUES
(5, 'Order103262', 'tyagi.chirag1234@gmail.com', 'Product362323', 'online', 804, 'pending', 1, '2024-10-27'),
(13, 'Order205963', 'tyagi.chirag1234@gmail.com', 'Product127537', 'cash-on-delivery', 802, 'pending', 797, '2024-11-04'),
(12, 'Order236906', 'tyagi.chirag1234@gmail.com', 'Product333729', 'online', 291, 'pending', 1, '2024-11-04'),
(1, 'Order237433', 'tyagi.chirag1234@gmail.com', 'Product127537', 'online', 391, 'pending', 1, '2024-10-27'),
(7, 'Order237619', 'tyagi.chirag1234@gmail.com', 'Product336148', 'online', 1000, 'pending', 1, '2024-10-29'),
(14, 'Order502378', 'tyagi.chirag1234@gmail.com', 'Product127537', 'cash-on-delivery', 802, 'pending', 797, '2024-11-04'),
(6, 'Order506722', 'tyagi.chirag1234@gmail.com', 'Product336148', 'online', 1000, 'pending', 1, '2024-10-29'),
(11, 'Order697337', 'tyagi.chirag1234@gmail.com', 'Product203415', 'online', 304, 'pending', 1, '2024-10-29'),
(8, 'Order741383', 'tyagi.chirag1234@gmail.com', 'Product336148', 'online', 1000, 'pending', 1, '2024-10-29'),
(9, 'Order833942', 'tyagi.chirag1234@gmail.com', 'Product127537', 'online', 391, 'shipped', 1, '2024-10-29'),
(2, 'Order896386', 'tyagi.chirag1234@gmail.com', 'Product127537', 'online', 391, 'pending', 1, '2024-10-27'),
(3, 'Order899890', 'tyagi.chirag1234@gmail.com', 'Product440327', 'online', 404, 'pending', 1, '2024-10-27'),
(4, 'Order902052', 'tyagi.chirag1234@gmail.com', 'Product333729', 'online', 291, 'pending', 1, '2024-10-27'),
(10, 'Order988639', 'tyagi.chirag1234@gmail.com', 'Product203415', 'online', 304, 'processing', 1, '2024-10-29');

-- --------------------------------------------------------

--
-- Table structure for table `product_data`
--

CREATE TABLE `product_data` (
  `product_id` varchar(40) NOT NULL,
  `product_name` varchar(510) NOT NULL,
  `product_sales` int(11) NOT NULL DEFAULT 0,
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
  `product_media` varchar(500) DEFAULT NULL,
  `date_added` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_data`
--

INSERT INTO `product_data` (`product_id`, `product_name`, `product_sales`, `product_price`, `product_drop_price`, `product_discription`, `product_qty`, `product_status`, `product_discount`, `product_tax_class`, `product_tax_amount`, `product_raiting`, `product_img`, `product_media`, `date_added`) VALUES
('Product127537', 'Anumala Brand Yoga Design Tote Bag ǀ Jute Bag ǀ Hand bag ǀ Lunch Bag ǀ Multipurpose Bag ǀ Eco-friendly and Reusable Bag Pack Of 2', 2, '386', NULL, 'Care Instructions: Wipe with Dry Cloth\nANUMALA BRAND (Made In INDIA Product)\nSize: 1)Small(S) - LxWxH:8x4.5x9inch, 2)Medium(M) - 10x5x11inch, 3)Large(L) 12x5x14inch, 4)Extra Large(XL)- 12x5x17inch. Jute Bag with strong padded handle.\nBeautiful Multicolor Natural look Jute Lunch Bag, Suitable for function return gifts. Easily carry lunch box and water bottle inside.\nJUTE MATERIAL:- Laminated Interior for Extra strength and Water Resistance, Made from best quality natural Jute. Excellent quality stitching\nFEATURES: Natural Classy Style Jute Lunch Bag. Anti-slide zipper locks closure and two padded handle.', 1, 'published', '20%', 'taxable-goods', 10, NULL, 'https://server.server-anumala.co.in/uploads/1729090400432.jpg', 'https://server.server-anumala.co.in/uploads/1729090400433.jpg,https://server.server-anumala.co.in/uploads/1729090400433.jpg,https://server.server-anumala.co.in/uploads/1729090400435.jpg,https://server.server-anumala.co.in/uploads/1729090400436.jpg,https://server.server-anumala.co.in/uploads/1729090400437.jpg', '2024-10-16'),
('Product203415', 'Anumala®️ Eco-Friendly Jute Lunch Bag - Long Durable| Stylish with combinations| School and Picnics| reusable | Sustainable and Easy to Clean', 2, '299', NULL, 'Eco-Friendly Material: Made from 100% natural jute.\r\nDurable Design: Features strong padded handles and excellent quality stitching for long-lasting use.\r\nWater-Resistant Interior: Laminated interior provides extra strength and water resistance Multiple Sizes: Available in various sizes to suit different needs – M, L, XL\r\nStylish Look: Beautiful multicolor natural look, perfect for both casual and formal settings.\r\nFunctional: Ideal for carrying lunch boxes, water bottles, and other essentials. Suitable for work, school, picnics, and more.\r\nSecure Closure: Anti-slide zipper locks ensure your items stay securely inside\r\n', 8, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729089376201.jpg', 'https://server.server-anumala.co.in/uploads/1729089376201.jpg,https://server.server-anumala.co.in/uploads/1729089376202.jpg,https://server.server-anumala.co.in/uploads/1729089376204.jpg,https://server.server-anumala.co.in/uploads/1729089376205.jpg,https://server.server-anumala.co.in/uploads/1729089376205.jpg', '2024-10-16'),
('Product259499', 'Anumala® Earthly Elegance The Eco-Friendly Jute Tote Bags Beautiful Print for Return Gifts, Office, Grocery, Picnic, Tote, Tiffin, Shopping Wedding Return Gifts Jute bag Size-11x5x10 inch', 0, '745', NULL, 'Eco-Friendly Material: Crafted from natural jute fibers, our bags are a sustainable choice, reducing environmental impact.\r\nDurable and Sturdy: Reinforced stitching and robust construction ensure that our jute bags withstand daily use and carry heavy loads with ease.\r\nStylish and Versatile: Chic designs and neutral tones make these bags perfect for a variety of occasions, from shopping trips to beach outings.\r\nSpacious Interior: Ample room for all your essentials, groceries, or personal items, making it a practical and functional accessory.\r\nComfortable Handles: Ergonomically designed handles provide a comfortable grip, making it easy to carry your belongings on the go.\r\nBiodegradable: As a natural fiber, jute is biodegradable, offering an eco-friendly alternative to traditional plastic bags.', 10, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729070609067.jpg', 'https://server.server-anumala.co.in/uploads/1729070609068.jpg,https://server.server-anumala.co.in/uploads/1729070609068.jpg,https://server.server-anumala.co.in/uploads/1729070609069.jpg,https://server.server-anumala.co.in/uploads/1729070609071.jpg,https://server.server-anumala.co.in/uploads/1729070609072.jpg', '2024-10-16'),
('Product276106', 'Anumala®Jute Bags with MadhuBaani Print For Daily Use| Tote Bag with Two Pockets ǀ Lunch Bag ǀ Multipurpose Bag ǀ Reusable | Grocery |Return Gift | Multicolor (11x11x5) Inches…', 0, '449', NULL, 'Anumala jute bags are strong and sturdy, and can hold heavy items without tearing or breaking.\r\nIt also has two sturdy handles and two Pockets with zipper closure for comfortable carrying, allowing you to Segregate things and carry without clumsiness.\r\nThey are breathable and moisture-resistant, and can prevent mold and mildew growth.\r\nCOMPOSITION: Made of Jute Material which is durable, reusable, safe and environment friendly. The light-weight feature of the bag makes it a great help for transporting things from one place to another.\r\nJUTE MATERIAL:- Laminated Interior for Extra strength and Water Resistance, Made from best quality natural Jute. Excellent quality stitching.\r\nFEATURES: Natural Classy Style Jute Lunch Bag. Anti-slide zipper locks closure and two padded handle.', 10, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729090737984.jpg', 'https://server.server-anumala.co.in/uploads/1729090737985.jpg,https://server.server-anumala.co.in/uploads/1729090737986.jpg,https://server.server-anumala.co.in/uploads/1729090737990.jpg,https://server.server-anumala.co.in/uploads/1729090737991.jpg,https://server.server-anumala.co.in/uploads/1729090737993.jpg', '2024-10-16'),
('Product333729', 'Anumala® Non Woven Multipurpose gift Bags for Return Gifts | Thamboolam| Wedding Return Gifts | Birthday Return Gifts | Event Return gifts Bag | Beautiful Golden printed bags.(Pack of 05pcs) (M)', 1, '286', NULL, '- Anumala Brand Non woven fabric Gold printed Bags for return gift are the perfect choice for any occasion.\n- Anumala Brand Non woven Gold Print Bags are high-quality bags made of durable and eco-friendly material.\n- They come in various sizes and designs to suit your needs and preferences.\n- They are ideal for carrying groceries, gifts, clothes, books and more.- They are easy to fold, store and reuse.\n- Anumala Brand Non woven fabric Gold printed Bags for return gift are available at affordable prices and can be ordered online or offline.\n- These bags are made of high-quality non woven fabric that is durable, eco-friendly and easy to carry.\n- The gold printing adds a touch of elegance and sophistication to the bags, making them stand out from the crowd.\n- The bags come in various sizes, so you can choose the one that suits your needs and preferences.\n- Whether you want to pack sweets, chocolates, dry fruits, jewelry, cosmetics or any other gift item, these bags will make your guests feel special and appreciated.\n- Order now and impress your guests with these beautiful and classy bags!', 9, 'published', '0', 'tax-free', 21, NULL, 'https://server.server-anumala.co.in/uploads/1729089513874.jpg', 'https://server.server-anumala.co.in/uploads/1729089513874.jpg,https://server.server-anumala.co.in/uploads/1729089513874.jpg,https://server.server-anumala.co.in/uploads/1729089513875.jpg,https://server.server-anumala.co.in/uploads/1729089513876.jpg,https://server.server-anumala.co.in/uploads/1729089513877.jpg', '2024-10-16'),
('Product336148', 'Anumala® Jute Bags with Contrast Ganesh And Kolam Art | Thamboolam And Jute Bags|Wedding Return Gifts|Birthday Return Gifts|Event Return gifts Bag|Multicolor (10x8x4) inches Visit the Anumala Store', 0, '995', NULL, 'Brand	Anumala\r\nOccasion	Wedding, Birthday\r\nNumber of Items	1\r\nItem Form	Bag', 9, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729067430732.jpg', 'https://server.server-anumala.co.in/uploads/1729067430734.jpg,https://server.server-anumala.co.in/uploads/1729067430739.jpg,https://server.server-anumala.co.in/uploads/1729067430744.jpg,https://server.server-anumala.co.in/uploads/1729067430751.jpg,https://server.server-anumala.co.in/uploads/1729067430755.jpg', '2024-10-16'),
('Product362323', 'Anumala®Jute Bags with MadhuBaani Print for Daily use| Tote Bag with Two Pockets ǀ Lunch Bag ǀ Multipurpose Bag ǀ Reusable | Grocery |Return Gift | Multicolor (11x11x5) inches…', 0, '799', NULL, 'Anumala jute bags are strong and sturdy, and can hold heavy items without tearing or breaking.\r\nIt also has two sturdy handles and two Pockets with zipper closure for comfortable carrying, allowing you to Segregate things and carry without clumsiness.\r\nThey are breathable and moisture-resistant, and can prevent mold and mildew growth.\r\nCOMPOSITION: Made of Jute Material which is durable, reusable, safe and environment friendly. The light-weight feature of the bag makes it a great help for transporting things from one place to another.\r\nJUTE MATERIAL:- Laminated Interior for Extra strength and Water Resistance, Made from best quality natural Jute. Excellent quality stitching.\r\nFEATURES: Natural Classy Style Jute Lunch Bag. Anti-slide zipper locks closure and two padded handle.', 10, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729089893361.jpg', 'https://server.server-anumala.co.in/uploads/1729089893361.jpg,https://server.server-anumala.co.in/uploads/1729089893361.jpg,https://server.server-anumala.co.in/uploads/1729089893363.jpg,https://server.server-anumala.co.in/uploads/1729089893364.jpg,https://server.server-anumala.co.in/uploads/1729089893366.jpg', '2024-10-16'),
('Product440327', 'Anumala® Canvas Jute Bags with Tribal Print for Daily use| Tote Bag ǀ Jute Bag ǀ Lunch Bag ǀ Multipurpose Bag ǀ Reusable Bag | Return Gift | Multicolors | (10x11x5) inches…', 0, '399', NULL, 'Anumala canvas jute bags are strong and sturdy, and can hold heavy items without tearing or breaking.\r\nAnumala canvas jute bags are reusable and recyclable, and can help you save money and resources.\r\nThey are breathable and moisture-resistant, and can prevent mold and mildew growth.\r\nAnumala canvas jute bag is a stylish and eco-friendly accessory for everyday use that can hold your essentials and more.\r\nIt is made of high-quality canvas and jute materials that are durable, biodegradable and easy to wash, making it a sustainable choice for the environment.\r\nIt also has two sturdy handles and an adjustable shoulder strap for comfortable carrying, allowing you to switch between handbag and crossbody modes', 10, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729069931807.jpg', 'https://server.server-anumala.co.in/uploads/1729069931807.jpg,https://server.server-anumala.co.in/uploads/1729069931808.jpg,https://server.server-anumala.co.in/uploads/1729069931810.jpg,https://server.server-anumala.co.in/uploads/1729069931811.jpg,https://server.server-anumala.co.in/uploads/1729069931812.jpg', '2024-10-16'),
('Product440457', 'Anumala® Canvas Jute Bags with Tribal Print for Daily use| Tote Bag ǀ Jute Bag ǀ Lunch Bag ǀ Multipurpose Bag ǀ Reusable Bag | Return Gift | Multicolors | (10x11x5) inches…', 0, '399', NULL, 'Anumala canvas jute bags are strong and sturdy, and can hold heavy items without tearing or breaking.\r\nAnumala canvas jute bags are reusable and recyclable, and can help you save money and resources.\r\nThey are breathable and moisture-resistant, and can prevent mold and mildew growth.\r\nAnumala canvas jute bag is a stylish and eco-friendly accessory for everyday use that can hold your essentials and more.\r\nIt is made of high-quality canvas and jute materials that are durable, biodegradable and easy to wash, making it a sustainable choice for the environment.\r\nIt also has two sturdy handles and an adjustable shoulder strap for comfortable carrying, allowing you to switch between handbag and crossbody modes', 10, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729090879377.jpg', 'https://server.server-anumala.co.in/uploads/1729090879378.jpg,https://server.server-anumala.co.in/uploads/1729090879383.jpg,https://server.server-anumala.co.in/uploads/1729090879384.jpg,https://server.server-anumala.co.in/uploads/1729090879385.jpg,https://server.server-anumala.co.in/uploads/1729090879386.jpg', '2024-10-16'),
('Product444993', 'Anumala® Brand | Love Food Hate Waste & Yoga Design Tote Bag ǀ Jute Bag ǀ Hand bag ǀ Lunch Bag ǀ Multipurpose Jute Bag ǀ Resuable Bag | Return Gift Bag | Long Lasting Jute Bag | Pack of 2…', 0, '456', NULL, 'ANUMALA BRAND (Made In INDIA Product)\r\nSize: 1)Small(S) - LxWxH:8x4.5x9inch, 2)Medium(M) - 10x5x11inch, 3)Large(L) 12x5x14inch, 4)Extra Large(XL)- 12x5x17inch. Jute Bag with strong padded handle.\r\nBeautiful Multicolor Natural look Jute Lunch Bag, Suitable for function return gifts. Easily carry lunch box and water bottle inside.\r\nJUTE MATERIAL:- Laminated Interior for Extra strength and Water Resistance, Made from best quality natural Jute. Excellent quality stitching\r\nFEATURES: Natural Classy Style Jute Lunch Bag. Anti-slide zipper locks closure and two padded handle.\r\nCOMPOSITION: Made of Jute Material which is durable, reusable, safe and environment friendly. The light-weight feature of the bag makes it a great help for transporting things from one place to another.', 10, 'published', '0', 'taxable-goods', 11, NULL, 'https://server.server-anumala.co.in/uploads/1729090281828.jpg', 'https://server.server-anumala.co.in/uploads/1729090281830.jpg,https://server.server-anumala.co.in/uploads/1729090281831.jpg,https://server.server-anumala.co.in/uploads/1729090281831.jpg,https://server.server-anumala.co.in/uploads/1729090281833.jpg,https://server.server-anumala.co.in/uploads/1729090281833.jpg', '2024-10-16'),
('Product616193', 'Anumala® Eco-Friendly Multi-Printed Jute Bags |Tote Bags with Zippe |Perfect for Shopping, Return Gifts, Travel, grocery with Vibrant and Unique Patterns. (11x5x10) inches.', 0, '299', NULL, 'Eco-Friendly Material: Made from 100% natural jute, a biodegradable and sustainable resource.\r\nVibrant Multi-Print Design: Features a variety of colorful and unique prints, adding a touch of style to your everyday activities.\r\nDurable Construction: Strong and sturdy, designed to carry heavy loads without tearing or losing shape.\r\nSpacious Interior: Ample space for groceries, books, beach essentials, or travel items, making it versatile for various uses.\r\nComfortable Handles: Soft and ergonomic handles ensure a comfortable grip and easy carrying.\r\nLightweight and Portable: Easy to fold and store, perfect for on-the-go convenience.', 10, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729089204530.jpg', 'https://server.server-anumala.co.in/uploads/1729089204530.jpg,https://server.server-anumala.co.in/uploads/1729089204530.jpg,https://server.server-anumala.co.in/uploads/1729089204532.jpg,https://server.server-anumala.co.in/uploads/1729089204532.jpg,https://server.server-anumala.co.in/uploads/1729089204533.jpg', '2024-10-16'),
('Product671955', 'Anumala® Hand Made Multicolor Jute Sling Bags with Authentic Beads Art | Two Pockets with Zipper and Velcro Closures |For Daily Use |Phones| Wallets| Keys and Small Accessories (7X6X3) Inches', 0, '345', NULL, '1. Authentic Beads Art: Handcrafted with authentic Beads Design, each bag is a unique piece of traditional and Utility Fusion.\r\n2. Sustainable Jute Material: Eco-friendly and biodegradable jute material, making a positive impact on the environment.\r\n3. Zipper and Velcro Closures: Equipped with both zipper and Velcro closures for secure and convenient access to belongings.\r\n4. Versatile Design: Versatile sling bag suitable for various occasions, from casual outings to special events.\r\n5. Compact Size (7X6X3 inches): Small and Handy Perfectly sized for on-the-go convenience without sacrificing style or functionality. Easy to carry, Making it a practical and stylish accessory for everyday use.\r\n6. Ethical Artisan Craftsmanship: Handcrafted by skilled artisans, supporting ethical and fair-trade practices. Unique multicolor design adds a pop of color to your outfit, making a fashion statement', 10, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729089765855.jpg', 'https://server.server-anumala.co.in/uploads/1729089765855.jpg,https://server.server-anumala.co.in/uploads/1729089765855.jpg,https://server.server-anumala.co.in/uploads/1729089765856.jpg,https://server.server-anumala.co.in/uploads/1729089765857.jpg,https://server.server-anumala.co.in/uploads/1729089765857.jpg', '2024-10-16'),
('Product689055', 'Anumala® Return Gift Jute and Canvas Bags with Contrast Prints | Multicolor Bags with Zipper|Event Return gifts |Multipurpose Bags for All Occasions.', 0, '249', NULL, '1.Eco-friendly materials: Crafted from natural jute fibers and sturdy canvas, ensuring sustainability and minimal environmental impact.\r\n2.Durable construction: Designed to withstand the rigors of daily use, ensuring longevity and reliability.\r\n3.Versatile sizing: Available in a range of sizes to accommodate various gift items, from small trinkets to larger presents.\r\n4.Stylish designs: Featuring intricate patterns, vibrant colors, and elegant motifs, adding a touch of sophistication to any gift-giving occasion.\r\n5.Customization options: Offer the flexibility to personalize bags with logos, names, or event details, creating a unique and memorable gift experience.\r\n6.Comfortable handles: Ergonomically designed handles for easy carrying, making them convenient for recipients to transport their gifts.\r\n\r\nPack Of 2 Pack Of 5 Pack Of 10 Pack Of 15 Pack Of 20 Pack Of 25 Pack Of 30 Pack Of 35 Pack Of 40 Pack Of 45 Pack Of 50', 10, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729068099289.jpg', 'https://server.server-anumala.co.in/uploads/1729068099290.jpg,https://server.server-anumala.co.in/uploads/1729068099293.jpg,https://server.server-anumala.co.in/uploads/1729068099294.jpg,https://server.server-anumala.co.in/uploads/1729068099300.jpg,https://server.server-anumala.co.in/uploads/1729068099301.jpg', '2024-10-16'),
('Product758775', 'Anumala® Handmade Jute Hand Bag |Two Pockets with Zipper| For Office| Fashion| Grocery| Beach| Travel Companion Style for Every Occasion| Fashion for the Conscious Trendsetter.', 10, '389', NULL, 'Eco-friendly Material: Crafted from natural jute fibers, our handbag promotes sustainable fashion and reduces environmental impact.\nDurable Construction: Designed for long-lasting use, our jute handbag features sturdy stitching and reinforced handles for added strength.\nSpacious Interior: With ample room for essentials, including wallets, phones, keys, and more, it\'s perfect for daily use or outings.\nStylish Design: Combining rustic charm with contemporary flair, our handbag adds a touch of natural elegance to any outfit.\nVersaSuitable for All Occasions: From casual outings to formal events, its versatile design complements a variety of outfits and settings.tile Carry Options: Equipped with comfortable cotton handles, it offers multiple carrying options, whether by hand or over the shoulder.\nInner Organization: Stay organized on the go with convenient inner pockets for storing smaller items securely.', 20, 'published', '0', 'tax-free', 12, NULL, 'https://server.server-anumala.co.in/uploads/1729089662873.jpg', 'https://server.server-anumala.co.in/uploads/1729089662873.jpg,https://server.server-anumala.co.in/uploads/1729089662875.jpg,https://server.server-anumala.co.in/uploads/1729089662876.jpg,https://server.server-anumala.co.in/uploads/1729089662877.jpg,https://server.server-anumala.co.in/uploads/1729089662877.jpg', '2024-10-16'),
('Product758834', 'Anumala® Handmade Thread Crafted Jute Bag with Zipper and Mobile Pocket| For Shopping| Beach| Travel| for Every Occasion |Crafted with Commitment to Environment| 13x5x13In.', 0, '349', NULL, 'Premium Quality Jute: Crafted from high-grade, sustainably sourced jute fibers for durability and eco-friendliness.\r\nUnique Designs: An array of exclusive designs, from timeless classics to trendy patterns, catering to diverse tastes.\r\nDurable Construction: Sturdy stitching and reinforced handles for long-lasting durability, making them reliable companions for daily use.\r\nSpacious Interior: Ample room to accommodate your essentials, perfect for shopping trips, beach outings, or travel adventures.\r\nVersatile Functionality: Equipped with zipper closures and multiple pockets, including mobile pockets, for secure organization and easy access to belongings.\r\nLightweight and Portable: Designed for effortless carrying, allowing you to comfortably tote your belongings wherever you go.\r\nCraftedJuteBag_1PC 349.00\r\nCraftedJuteBag_2PCS ₹549.00\r\nCraftedJuteBag_4PCS ₹1,149.00\r\nCraftedJuteBag_6PCS ₹1,749.00\r\nCraftedJuteBag_8PCS ₹2,349.00\r\nCraftedJuteBag_10PCS ₹2,949.00', 10, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729069592099.jpg', 'https://server.server-anumala.co.in/uploads/1729069592099.jpg,https://server.server-anumala.co.in/uploads/1729069592099.jpg,https://server.server-anumala.co.in/uploads/1729069592100.jpg,https://server.server-anumala.co.in/uploads/1729069592101.jpg,https://server.server-anumala.co.in/uploads/1729069592101.jpg', '2024-10-16'),
('Product800515', 'Anumala® Hand Printed Multicolor Stripe Designed Jute and Canvas Material Bags| Printed Bags with Zipper| for Multipurpose| Lunch| Return Gifts| Picnic| Shopping Juco bags (11x5x10) inches. 2pcs Combo', 0, '447', NULL, 'Eco-Friendly Materials: Anumala Jute and Canvas Material Bags are crafted from sustainable jute and canvas, offering an environmentally conscious alternative to traditional bag materials\r\nDurable Construction: These bags are designed with sturdy construction, ensuring durability and longevity for everyday use.\r\nVersatile Design: The versatile design of Anumala bags makes them suitable for various purposes, including shopping, commuting, traveling, and more.\r\nSpacious Interior: With ample interior space, these bags provide room for all your essentials, from groceries to office supplies, making them ideal for daily errands.\r\nStylish Appearance: Featuring a blend of jute and canvas materials, Anumala bags exude a stylish and timeless aesthetic, suitable for both casual and formal occasions.\r\nLightweight Feel: Despite their sturdy construction, Anumala bags maintain a lightweight feel, ensuring comfortable carrying without adding unnecessary bulk', 10, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729070186046.jpg', 'https://server.server-anumala.co.in/uploads/1729070186049.jpg,https://server.server-anumala.co.in/uploads/1729070186050.jpg,https://server.server-anumala.co.in/uploads/1729070186052.jpg,https://server.server-anumala.co.in/uploads/1729070186052.jpg,https://server.server-anumala.co.in/uploads/1729070186053.jpg', '2024-10-16'),
('Product831956', 'Anumala® Jute Bags with Contrast Ganesh And Kolam Art | Thamboolam And Jute Bags|Wedding Return Gifts|Birthday Return Gifts|Event Return gifts Bag|Multicolor (10x8x4) inches', 0, '497', NULL, 'Anumala Premium Quality Jute Bags with contrast Ganesh and Kolam print\r\nSize : 10*04*08 inches\r\nMulticolored suitable for gifts\r\nCan be used for Return gifts/ Thamboolam bags/ wedding gifts/ Birthday Gifts/ Pooja return gift\r\nSuitable for office lunch box\r\nECO-FRIENDLY MATERIAL: Made from Natural Jute material, 100% bio degradable and Strong natural weaved Jute material with high durability and Bio-Degradable\r\nPADDED HANDLE : Made with premium cotton twill tapes for more comfort\r\nCare Instructions: Wipe with Damp Cloth\r\nReturn Gifts For Women Pooja, Birthday, House Warming Gift Bags.\r\nAll Type of Return Gift Bags', 10, 'published', '0', 'tax-free', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729067074068.jpg', 'https://server.server-anumala.co.in/uploads/1729067074073.jpg,https://server.server-anumala.co.in/uploads/1729067074401.jpg,https://server.server-anumala.co.in/uploads/1729067074405.jpg,https://server.server-anumala.co.in/uploads/1729067074444.jpg,https://server.server-anumala.co.in/uploads/1729067074449.jpg', '2024-10-16'),
('Product955709', 'Anumala® Eco-Friendly Jute Bags with Zipper| Organic Tote Bags Elegantly Printed for Return Gifts, Office, Grocery, Picnic, Tiffin, Shopping, Wedding Return Gifts| Size-11x5x10 inches', 0, '549', NULL, 'Eco-Friendly Materials: Anumala Jute and Canvas Material Bags are crafted from sustainable jute and canvas, offering an environmentally conscious alternative to traditional bag materials\r\nDurable Construction: These bags are designed with sturdy construction, ensuring durability and longevity for everyday use.\r\nVersatile Design: The versatile design of Anumala bags makes them suitable for various purposes, including shopping, commuting, traveling, and more.\r\nSpacious Interior: With ample interior space, these bags provide room for all your essentials, from groceries to office supplies, making them ideal for daily errands.\r\nStylish Appearance: Featuring a blend of jute and canvas materials, Anumala bags exude a stylish and timeless aesthetic, suitable for both casual and formal occasions.\r\nLightweight Feel: Despite their sturdy construction, Anumala bags maintain a lightweight feel, ensuring comfortable carrying without adding unnecessary bulk\r\nPack of 50 Pack of 5 Pack of 10 Pack of 15 Pack of 20 Pack of 25 Pack of 30 Pack of 35 Pack of 40 Pack of 45 Pack of 50 ', 10, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729067830450.jpg', 'https://server.server-anumala.co.in/uploads/1729067830454.jpg,https://server.server-anumala.co.in/uploads/1729067830454.jpg,https://server.server-anumala.co.in/uploads/1729067830456.jpg,https://server.server-anumala.co.in/uploads/1729067830457.jpg,https://server.server-anumala.co.in/uploads/1729067830459.jpg', '2024-10-16'),
('Product974780', 'Anumala® Brand | Love Food Hate Waste Design Tote Bag ǀ Jute Bag ǀ Hand bag ǀ Lunch Bag ǀ Multipurpose Jute Bag ǀ Resuable Bag | Return Gift Bag | Long Lasting Jute Bag', 0, '246', NULL, 'Care Instructions Of Love Food Hate Waste Printed Jute Bag: Wipe with Damp Cloth\r\nANUMALA BRAND (Made In INDIA Product)\r\nSize: 1)Small(S) - LxWxH:8x4.5x9inch, 2)Medium(M) - 10x5x11inch, 3)Large(L) 12x5x14inch, 4)Extra Large(XL)- 12x5x17inch. Jute Bag with strong padded handle.\r\nBeautiful Multicolor Natural look Jute Lunch Bag, Suitable for function return gifts. Easily carry lunch box and water bottle inside.\r\nJUTE MATERIAL:- Laminated Interior for Extra strength and Water Resistance, Made from best quality natural Jute. Excellent quality stitching\r\nFEATURES: Natural Classy Style Jute Lunch Bag. Anti-slide zipper locks closure and two padded handle.', 10, 'published', '0', 'taxable-goods', 1, NULL, 'https://server.server-anumala.co.in/uploads/1729090185359.jpg', 'https://server.server-anumala.co.in/uploads/1729090185360.jpg,https://server.server-anumala.co.in/uploads/1729090185361.jpg,https://server.server-anumala.co.in/uploads/1729090185362.jpg,https://server.server-anumala.co.in/uploads/1729090185362.jpg,https://server.server-anumala.co.in/uploads/1729090185363.jpg', '2024-10-16');

-- --------------------------------------------------------

--
-- Table structure for table `refund`
--

CREATE TABLE `refund` (
  `refund_id` varchar(20) NOT NULL,
  `order_id` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `refund_reason` varchar(100) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refund`
--

INSERT INTO `refund` (`refund_id`, `order_id`, `email`, `refund_reason`, `date_added`) VALUES
('Refund196517', 'Order205963', 'tyagi.chirag1234@gmail.com', 'ssasa', '2024-11-08 06:51:36'),
('Refund617324', 'Order502378', 'tyagi.chirag1234@gmail.com', 'sex', '2024-11-08 06:54:58'),
('Refund836030', 'Order236906', 'tyagi.chirag1234@gmail.com', 'esx', '2024-11-08 06:52:39'),
('Refund925966', 'Order899890', 'tyagi.chirag1234@gmail.com', 'refund', '2024-11-08 06:56:26');

-- --------------------------------------------------------

--
-- Table structure for table `support_center`
--

CREATE TABLE `support_center` (
  `id` int(11) NOT NULL,
  `email` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `message` text NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `marketing_accept` tinyint(1) DEFAULT 0,
  `phone_Number` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `email`, `password`, `first_name`, `last_name`, `address`, `marketing_accept`, `phone_Number`) VALUES
('User144098', 'tyagi.chirag1234@gmail.com', '$2b$10$U.7nBpUrDPlgbk.TYwMJFOqdi06DopVYh3cvFLIced.9zans2gAiK', 'CHIRAG', 'TYAGI', '58A GALI NO 3\nJAMUNA VIHAR KHATAULI', 0, 8650295888),
('User303849', 'abesit.darshil@gmail.com', '$2b$10$pk6aKHzhBEhbG3lbJqvUl.910rzZK6dyouIYT5yKnz/A0tpR9Decy', '12', '34', NULL, 0, 7678163042),
('User474236', 'abesit.chirag@gmail.com', '$2b$10$.lPI7A2nkIjZaliI/L86Q.gXufIQET96871IPgnoyZiKpUBf0/mmq', 'CHIRAG', 'TYAGI', NULL, 0, 8650295888),
('User669558', 'hill@gmail.com', '$2b$10$deKY1RwKJ6GTwhetdy.LnOYnHmoSZlMM6/Qkpccm/CSzySQ7Y..6G', 'Darshil', 'Kumar', NULL, 0, 7678163042);

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
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`user_id`,`product_id`);

--
-- Indexes for table `contact-us`
--
ALTER TABLE `contact-us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `product_data`
--
ALTER TABLE `product_data`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `refund`
--
ALTER TABLE `refund`
  ADD PRIMARY KEY (`refund_id`),
  ADD UNIQUE KEY `order_id` (`order_id`);

--
-- Indexes for table `support_center`
--
ALTER TABLE `support_center`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact-us`
--
ALTER TABLE `contact-us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `support_center`
--
ALTER TABLE `support_center`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
