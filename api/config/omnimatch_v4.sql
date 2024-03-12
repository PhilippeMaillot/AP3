-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 11 mars 2024 à 08:49
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `omnimatch`
--

-- --------------------------------------------------------

--
-- Structure de la table `bet`
--

CREATE DATABASE omnimatch;
USE omnimatch;

CREATE TABLE `bet` (
  `id_bet` int(11) NOT NULL,
  `id_tournament` int(11) DEFAULT NULL,
  `id_club` int(11) DEFAULT NULL,
  `bet_amount` decimal(3,0) DEFAULT NULL,
  `bet_prediction` varchar(255) DEFAULT NULL CHECK (`bet_prediction` in ('victoire','defaite')),
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cart`
--

INSERT INTO `cart` (`id_cart`, `id_user`) VALUES
(1, 12);

-- --------------------------------------------------------

--
-- Structure de la table `cart_items`
--

CREATE TABLE `cart_items` (
  `id_cart_item` int(11) NOT NULL,
  `id_cart` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `item_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cart_items`
--

INSERT INTO `cart_items` (`id_cart_item`, `id_cart`, `id_product`, `item_quantity`) VALUES
(2, 1, 13, 4);

-- --------------------------------------------------------

--
-- Structure de la table `clubs`
--

CREATE TABLE `clubs` (
  `id_club` int(11) NOT NULL,
  `club_name` varchar(255) NOT NULL,
  `club_adress` varchar(255) DEFAULT NULL,
  `sport_type` enum('football','basketball','volley-ball','M2L') NOT NULL,
  `Mail` varchar(255) DEFAULT NULL,
  `club_town` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `clubs`
--

INSERT INTO `clubs` (`id_club`, `club_name`, `club_adress`, `sport_type`, `Mail`, `club_town`) VALUES
(98, 'Bussang Football', '3 rue de la Toussaint', 'football', 'bussang@gmail.com', 'Bussang'),
(115, 'Remiremont Football-club', '3 rue de foot', 'football', 'remiremont@gmail.com', 'Remiremont'),
(117, 'M2L', '13 Rue Jean Moulin', 'M2L', 'maisondesligues@gmail.com', 'Thionville'),
(118, 'Saint-Avold BasketClub', '58 avenue bienvenue', 'basketball', 'saintavoldbasket@gmail.com', 'Saint-Avold'),
(119, 'Thionville BasketClub', '34 rue saint martin', 'basketball', 'thionvillebasket@gmail.com', 'Thionville'),
(120, 'Charmes VolleyClub', '68 route de la boutique', 'volley-ball', 'charmes-volley@gmail.com', 'Charmes'),
(122, 'Paris Football', '1 Rue des Champs-Élysées, Paris', 'football', 'parisfootball@gmail.com', 'Bruyères'),
(123, 'Marseille Football', '15 Avenue du Prado, Marseille', 'football', 'marseillefootball@gmail.com', 'Château-Salins'),
(124, 'Lyon Football', '10 Place Bellecour, Lyon', 'football', 'lyonfootball@gmail.com', 'Longwy'),
(125, 'Toulouse Football', '2 Rue du Taur, Toulouse', 'football', 'toulousefootball@gmail.com', 'Fraize'),
(126, 'Nice Football', '5 Promenade des Anglais, Nice', 'football', 'nicefootball@gmail.com', 'Dun-sur-Meuse'),
(127, 'Paris Volley-ball', '10 Rue de la Paix, Paris', 'volley-ball', 'parisvolleyball@gmail.com', 'Forbach'),
(128, 'Marseille Volley-ball', '20 Rue de Rome, Marseille', 'volley-ball', 'marseillevolleyball@gmail.com', 'Metz'),
(129, 'Lyon Volley-ball', '5 Place Antonin-Poncet, Lyon', 'volley-ball', 'lyonvolleyball@gmail.com', 'Boulay-Moselle'),
(130, 'Toulouse Volley-ball', '5 Place Saint-Georges, Toulouse', 'volley-ball', 'toulousevolleyball@gmail.com', 'Commercy'),
(131, 'Nice Volley-ball', '10 Quai des États-Unis, Nice', 'volley-ball', 'nicevolleyball@gmail.com', 'Abreschviller'),
(132, 'Paris Basketball', '15 Rue de Rivoli, Paris', 'basketball', 'parisbasketball@gmail.com', 'Darney'),
(133, 'Marseille Basketball', '50 Quai des Belges, Marseille', 'basketball', 'marseillebasketball@gmail.com', 'Lunéville'),
(134, 'Lyon Basketball', '2 Place Bellecour, Lyon', 'basketball', 'lyonbasketball@gmail.com', 'Étain'),
(135, 'Toulouse Basketball', '20 Rue Alsace-Lorraine, Toulouse', 'basketball', 'toulousebasketball@gmail.com', 'Vandœuvre-lès-Nancy'),
(136, 'Nice Basketball', '5 Avenue Thiers, Nice', 'basketball', 'nicebasketball@gmail.com', 'Clermont-en-Argonne'),
(137, 'Metz Football', '1 Rue Sainte-Croix de la Bretonnerie, Metz', 'football', 'metzfootball@gmail.com', 'Metz'),
(138, 'Nancy Football', 'Place Stanislas, Nancy', 'football', 'nancyfootball@gmail.com', 'Nancy'),
(139, 'Thionville Football', '10 Rue de la République, Thionville', 'football', 'thionvillefootball@gmail.com', 'Thionville'),
(140, 'Épinal Football', '1 Place des Vosges, Épinal', 'football', 'epinalfootball@gmail.com', 'Épinal'),
(141, 'Forbach Football', '10 Rue Nationale, Forbach', 'football', 'forbachfootball@gmail.com', 'Forbach'),
(142, 'Metz Volley-ball', '2 Rue Gambetta, Metz', 'volley-ball', 'metzvolleyball@gmail.com', 'Metz'),
(143, 'Nancy Volley-ball', '10 Rue Félix Faure, Nancy', 'volley-ball', 'nancyvolleyball@gmail.com', 'Nancy'),
(144, 'Thionville Volley-ball', '5 Rue du Marché, Thionville', 'volley-ball', 'thionvillevolleyball@gmail.com', 'Thionville'),
(145, 'Épinal Volley-ball', '1 Place Emile Stein, Épinal', 'volley-ball', 'epinalvolleyball@gmail.com', 'Épinal'),
(146, 'Forbach Volley-ball', '5 Rue Sainte-Croix, Forbach', 'volley-ball', 'forbachvolleyball@gmail.com', 'Forbach'),
(147, 'Metz Basketball', '5 Place de la Comédie, Metz', 'basketball', 'metzbasketball@gmail.com', 'Metz'),
(148, 'Nancy Basketball', '5 Rue Jean Lamour, Nancy', 'basketball', 'nancybasketball@gmail.com', 'Nancy'),
(149, 'Thionville Basketball', '10 Rue de la Paix, Thionville', 'basketball', 'thionvillebasketball@gmail.com', 'Thionville'),
(150, 'Épinal Basketball', '10 Rue des États-Unis, Épinal', 'basketball', 'epinalbasketball@gmail.com', 'Épinal'),
(151, 'Forbach Basketball', '5 Rue du Maire Massing, Forbach', 'basketball', 'forbachbasketball@gmail.com', 'Forbach'),
(152, 'PaM Football', '45 rue du foot', 'football', 'pam@gmail.com', 'Pont-à-Mousson');

-- --------------------------------------------------------

--
-- Structure de la table `mobile_user`
--

CREATE TABLE `mobile_user` (
  `id_user` int(11) NOT NULL,
  `user_f_name` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `role` tinyint(4) DEFAULT NULL,
  `balance` decimal(3,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `mobile_user`
--

INSERT INTO `mobile_user` (`id_user`, `user_f_name`, `user_name`, `email`, `password_hash`, `role`, `balance`) VALUES
(1, 'Maillot', 'Philippe', 'maillotphilippe78@gmail.com', '$2b$10$nNiHOF./zD97Zs2Gx6P4eupp2i3/PiJWwRyqJ0tCFxXQDR6cjfWGG', 1, '90'),
(6, 'Doe', 'John', 'jdoe@gmail.com', '$2b$10$slTbgqJeS7sLQNbhz97D.OxodpTi/ctIguin5EaAk3lVpKKhxUA4y', 1, '65'),
(7, 'Sanders', 'Johakim', 'jsanders@gmail.com', '$2b$10$ZjNwxY70Q3D2Xn0qwryeROGhXWTLH8VeGWKo8XBP90pIfLcEJTbYe', 1, '65'),
(9, 'p', 'm', 'p@m.com', '$2b$10$dHTpiqylY/WF/aY6drHIo.4oUWQu8S9jkScYEXkzhWYd/0.YoWT/G', 1, '50'),
(10, 'm', 'p', 'mm@p.com', '$2b$10$2QymzeimRF6/nO.yx6.f4ONWDGnjyKsLfZiIvsLCMMECdLHDpyPAO', 1, '50'),
(12, 'Maillot', 'Philippe', 'mp@gmail.com', '$2b$10$SyHhFbkk4z.eY6YKK7P6JOuNpAOjO4M.Qrg3yL/hJ/mKLUyAij3u6', 1, '50');

--
-- Déclencheurs `mobile_user`
--
DELIMITER $$
CREATE TRIGGER `create_cart_after_user_insert` AFTER INSERT ON `mobile_user` FOR EACH ROW INSERT INTO cart (id_user) VALUES (NEW.id_user)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id_product` int(11) NOT NULL,
  `product_title` varchar(50) NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `product_price` float NOT NULL,
  `product_img` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id_product`, `product_title`, `product_description`, `product_price`, `product_img`, `stock`) VALUES
(7, 'Sweat rouge', 'Sweat rouge stylé', 15, 'img.png', 150),
(10, 'Sweat jaune', 'Sweat jaune stylé', 15, 'img.png', 150),
(12, 'T-shirt Omnimatch', 't-shirt Omnimatch', 25, 'img.png', 10),
(13, 'T-shirt Omnibet', 't-shirt Omnibet', 30, 'img.png', 10),
(14, 'T-shirt rouge', 't-shirt rouge', 10, 'img.png', 200),
(15, 'T-shirt vert', 't-shirt vert', 10, 'img.png', 200),
(16, 'T-shirt jaune', 't-shirt jaune', 10, 'img.png', 200),
(17, 'T-shirt cyan', 't-shirt cyan', 10, 'img.png', 200);

--
-- Déclencheurs `product`
--
DELIMITER $$
CREATE TRIGGER `delete_from_cart` BEFORE DELETE ON `product` FOR EACH ROW DELETE FROM cart_items WHERE id_product = OLD.id_product
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `sportfields`
--

CREATE TABLE `sportfields` (
  `id_field` int(11) NOT NULL,
  `field_adress` varchar(255) DEFAULT NULL,
  `sport_type` enum('football','basketball','volley-ball') NOT NULL,
  `field_town` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sportfields`
--

INSERT INTO `sportfields` (`id_field`, `field_adress`, `sport_type`, `field_town`) VALUES
(1, 'ruedelacarpe', 'football', 'Briey'),
(2, '3 rue de la tarte', 'basketball', 'Darney'),
(8, '4 rue de la marche', 'basketball', 'Briey'),
(9, '16 route de la marche', 'volley-ball', 'Forbach'),
(30, '10 Rue du Stade', 'football', 'Darney'),
(31, '15 Avenue du Parc', 'basketball', 'Thionville'),
(32, '5 Rue des Sports', 'volley-ball', 'Commercy'),
(33, '20 Rue de l\'Athlétisme', 'football', 'Dun-sur-Meuse'),
(34, '18 Boulevard des Joueurs', 'football', 'Baccarat'),
(35, '22 Rue du Panier', 'basketball', 'Nancy'),
(36, '7 Avenue du Filet', 'volley-ball', 'Sarreguemines'),
(37, '12 Rue du Goal', 'football', 'Bruyères'),
(38, '30 Rue du Dunk', 'basketball', 'Pange'),
(39, '8 Rue de la Balle', 'volley-ball', 'Thionville'),
(40, '11 Rue du Corner', 'football', 'Étain'),
(41, '14 Rue des Shoots', 'basketball', 'Épinal'),
(42, '9 Place du Réseau', 'volley-ball', 'Saint-Dié-des-Vosges'),
(43, '17 Avenue du Stade', 'football', 'Saint-Mihiel'),
(44, '23 Rue du Rebond', 'basketball', 'Fraize'),
(45, '4 Rue du Smash', 'volley-ball', 'Bitche'),
(46, '19 Allée des Buts', 'football', 'Bains-les-Bains'),
(47, '21 Rue de l\'Alley-Oop', 'basketball', 'Thionville'),
(48, '6 Place du Filet', 'volley-ball', 'Remiremont'),
(49, '28 Rue de la Tactique', 'football', 'Rambervillers'),
(167, '15 Avenue du Parc', 'basketball', 'Metz'),
(168, '5 Rue des Sports', 'volley-ball', 'Saint-Dié-des-Vosges'),
(169, '20 Rue de l\'Athlétisme', 'football', 'Longwy'),
(170, '18 Boulevard des Joueurs', 'football', 'Forbach'),
(171, '7 Avenue du Filet', 'volley-ball', 'Montigny-lès-Metz'),
(172, '12 Rue du Goal', 'football', 'Sarreguemines'),
(173, '30 Rue du Dunk', 'basketball', 'Épinal'),
(174, '8 Rue de la Balle', 'volley-ball', 'Nancy'),
(175, '11 Rue du Corner', 'football', 'Saint-Dié-des-Vosges'),
(176, '14 Rue des Shoots', 'basketball', 'Lamarche'),
(177, '9 Place du Réseau', 'volley-ball', 'Château-Salins'),
(178, '17 Avenue du Stade', 'football', 'Ligny-en-Barrois'),
(179, '23 Rue du Rebond', 'basketball', 'Thionville'),
(180, '4 Rue du Smash', 'volley-ball', 'Baccarat'),
(181, '19 Allée des Buts', 'football', 'Pont-à-Mousson'),
(182, '21 Rue de l\'Alley-Oop', 'basketball', 'Saint-Mihiel'),
(183, '6 Place du Filet', 'volley-ball', 'Nomeny'),
(184, '28 Rue de la Tactique', 'football', 'Bitche'),
(185, '5 Rue de la Victoire', 'volley-ball', 'Forbach'),
(186, '14 Rue du Panorama', 'football', 'Lamarche'),
(187, '3 Avenue des Champions', 'basketball', 'Sarreguemines'),
(188, '26 Rue de la Stratégie', 'volley-ball', 'Remiremont'),
(189, '15 Rue de la Puissance', 'volley-ball', 'Épinal'),
(190, '21 Avenue de la Victoire', 'football', 'Bitche'),
(191, '56 rue de la course', 'football', 'Badonviller'),
(193, '57 rue de la marche', 'football', 'Abreschviller'),
(194, '57 rue de la marche', 'basketball', 'Abreschviller'),
(195, '57 rue de la marche', 'volley-ball', 'Abreschviller'),
(196, '7 route de moulin', 'football', 'Albestroff'),
(197, '7 route de moulin', 'basketball', 'Albestroff'),
(198, '7 route de moulin', 'volley-ball', 'Albestroff'),
(199, '24 rue de la Marche', 'football', 'Dun-sur-Meuse'),
(229, '91 rue de la Marche', 'football', 'Fraize'),
(230, '31 rue de la Marche', 'football', 'Haroué'),
(231, '30 rue de la Marche', 'football', 'Pange'),
(232, '53 avenue des Sports', 'basketball', 'Briey'),
(233, '75 boulevard de la Victoire', 'volley-ball', 'Metz'),
(234, '14 impasse du Stade', 'football', 'Pange'),
(235, '43 rue du Basket', 'basketball', 'Forbach'),
(236, '74 allée du Volley', 'volley-ball', 'Forbach'),
(237, '40 avenue du Foot', 'football', 'Ligny-en-Barrois'),
(238, '76 rue du Basket', 'basketball', 'Morhange'),
(239, '62 impasse du Volley', 'volley-ball', 'Étain'),
(240, '81 chemin du Football', 'football', 'Saint-Avold'),
(241, '20 place du Basket', 'basketball', 'Bussang'),
(242, '55 rue du Volley', 'volley-ball', 'Ligny-en-Barrois'),
(243, '14 avenue du Foot', 'football', 'Clermont-en-Argonne'),
(244, '6 boulevard du Basket', 'basketball', 'Bitche'),
(245, '89 rue de la Victoire', 'volley-ball', 'Ligny-en-Barrois'),
(246, '23 impasse du Stade', 'football', 'Gondrecourt-le-Château'),
(247, '48 avenue du Volley', 'basketball', 'Nancy'),
(248, '73 allée du Foot', 'volley-ball', 'Lamarche'),
(249, '17 rue du Basket', 'football', 'Saint-Nicolas-de-Port'),
(250, '69 avenue du Volley', 'basketball', 'Château-Salins'),
(251, '92 boulevard du Foot', 'volley-ball', 'Réchicourt-le-Château'),
(252, '52 impasse du Basket', 'football', 'Darney'),
(253, '84 rue de la Victoire', 'basketball', 'Baccarat'),
(254, '62 place du Volley', 'volley-ball', 'Bussang'),
(255, '57 avenue du Stade', 'football', 'Vandœuvre-lès-Nancy'),
(256, '99 boulevard du Basket', 'basketball', 'Lunéville'),
(257, '22 rue du Volley', 'volley-ball', 'Haroué'),
(258, '15 impasse du Foot', 'football', 'Rambervillers'),
(259, '8 allée du Basket', 'basketball', 'Nomeny'),
(260, '96 rue de la Victoire', 'volley-ball', 'Neufchâteau'),
(291, '90 rue de la Marche', 'football', 'Lamarche'),
(292, '47 avenue des Sports', 'football', 'Darney'),
(293, '63 boulevard de la Victoire', 'football', 'Longuyon'),
(294, '77 impasse du Stade', 'football', 'Bitche'),
(295, '93 rue du Basket', 'football', 'Dun-sur-Meuse'),
(296, '33 allée du Volley', 'football', 'Bruyères'),
(297, '87 avenue du Foot', 'football', 'Forbach'),
(298, '35 rue du Basket', 'football', 'Haroué'),
(299, '12 impasse du Volley', 'football', 'Boulay-Moselle'),
(300, '57 chemin du Football', 'football', 'Pont-à-Mousson'),
(301, '46 place du Basket', 'football', 'Commercy'),
(302, '61 rue du Volley', 'football', 'Abreschviller'),
(303, '66 avenue du Foot', 'football', 'Mirecourt'),
(304, '47 boulevard du Basket', 'football', 'Nancy'),
(305, '37 rue de la Victoire', 'football', 'Colombey-les-Belles'),
(306, '42 impasse du Stade', 'football', 'Longuyon'),
(307, '99 avenue du Volley', 'football', 'Nomeny'),
(308, '67 allée du Foot', 'football', 'Hagondange'),
(309, '37 rue du Basket', 'football', 'Sarrebourg'),
(310, '83 avenue du Volley', 'football', 'Bitche'),
(311, '3 boulevard du Foot', 'football', 'Rambervillers'),
(312, '65 impasse du Basket', 'football', 'Saint-Dié-des-Vosges'),
(313, '18 rue de la Victoire', 'football', 'Metz'),
(314, '94 place du Volley', 'football', 'Albestroff'),
(315, '16 avenue du Stade', 'football', 'Haroué'),
(316, '95 boulevard du Basket', 'football', 'Montigny-lès-Metz'),
(317, '30 rue du Volley', 'football', 'Bruyères'),
(318, '63 impasse du Foot', 'football', 'Abreschviller'),
(319, '23 allée du Basket', 'football', 'Thionville'),
(320, '29 rue de la Victoire', 'football', 'Lunéville'),
(321, '98 rue de la Marche', 'basketball', 'Bains-les-Bains'),
(322, '85 avenue des Sports', 'basketball', 'Lunéville'),
(323, '33 boulevard de la Victoire', 'basketball', 'Bruyères'),
(324, '9 impasse du Stade', 'basketball', 'Briey'),
(325, '46 rue du Basket', 'basketball', 'Gondrecourt-le-Château'),
(326, '3 allée du Volley', 'basketball', 'Commercy'),
(327, '77 avenue du Foot', 'basketball', 'Badonviller'),
(328, '75 rue du Basket', 'basketball', 'Albestroff'),
(329, '41 impasse du Volley', 'basketball', 'Mirecourt'),
(330, '83 chemin du Football', 'basketball', 'Lunéville'),
(331, '90 place du Basket', 'basketball', 'Albestroff'),
(332, '100 rue du Volley', 'basketball', 'Longwy'),
(333, '28 avenue du Foot', 'basketball', 'Rambervillers'),
(334, '41 boulevard du Basket', 'basketball', 'Albestroff'),
(335, '19 rue de la Victoire', 'basketball', 'Colombey-les-Belles'),
(336, '74 impasse du Stade', 'basketball', 'Commercy'),
(337, '12 avenue du Volley', 'basketball', 'Bitche'),
(338, '36 allée du Foot', 'basketball', 'Ligny-en-Barrois'),
(339, '44 rue du Basket', 'basketball', 'Boulay-Moselle'),
(340, '10 avenue du Volley', 'basketball', 'Réchicourt-le-Château'),
(341, '18 boulevard du Foot', 'basketball', 'Bitche'),
(342, '59 impasse du Football', 'basketball', 'Rambervillers'),
(343, '39 rue de la Victoire', 'basketball', 'Saint-Dié-des-Vosges'),
(344, '20 place du Volley', 'basketball', 'Remiremont'),
(345, '80 avenue du Stade', 'basketball', 'Montmédy'),
(346, '40 boulevard du Basket', 'basketball', 'Bussang'),
(347, '58 rue du Volley', 'basketball', 'Haroué'),
(348, '73 impasse du Foot', 'basketball', 'Lunéville'),
(349, '89 allée du Basket', 'basketball', 'Haroué'),
(350, '24 rue de la Victoire', 'basketball', 'Rambervillers'),
(351, '33 rue de la Marche', 'volley-ball', 'Ligny-en-Barrois'),
(352, '43 avenue des Sports', 'volley-ball', 'Saint-Avold'),
(353, '15 boulevard de la Victoire', 'volley-ball', 'Pange'),
(354, '46 impasse du Stade', 'volley-ball', 'Nancy'),
(355, '82 rue du Basket', 'volley-ball', 'Forbach'),
(356, '72 allée du Volley', 'volley-ball', 'Bitche'),
(357, '16 avenue du Foot', 'volley-ball', 'Charmes'),
(358, '63 rue du Basket', 'volley-ball', 'Bruyères'),
(359, '66 impasse du Volley', 'volley-ball', 'Lunéville'),
(360, '40 chemin du Football', 'volley-ball', 'Haroué'),
(361, '1 place du Basket', 'volley-ball', 'Lamarche'),
(362, '83 rue du Volley', 'volley-ball', 'Thionville'),
(363, '13 avenue du Foot', 'volley-ball', 'Réchicourt-le-Château'),
(364, '16 boulevard du Basket', 'volley-ball', 'Commercy'),
(365, '42 rue de la Victoire', 'volley-ball', 'Neufchâteau'),
(366, '59 impasse du Stade', 'volley-ball', 'Saint-Avold'),
(367, '69 avenue du Volley', 'volley-ball', 'Commercy'),
(368, '66 allée du Foot', 'volley-ball', 'Clermont-en-Argonne'),
(369, '26 rue du Basket', 'volley-ball', 'Badonviller'),
(370, '29 avenue du Volley', 'volley-ball', 'Baccarat'),
(371, '65 boulevard du Foot', 'volley-ball', 'Lunéville'),
(372, '41 impasse du Football', 'volley-ball', 'Nancy'),
(373, '7 rue de la Victoire', 'volley-ball', 'Saint-Mihiel'),
(374, '14 place du Basket', 'volley-ball', 'Remiremont'),
(375, '46 avenue du Stade', 'volley-ball', 'Saint-Avold'),
(376, '88 boulevard du Basket', 'volley-ball', 'Épinal'),
(377, '3 rue du Volley', 'volley-ball', 'Bussang'),
(378, '51 impasse du Foot', 'volley-ball', 'Bussang'),
(379, '43 allée du Basket', 'volley-ball', 'Hagondange'),
(380, '62 rue de la Victoire', 'volley-ball', 'Saint-Avold'),
(381, '56 rue de la courseeeee', 'football', 'Charmes'),
(382, 'Test de terrain', 'football', 'Thionville');

-- --------------------------------------------------------

--
-- Structure de la table `tournament`
--

CREATE TABLE `tournament` (
  `id_tournament` int(11) NOT NULL,
  `tournament_name` varchar(255) NOT NULL,
  `tournament_date` date NOT NULL,
  `id_field` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tournament`
--

INSERT INTO `tournament` (`id_tournament`, `tournament_name`, `tournament_date`, `id_field`) VALUES
(28, 'Test tournois du 26/02/2024', '2024-02-26', 243),
(29, 'Test tournois du 27/02/2024', '2024-02-27', 335),
(30, 'test postman 2', '2023-07-23', 335),
(34, 'test ', '2024-03-13', 335),
(37, 'Test tournois du 31/03/2024', '2024-03-31', 325);

--
-- Déclencheurs `tournament`
--
DELIMITER $$
CREATE TRIGGER `before_delete_tournament` BEFORE DELETE ON `tournament` FOR EACH ROW BEGIN
    DELETE FROM tournamentparticipation WHERE id_tournament = OLD.id_tournament;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete_bets_on_tournament_delete` BEFORE DELETE ON `tournament` FOR EACH ROW BEGIN
    DELETE FROM bet WHERE id_tournament = OLD.id_tournament;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `tournamentparticipation`
--

CREATE TABLE `tournamentparticipation` (
  `id_participation` int(11) NOT NULL,
  `id_club` int(11) NOT NULL,
  `id_tournament` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tournamentparticipation`
--

INSERT INTO `tournamentparticipation` (`id_participation`, `id_club`, `id_tournament`) VALUES
(323, 118, 34),
(324, 119, 34),
(325, 132, 34),
(326, 133, 34),
(329, 134, 30),
(330, 135, 30),
(331, 136, 30),
(332, 147, 30),
(333, 148, 30),
(334, 149, 30),
(338, 123, 28),
(339, 124, 28),
(340, 125, 28),
(352, 147, 29),
(353, 148, 29);

-- --------------------------------------------------------

--
-- Structure de la table `town`
--

CREATE TABLE `town` (
  `id_town` int(11) NOT NULL,
  `town_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `town`
--

INSERT INTO `town` (`id_town`, `town_name`) VALUES
(11, 'Abreschviller'),
(12, 'Albestroff'),
(13, 'Baccarat'),
(14, 'Badonviller'),
(15, 'Bains-les-Bains'),
(16, 'Bitche'),
(17, 'Boulay-Moselle'),
(18, 'Briey'),
(19, 'Bruyères'),
(20, 'Bussang'),
(21, 'Chambley-Bussières'),
(22, 'Charmes'),
(23, 'Château-Salins'),
(24, 'Clermont-en-Argonne'),
(25, 'Colombey-les-Belles'),
(26, 'Commercy'),
(27, 'Darney'),
(28, 'Dun-sur-Meuse'),
(4, 'Épinal'),
(29, 'Étain'),
(8, 'Forbach'),
(31, 'Fraize'),
(32, 'Gondrecourt-le-Château'),
(33, 'Hagondange'),
(34, 'Haroué'),
(35, 'Lamarche'),
(36, 'Ligny-en-Barrois'),
(37, 'Longuyon'),
(38, 'Longwy'),
(10, 'Lunéville'),
(39, 'Lunéville'),
(1, 'Metz'),
(40, 'Mirecourt'),
(6, 'Montigny-lès-Metz'),
(41, 'Montmédy'),
(42, 'Morhange'),
(2, 'Nancy'),
(43, 'Neufchâteau'),
(44, 'Nomeny'),
(45, 'Pange'),
(46, 'Plombières-les-Bains'),
(47, 'Pont-à-Mousson'),
(48, 'Rambervillers'),
(49, 'Réchicourt-le-Château'),
(50, 'Remiremont'),
(51, 'Saint-Avold'),
(9, 'Saint-Dié-des-Vosges'),
(53, 'Saint-Mihiel'),
(54, 'Saint-Nicolas-de-Port'),
(55, 'Sarrebourg'),
(7, 'Sarreguemines'),
(3, 'Thionville'),
(5, 'Vandœuvre-lès-Nancy');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `id_club` int(11) DEFAULT NULL,
  `club_name` varchar(255) NOT NULL,
  `club_mail` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `user_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `id_club`, `club_name`, `club_mail`, `password_hash`, `user_role`) VALUES
(92, 98, 'Bussang Football', 'bussang@gmail.com', '$2a$10$.6FsmtBrZbh92mRAsNxrn.2uaQbUQ/nPPQ7tg/slZUq2nZ3Uq039e', 0),
(95, 115, 'Remiremont Football-club', 'remiremont@gmail.com', '$2a$10$jAfwvnocZkErhPWKOlO9v.wsZOVfYYcpyf86jK.XCeNcCGUZkhala', 0),
(97, 117, 'M2L', 'maisondesligues@gmail.com', '$2a$10$GlC.HoZEHGMbStstqRr69.jG/BJUrUVmEPlW/FeG.S47TyUwlZQpm', 1),
(98, 118, 'Saint-Avold BasketClub', 'saintavoldbasket@gmail.com', '$2a$10$xwB2Pa4FTmt3eyRhncf9Pe3sblVd1wWshfVkhKOHI83bH1x2quONy', 0),
(99, 119, 'Thionville BasketClub', 'thionvillebasket@gmail.com', '$2a$10$u6CCMgZSJxqq3xBNDhJUxO5057imZf4UhDsS32nLy4UqU26bASweW', 0),
(100, 120, 'Charmes VolleyClub', 'charmes-volley@gmail.com', '$2a$10$tNlH2bJoXoy4.Awe0o.w1.Iz5317XBZOGVz4g3sQu0PRcWu5bW9aO', 0),
(102, 152, 'PaM Football', 'pam@gmail.com', '$2a$10$XaIYhPM4Hi66/hBi5L5iSOmbqGz.uPGjKjTzuAllnOQGEdBZDsVVG', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `bet`
--
ALTER TABLE `bet`
  ADD PRIMARY KEY (`id_bet`),
  ADD KEY `id_tournament` (`id_tournament`),
  ADD KEY `id_club` (`id_club`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id_cart_item`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `fk_cart_items_cart` (`id_cart`);

--
-- Index pour la table `clubs`
--
ALTER TABLE `clubs`
  ADD PRIMARY KEY (`id_club`),
  ADD KEY `club_town` (`club_town`);

--
-- Index pour la table `mobile_user`
--
ALTER TABLE `mobile_user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`);

--
-- Index pour la table `sportfields`
--
ALTER TABLE `sportfields`
  ADD PRIMARY KEY (`id_field`),
  ADD KEY `field_town` (`field_town`);

--
-- Index pour la table `tournament`
--
ALTER TABLE `tournament`
  ADD PRIMARY KEY (`id_tournament`),
  ADD KEY `id_field` (`id_field`);

--
-- Index pour la table `tournamentparticipation`
--
ALTER TABLE `tournamentparticipation`
  ADD PRIMARY KEY (`id_participation`),
  ADD KEY `id_club` (`id_club`),
  ADD KEY `id_tournament` (`id_tournament`);

--
-- Index pour la table `town`
--
ALTER TABLE `town`
  ADD PRIMARY KEY (`id_town`),
  ADD KEY `town_name` (`town_name`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_club` (`id_club`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `bet`
--
ALTER TABLE `bet`
  MODIFY `id_bet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id_cart_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `clubs`
--
ALTER TABLE `clubs`
  MODIFY `id_club` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT pour la table `mobile_user`
--
ALTER TABLE `mobile_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `sportfields`
--
ALTER TABLE `sportfields`
  MODIFY `id_field` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=383;

--
-- AUTO_INCREMENT pour la table `tournament`
--
ALTER TABLE `tournament`
  MODIFY `id_tournament` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pour la table `tournamentparticipation`
--
ALTER TABLE `tournamentparticipation`
  MODIFY `id_participation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=354;

--
-- AUTO_INCREMENT pour la table `town`
--
ALTER TABLE `town`
  MODIFY `id_town` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `bet`
--
ALTER TABLE `bet`
  ADD CONSTRAINT `bet_ibfk_1` FOREIGN KEY (`id_tournament`) REFERENCES `tournament` (`id_tournament`),
  ADD CONSTRAINT `bet_ibfk_2` FOREIGN KEY (`id_club`) REFERENCES `clubs` (`id_club`),
  ADD CONSTRAINT `bet_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `mobile_user` (`id_user`);

--
-- Contraintes pour la table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `mobile_user` (`id_user`);

--
-- Contraintes pour la table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`id_cart`) REFERENCES `cart` (`id_cart`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`),
  ADD CONSTRAINT `fk_cart_items_cart` FOREIGN KEY (`id_cart`) REFERENCES `cart` (`id_cart`);

--
-- Contraintes pour la table `clubs`
--
ALTER TABLE `clubs`
  ADD CONSTRAINT `clubs_ibfk_1` FOREIGN KEY (`club_town`) REFERENCES `town` (`town_name`);

--
-- Contraintes pour la table `sportfields`
--
ALTER TABLE `sportfields`
  ADD CONSTRAINT `sportfields_ibfk_1` FOREIGN KEY (`field_town`) REFERENCES `town` (`town_name`);

--
-- Contraintes pour la table `tournament`
--
ALTER TABLE `tournament`
  ADD CONSTRAINT `tournament_ibfk_1` FOREIGN KEY (`id_field`) REFERENCES `sportfields` (`id_field`);

--
-- Contraintes pour la table `tournamentparticipation`
--
ALTER TABLE `tournamentparticipation`
  ADD CONSTRAINT `tournamentparticipation_ibfk_1` FOREIGN KEY (`id_club`) REFERENCES `clubs` (`id_club`),
  ADD CONSTRAINT `tournamentparticipation_ibfk_2` FOREIGN KEY (`id_tournament`) REFERENCES `tournament` (`id_tournament`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_club`) REFERENCES `clubs` (`id_club`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
