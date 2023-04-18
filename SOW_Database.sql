-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 18, 2023 at 01:02 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stacks_of_wax`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `album_id` int(11) NOT NULL,
  `album_name` varchar(255) NOT NULL,
  `album_year` year(4) NOT NULL,
  `artist_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL,
  `subgenre_id` int(11) DEFAULT NULL,
  `subgenre2_id` int(11) DEFAULT NULL,
  `record_company_id` int(11) NOT NULL,
  `album_art` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`album_id`, `album_name`, `album_year`, `artist_id`, `genre_id`, `subgenre_id`, `subgenre2_id`, `record_company_id`, `album_art`) VALUES
(1, 'Dark Side of the Moon', 1973, 1, 1, 3, 2, 1, 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png?20190214233854'),
(2, 'Rumours', 1977, 2, 4, 2, 5, 2, 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'),
(3, 'Born to Run', 1975, 3, 6, 7, 2, 3, 'https://upload.wikimedia.org/wikipedia/en/7/7a/Born_to_Run_%28Front_Cover%29.jpg'),
(4, 'Hotel California', 1976, 4, 6, 8, NULL, 4, 'https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg'),
(5, 'Led Zeppelin IV', 1971, 5, 9, 10, 6, 5, 'https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg'),
(6, 'Sticky Fingers', 1971, 6, 6, 10, 2, 6, 'https://upload.wikimedia.org/wikipedia/en/5/57/The_Rolling_Stones_-_Sticky_Fingers.png'),
(7, 'Court and Spark', 1974, 7, 11, 12, NULL, 4, 'https://upload.wikimedia.org/wikipedia/en/8/83/Courtandspark.jpeg'),
(8, 'Aja', 1977, 8, 12, 4, NULL, 7, 'https://upload.wikimedia.org/wikipedia/en/4/49/Aja_album_cover.jpg'),
(9, 'Songs in the Key of Life', 1976, 9, 13, 14, 5, 8, 'https://upload.wikimedia.org/wikipedia/en/e/e2/Songs_in_the_key_of_life.jpg'),
(10, 'Parallel Lines', 1978, 10, 15, 16, 5, 9, 'https://upload.wikimedia.org/wikipedia/en/4/48/Blondie_-_Parallel_Lines.png'),
(11, 'By The Way', 2002, 11, 17, 37, 4, 2, 'https://upload.wikimedia.org/wikipedia/en/2/23/Rhcp9.jpg'),
(12, 'Thriller', 1982, 12, 5, 14, NULL, 10, 'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png'),
(13, 'Purple Rain', 1984, 13, 5, 14, NULL, 2, 'https://upload.wikimedia.org/wikipedia/en/9/9c/Princepurplerain.jpg'),
(14, 'The Joshua Tree', 1987, 14, 6, 17, 4, 11, 'https://upload.wikimedia.org/wikipedia/en/6/6b/The_Joshua_Tree.png'),
(15, 'Appetite for Destruction', 1987, 15, 9, 18, NULL, 12, 'https://upload.wikimedia.org/wikipedia/en/6/60/GunsnRosesAppetiteforDestructionalbumcover.jpg'),
(16, 'Synchronicity', 1983, 16, 6, 15, NULL, 13, 'https://upload.wikimedia.org/wikipedia/en/7/7f/Police-album-synchronicity.jpg'),
(17, 'Born in the U.S.A.', 1984, 3, 6, 7, NULL, 3, 'https://upload.wikimedia.org/wikipedia/en/3/31/BruceBorn1984.JPG'),
(18, 'Like a Prayer', 1989, 18, 5, 19, NULL, 15, 'https://upload.wikimedia.org/wikipedia/en/0/08/Madonna_-_Like_a_Prayer_album.png'),
(19, 'Hysteria', 1987, 19, 6, 9, NULL, 16, 'https://upload.wikimedia.org/wikipedia/en/4/40/Def_Leppard_-_Hysteria_%28vinyl_version%29.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `artist`
--

CREATE TABLE `artist` (
  `artist_id` int(11) NOT NULL,
  `artist_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `artist`
--

INSERT INTO `artist` (`artist_id`, `artist_name`) VALUES
(10, 'Blondie'),
(3, 'Bruce Springsteen'),
(19, 'Def Leppard'),
(2, 'Fleetwood Mac'),
(15, 'Guns N\' Roses'),
(7, 'Joni Mitchell'),
(5, 'Led Zeppelin'),
(18, 'Madonna'),
(12, 'Michael Jackson'),
(1, 'Pink Floyd'),
(13, 'Prince and The Revolution'),
(11, 'Red Hot Chili Peppers'),
(8, 'Steely Dan'),
(9, 'Stevie Wonder'),
(4, 'The Eagles'),
(16, 'The Police'),
(6, 'The Rolling Stones'),
(14, 'U2');

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `genre_id` int(11) NOT NULL,
  `genre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`genre_id`, `genre`) VALUES
(17, 'Alternative Rock'),
(26, 'Art Rock'),
(25, 'Baroque Pop'),
(10, 'Blues Rock'),
(8, 'Country Rock'),
(19, 'Dance-Pop'),
(35, 'Dark hip hop'),
(34, 'East Coast hip hop'),
(23, 'Electronic'),
(11, 'Folk Rock'),
(14, 'Funk'),
(38, 'Funk Pop'),
(37, 'Funk Rock'),
(31, 'G-funk'),
(30, 'Grunge'),
(9, 'Hard Rock'),
(7, 'Heartland Rock'),
(18, 'Heavy Metal'),
(32, 'Hip hop'),
(36, 'Indie'),
(12, 'Jazz Fusion'),
(24, 'Modal Jazz'),
(15, 'New Wave'),
(5, 'Pop'),
(21, 'Pop folk'),
(4, 'Pop Rock'),
(16, 'Power Pop'),
(1, 'Progressive Rock'),
(29, 'Psychedelic Pop'),
(3, 'Psychedelic Rock'),
(33, 'R&B'),
(6, 'Rock'),
(2, 'Soft Rock'),
(13, 'Soul'),
(22, 'Synthpop'),
(20, 'Worldbeat');

-- --------------------------------------------------------

--
-- Table structure for table `record_company`
--

CREATE TABLE `record_company` (
  `record_company_id` int(11) NOT NULL,
  `record_company` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `record_company`
--

INSERT INTO `record_company` (`record_company_id`, `record_company`) VALUES
(1, ' Harvest, Capitol'),
(13, 'A&M'),
(7, 'ABC'),
(4, 'Asylum'),
(5, 'Atlantic'),
(9, 'Chrysalis'),
(3, 'Columbia'),
(10, 'Epic'),
(12, 'Geffen'),
(11, 'Island'),
(16, 'Mercury'),
(6, 'Rolling Stones Records'),
(15, 'Sire'),
(8, 'Tamla'),
(2, 'Warner Bros.');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `rating` tinyint(1) NOT NULL,
  `comment` text,
  `time_posted` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

CREATE TABLE `song` (
  `song_id` int(11) NOT NULL,
  `song_name` varchar(255) NOT NULL,
  `song_duration` time NOT NULL,
  `album_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_album`
--

CREATE TABLE `user_album` (
  `user_album_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`album_id`),
  ADD KEY `FK_artist_artist_id` (`artist_id`),
  ADD KEY `FK_genre_genre_id1` (`genre_id`),
  ADD KEY `FK_genre_genre_id2` (`subgenre_id`),
  ADD KEY `FK_genre_genre_id3` (`subgenre2_id`),
  ADD KEY `FK_record_company_record_company_id` (`record_company_id`);

--
-- Indexes for table `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`artist_id`),
  ADD UNIQUE KEY `artist_name` (`artist_name`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`genre_id`),
  ADD UNIQUE KEY `genre` (`genre`);

--
-- Indexes for table `record_company`
--
ALTER TABLE `record_company`
  ADD PRIMARY KEY (`record_company_id`),
  ADD UNIQUE KEY `record_company` (`record_company`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `FK_user_details_user_id2` (`user_id`),
  ADD KEY `FK_album_album_id3` (`album_id`);

--
-- Indexes for table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`song_id`),
  ADD KEY `FK_album_album_id` (`album_id`);

--
-- Indexes for table `user_album`
--
ALTER TABLE `user_album`
  ADD PRIMARY KEY (`user_album_id`),
  ADD KEY `FK_user_details_user_id` (`user_id`),
  ADD KEY `FK_album_album_id2` (`album_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `album_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `artist`
--
ALTER TABLE `artist`
  MODIFY `artist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `record_company`
--
ALTER TABLE `record_company`
  MODIFY `record_company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `song`
--
ALTER TABLE `song`
  MODIFY `song_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_album`
--
ALTER TABLE `user_album`
  MODIFY `user_album_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `FK_artist_artist_id` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`artist_id`),
  ADD CONSTRAINT `FK_genre_genre_id1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`),
  ADD CONSTRAINT `FK_genre_genre_id2` FOREIGN KEY (`subgenre_id`) REFERENCES `genre` (`genre_id`),
  ADD CONSTRAINT `FK_genre_genre_id3` FOREIGN KEY (`subgenre2_id`) REFERENCES `genre` (`genre_id`),
  ADD CONSTRAINT `FK_record_company_record_company_id` FOREIGN KEY (`record_company_id`) REFERENCES `record_company` (`record_company_id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK_album_album_id3` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`),
  ADD CONSTRAINT `FK_user_details_user_id2` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`);

--
-- Constraints for table `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `FK_album_album_id` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`);

--
-- Constraints for table `user_album`
--
ALTER TABLE `user_album`
  ADD CONSTRAINT `FK_album_album_id2` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`),
  ADD CONSTRAINT `FK_user_details_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
