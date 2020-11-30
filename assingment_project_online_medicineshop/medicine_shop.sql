-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2020 at 04:06 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medicine_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(50) NOT NULL,
  `medicine_id` int(50) NOT NULL,
  `medicine_name` varchar(255) NOT NULL,
  `quantity` int(50) NOT NULL,
  `price` int(50) NOT NULL,
  `customer_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `medicine_id`, `medicine_name`, `quantity`, `price`, `customer_id`) VALUES
(5, 3, 'Napa extra', 2, 140, 2),
(6, 4, 'Lubilux', 4, 240, 2),
(10, 3, 'Napa extra', 12, 840, 2);

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `id` int(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `availability` int(11) NOT NULL,
  `price` int(50) NOT NULL,
  `category` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `vendor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`id`, `name`, `availability`, `price`, `category`, `type`, `vendor`) VALUES
(1, 'Napa extend', 8, 80, 'paracetanol', 'solid', 'Beximco Pharma'),
(2, 'Napa extra', 1000, 70, 'paracetanol', 'solid', 'Beximco Pharma'),
(3, 'Napa extra', 202, 70, 'paracetanol', 'solid', 'ACI'),
(4, 'Lubilux', 414000, 60, 'Arsenal', 'solid', 'Beximco Pharma');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_number` varchar(255) NOT NULL,
  `medicine_name` varchar(255) NOT NULL,
  `quantity` int(50) NOT NULL,
  `price` int(50) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `customer_number`, `medicine_name`, `quantity`, `price`, `date`) VALUES
(2, 'saqib', '+8801821500050', 'Napa Extra', 2, 160, '2020-11-28'),
(3, 'saqib', '+8801821500050', 'Napa Extra', 2, 160, '2020-11-28'),
(4, 'saqib', '+880121500080', 'Lubilux', 1, 60, '2020-11-29'),
(10, 'saqib', '+880121500080', 'Napa extend', 2, 160, '2020-11-30');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_list`
--

CREATE TABLE `purchase_list` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(11) NOT NULL,
  `customer_number` int(11) NOT NULL,
  `medicine_name` varchar(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchase_list`
--

INSERT INTO `purchase_list` (`id`, `customer_name`, `customer_number`, `medicine_name`, `quantity`, `price`, `date`) VALUES
(1, 'saqib', 45575114, 'Napa Extend', 1, 80, '2020-11-27'),
(2, 'saqib', 2147483647, 'Napa extend', 2, 160, '2020-11-30'),
(3, 'saqib', 2147483647, 'Lubilux', 12, 720, '2020-11-30'),
(4, 'saqib', 2147483647, 'Napa extend', 2, 160, '2020-11-30'),
(5, 'saqib', 2147483647, 'Lubilux', 20, 1200, '2020-11-30');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `user_roll` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `contact`, `address`, `user_roll`) VALUES
(1, 'saqib', '123456', '+8801821500050', 'Dhaka, Bangladesh', 'admin'),
(2, 'saqib', '456123', '+880121500080', 'Narayanganj, Bangladesh', 'customer'),
(3, 'ashim', '741236', '1444565242', 'Dhaka, Bangladesh', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_list`
--
ALTER TABLE `purchase_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `purchase_list`
--
ALTER TABLE `purchase_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
