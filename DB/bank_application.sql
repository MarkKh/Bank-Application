-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2023 at 12:15 AM
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
-- Database: `bank_application`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(10) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `balance` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `name`, `address`, `username`, `password`, `balance`) VALUES
(1162998731, 'kirana jasmine chewter', 'UK', 'kirana@example.com', '$2b$10$X6ZcdU8QEHAKLOdKH3VeTunHMaVdFTJYua0X5VK3Rre9hXFoDlERi', 0.00),
(1163468509, 'Anntonia porsild', 'Korat', 'annto@example.com', '$2b$10$ud.FziqtyUMrz0ZZ4Dgj2OWaCbaD9q6TkH534TZQ.mmLyoJyGC.oK', 0.00),
(1171509028, 'Sarah Miller', '456 Elm St', 'sarah@example.com', '$2b$10$psapvQOB6xCETNsuVRjBcu1xnSS5F5zgL2Z5ZcTvjWDFk7D8QNbZG', 28730.00),
(1234567890, 'John Wick', 'Monor St, City', 'johndoe@example.com', '$2b$10$06YmVt7f79ZWcODR3awEdOirnrISJ.3zThFeXmbewHDWb2qidppQS', 10050.00),
(1963827411, 'Alice Johnson', '456 Elm St', 'alice@example.com', '$2b$10$y9cmq6n.nGC9AMLokCrU8.qdnrLsm.EmauLvTNFtlIpGgaX6sOHY.', 30490.00),
(1970846206, 'Michael Johnson', '567 Pine St', 'michael@example.com', '$2b$10$va05a/rrOZoIIlL31iGyRO7dYS9v9soaewuZFunNyqb5sze3Uw/JC', 46600.00),
(2147483647, 'Emily Brown', '234 Maple Ave', 'emily@example.com', '$2b$10$GU/n.IYIqjg6VNTemtKZgeF5tSGoXdITKdCqgSbcUJY7acvwVJg7K', 43030.00);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `account_id` int(10) DEFAULT NULL,
  `transaction_type` enum('Deposit','Withdrawal') DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `account_id`, `transaction_type`, `amount`, `timestamp`) VALUES
(1, 1234567890, 'Deposit', 5000.00, '2023-08-20 20:34:06'),
(2, 1234567890, 'Deposit', 6000.00, '2023-08-20 20:34:12'),
(3, 1234567890, 'Withdrawal', 400.00, '2023-08-20 20:34:18'),
(4, 1234567890, 'Withdrawal', 600.00, '2023-08-20 20:34:25'),
(5, 1171509028, 'Deposit', 15000.00, '2023-08-20 20:34:48'),
(6, 1171509028, 'Withdrawal', 2000.00, '2023-08-20 20:34:55'),
(7, 1171509028, 'Withdrawal', 500.00, '2023-08-20 20:35:02'),
(8, 1171509028, 'Deposit', 7000.00, '2023-08-20 20:35:11'),
(9, 1963827411, 'Deposit', 47000.00, '2023-08-20 20:35:46'),
(10, 1963827411, 'Withdrawal', 5000.00, '2023-08-20 20:35:52'),
(11, 1970846206, 'Deposit', 50000.00, '2023-08-20 20:36:32'),
(12, 1970846206, 'Deposit', 1000.00, '2023-08-20 20:36:39'),
(13, 1970846206, 'Withdrawal', 6000.00, '2023-08-20 20:36:45'),
(14, 1970846206, 'Withdrawal', 600.00, '2023-08-20 20:36:59'),
(15, 2147483647, 'Deposit', 3000.00, '2023-08-20 20:37:38'),
(16, 2147483647, 'Deposit', 40000.00, '2023-08-20 20:37:44'),
(17, 2147483647, 'Withdrawal', 600.00, '2023-08-20 20:37:50'),
(18, 2147483647, 'Deposit', 900.00, '2023-08-20 20:37:56'),
(19, 2147483647, 'Withdrawal', 300.00, '2023-08-20 20:39:24'),
(20, 1963827411, 'Deposit', 100.00, '2023-08-20 22:00:53'),
(21, 1963827411, 'Withdrawal', 100.00, '2023-08-20 22:01:00');

-- --------------------------------------------------------

--
-- Table structure for table `transfers`
--

CREATE TABLE `transfers` (
  `transfer_id` int(11) NOT NULL,
  `sender_account_id` int(10) DEFAULT NULL,
  `receiver_account_id` int(10) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `sender_remain` decimal(10,2) DEFAULT NULL,
  `receiver_remain` decimal(10,2) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transfers`
--

INSERT INTO `transfers` (`transfer_id`, `sender_account_id`, `receiver_account_id`, `amount`, `sender_remain`, `receiver_remain`, `timestamp`) VALUES
(1, 2147483647, 1171509028, 500.00, 42500.00, 20000.00, '2023-08-20 20:39:55'),
(2, 2147483647, 1234567890, 600.00, 41900.00, 10600.00, '2023-08-20 20:40:34'),
(3, 2147483647, 1970846206, 800.00, 41100.00, 45200.00, '2023-08-20 20:40:57'),
(4, 1970846206, 1963827411, 2000.00, 43200.00, 44000.00, '2023-08-20 20:41:46'),
(5, 1970846206, 1171509028, 400.00, 42800.00, 20400.00, '2023-08-20 20:42:07'),
(6, 1970846206, 1234567890, 600.00, 42200.00, 11200.00, '2023-08-20 20:42:19'),
(7, 1970846206, 2147483647, 1000.00, 41200.00, 42100.00, '2023-08-20 20:42:32'),
(8, 1963827411, 2147483647, 400.00, 43600.00, 42500.00, '2023-08-20 20:43:51'),
(9, 1963827411, 1970846206, 5000.00, 38600.00, 46200.00, '2023-08-20 20:43:59'),
(10, 1963827411, 1171509028, 8000.00, 30600.00, 28400.00, '2023-08-20 20:44:06'),
(11, 1963827411, 1234567890, 90.00, 30510.00, 11290.00, '2023-08-20 20:44:19'),
(12, 1234567890, 1970846206, 400.00, 10890.00, 46600.00, '2023-08-20 20:44:47'),
(13, 1234567890, 1171509028, 900.00, 9990.00, 29300.00, '2023-08-20 20:45:02'),
(14, 1234567890, 2147483647, 50.00, 9940.00, 42550.00, '2023-08-20 20:45:11'),
(15, 1234567890, 1171509028, 590.00, 9350.00, 29890.00, '2023-08-20 20:45:23'),
(16, 1171509028, 2147483647, 460.00, 29430.00, 43010.00, '2023-08-20 20:46:02'),
(17, 1171509028, 1234567890, 700.00, 28730.00, 10050.00, '2023-08-20 20:46:08'),
(18, 1963827411, 2147483647, 20.00, 30490.00, 43030.00, '2023-08-20 22:00:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `account_id` (`account_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `transfers`
--
ALTER TABLE `transfers`
  ADD PRIMARY KEY (`transfer_id`),
  ADD KEY `sender_account_id` (`sender_account_id`),
  ADD KEY `receiver_account_id` (`receiver_account_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `transfers`
--
ALTER TABLE `transfers`
  MODIFY `transfer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);

--
-- Constraints for table `transfers`
--
ALTER TABLE `transfers`
  ADD CONSTRAINT `transfers_ibfk_1` FOREIGN KEY (`sender_account_id`) REFERENCES `accounts` (`account_id`),
  ADD CONSTRAINT `transfers_ibfk_2` FOREIGN KEY (`receiver_account_id`) REFERENCES `accounts` (`account_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
