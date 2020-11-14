-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2020 at 02:38 PM
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
-- Database: `job_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` int(50) NOT NULL,
  `compName` varchar(255) NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `jobLoc` varchar(255) NOT NULL,
  `salary` int(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`id`, `compName`, `jobTitle`, `jobLoc`, `salary`, `user_id`) VALUES
(1, 'softBD', 'Software Engineer', 'Banani, Dhaka', 30000, 2),
(2, 'Summer', 'Engineer', 'Uttara', 30000, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `empName` varchar(255) NOT NULL,
  `compName` varchar(255) NOT NULL,
  `conctNo` varchar(255) NOT NULL,
  `jobTitle` varchar(255) DEFAULT NULL,
  `jobLoc` varchar(50) DEFAULT NULL,
  `salary` int(255) DEFAULT NULL,
  `userRoll` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `empName`, `compName`, `conctNo`, `jobTitle`, `jobLoc`, `salary`, `userRoll`) VALUES
(1, 'saqib', '123', 'Saqib Aminul', 'softDev', '01821500050', 'management', 'mohakhali Dhaka', 25000, 'admin'),
(2, 'aminul', '123', 'aminul islam', 'softify', '017546982', 'Senior Engineer', 'Uttara, Dhaka', 60000, 'employee'),
(3, 'akib14', '147', 'akib islam', 'theoryPi', '017644647', NULL, NULL, NULL, 'employee'),
(5, 'siam21', '159', 'siam ahmed', 'Theory', '01733505', NULL, NULL, NULL, 'employee'),
(7, 'aminul', '132', 'aminul islam', 'saqib-29', '01733505', NULL, NULL, NULL, 'employee');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_ibfk_1` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `job`
--
ALTER TABLE `job`
  ADD CONSTRAINT `job_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
