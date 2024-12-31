-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th12 31, 2024 lúc 04:57 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `sunrise`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `collections`
--

CREATE TABLE `collections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `collections`
--

INSERT INTO `collections` (`id`, `user_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 14, 'Chill', '2024-12-31 07:00:11', '2024-12-31 07:00:11'),
(2, 14, 'Cool', '2024-12-31 07:00:17', '2024-12-31 07:00:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `collections_favorites`
--

CREATE TABLE `collections_favorites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `collection_id` bigint(20) UNSIGNED NOT NULL,
  `favorite_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `collections_favorites`
--

INSERT INTO `collections_favorites` (`id`, `collection_id`, `favorite_id`) VALUES
(1, 1, 9),
(2, 2, 9),
(3, 1, 10),
(4, 1, 12),
(5, 2, 13),
(6, 1, 14),
(7, 1, 15),
(8, 1, 20),
(9, 1, 21);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `restaurant_id`, `created_at`, `updated_at`) VALUES
(1, 11, 1, '2024-12-29 22:25:01', '2024-12-29 22:25:01'),
(2, 11, 18, '2024-12-29 22:25:08', '2024-12-29 22:25:08'),
(3, 11, 34, '2024-12-29 22:25:14', '2024-12-29 22:25:14'),
(4, 11, 41, '2024-12-29 22:30:20', '2024-12-29 22:30:20'),
(5, 11, 42, '2024-12-30 10:38:14', '2024-12-30 10:38:14'),
(7, 11, 32, '2024-12-31 03:46:56', '2024-12-31 03:46:56'),
(8, 11, 37, '2024-12-31 04:04:11', '2024-12-31 04:04:11'),
(9, 14, 53, '2024-12-31 06:20:09', '2024-12-31 06:20:09'),
(10, 14, 55, '2024-12-31 06:20:11', '2024-12-31 06:20:11'),
(11, 14, 52, '2024-12-31 06:20:15', '2024-12-31 06:20:15'),
(12, 14, 57, '2024-12-31 06:20:17', '2024-12-31 06:20:17'),
(13, 14, 42, '2024-12-31 06:20:23', '2024-12-31 06:20:23'),
(14, 14, 63, '2024-12-31 07:37:15', '2024-12-31 07:37:15'),
(15, 14, 49, '2024-12-31 07:38:03', '2024-12-31 07:38:03'),
(16, 14, 21, '2024-12-31 07:42:23', '2024-12-31 07:42:23'),
(17, 14, 6, '2024-12-31 07:42:41', '2024-12-31 07:42:41'),
(19, 14, 41, '2024-12-31 07:55:37', '2024-12-31 07:55:37'),
(20, 14, 32, '2024-12-31 07:55:58', '2024-12-31 07:55:58'),
(21, 14, 37, '2024-12-31 07:56:00', '2024-12-31 07:56:00'),
(22, 14, 25, '2024-12-31 07:56:02', '2024-12-31 07:56:02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000001_create_cache_table', 1),
(2, '0001_01_01_000002_create_jobs_table', 1),
(3, '2024_01_01_000000_create_styles_table', 1),
(4, '2024_01_01_000000_create_users_table', 1),
(5, '2024_11_20_144148_create_restaurants_table', 1),
(6, '2024_11_20_155659_create_reviews_table', 1),
(7, '2024_11_20_160530_create_favorites_table', 1),
(8, '2024_11_20_160853_create_collections_table', 1),
(9, '2024_11_20_161005_create_collections_favorites_table', 1),
(10, '2024_11_20_161043_create_restaurants_styles_table', 1),
(11, '2024_11_24_122347_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 11, 'token_name', '014ebfb2b76445647d77835158c461bd20f8c0c3b3a797f61829260a765e8bce', '[\"*\"]', NULL, NULL, '2024-12-29 19:34:44', '2024-12-29 19:34:44'),
(2, 'App\\Models\\User', 13, 'token_name', 'c7d08bdcbbb7866b8bd5e620d6c469c963aeba67e1c2d5041413fb7fbaeda90f', '[\"*\"]', NULL, NULL, '2024-12-29 19:53:47', '2024-12-29 19:53:47'),
(3, 'App\\Models\\User', 13, 'token_name', '18feb3538d444e305ea8ae7fe40b4494f920274c18c25e0febffb55acb43dc79', '[\"*\"]', NULL, NULL, '2024-12-29 19:56:03', '2024-12-29 19:56:03'),
(4, 'App\\Models\\User', 11, 'token_name', '5a4e2e2429180db6b0c97de276081cbf86dd0976939d1f56e70ecc62d987a961', '[\"*\"]', NULL, NULL, '2024-12-29 22:21:17', '2024-12-29 22:21:17'),
(5, 'App\\Models\\User', 1, 'token_name', 'aac76aff32bb85dab04574b3ff4339d09599b7efaf789eb6d419ac6ba3da39fc', '[\"*\"]', NULL, NULL, '2024-12-31 06:02:24', '2024-12-31 06:02:24'),
(6, 'App\\Models\\User', 1, 'token_name', 'e8ac282878c78509883bbb50ec308613c865bc6fd6c0829d0ab526f9601a52dc', '[\"*\"]', NULL, NULL, '2024-12-31 06:04:17', '2024-12-31 06:04:17'),
(7, 'App\\Models\\User', 14, 'token_name', '4d43c9a1b91902984326ee85684d8432d842f894e34b947b105c35e8e573d02a', '[\"*\"]', NULL, NULL, '2024-12-31 06:06:16', '2024-12-31 06:06:16'),
(8, 'App\\Models\\User', 15, 'token_name', 'f09fb6c21579832a6da8109e286a522cdcbbb85ecd12b6a22ebe3c97100d27c3', '[\"*\"]', NULL, NULL, '2024-12-31 06:16:25', '2024-12-31 06:16:25'),
(9, 'App\\Models\\User', 14, 'token_name', '43b73e509e4cc91e913552e85fc71c025db33bda9ffe925207aaab52b7c680d8', '[\"*\"]', NULL, NULL, '2024-12-31 06:18:02', '2024-12-31 06:18:02'),
(10, 'App\\Models\\User', 15, 'token_name', '747f0d3e5708805cf9d7c9dbbd3e1b272c4cabd092123b8cab88e77d6944b0c4', '[\"*\"]', NULL, NULL, '2024-12-31 06:26:09', '2024-12-31 06:26:09'),
(11, 'App\\Models\\User', 15, 'token_name', '818e02b46eeebb85bd059319e2564cf1f392c8eebcb1b71a411d588c70ad881c', '[\"*\"]', NULL, NULL, '2024-12-31 06:26:40', '2024-12-31 06:26:40');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `restaurants`
--

CREATE TABLE `restaurants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `media` text DEFAULT NULL,
  `description` longtext NOT NULL,
  `price_start` int(11) NOT NULL,
  `price_end` int(11) NOT NULL,
  `open_time` time NOT NULL,
  `close_time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `email`, `phone`, `address`, `latitude`, `longitude`, `avatar`, `media`, `description`, `price_start`, `price_end`, `open_time`, `close_time`, `created_at`, `updated_at`) VALUES
(1, 'Crona Inc', 'obie37@example.net', '+1-984-492-8820', '318 Ward Roads\r\nWest Destineyport, MT 78356', 47.0002500, -109.7510200, '/storage/images/1735646727_avatar_6773de079d924.jpg', '[\"\\/storage\\/images\\/1735646778_media_6773de3a2b052.jpg\",\"\\/storage\\/images\\/1735646778_media_6773de3a2e1e5.jpg\",\"\\/storage\\/images\\/1735646778_media_6773de3a2f629.jpg\",\"\\/storage\\/images\\/1735646778_media_6773de3a2fea4.jpg\"]', 'Minus minus sunt excepturi.', 15, 67, '08:59:21', '10:18:30', '2024-12-29 19:29:17', '2024-12-31 05:06:18'),
(2, 'Brekke-Vandervort', 'casey.hickle@example.net', '240-423-0480', '654 Joannie Villages Apt. 630\nEast Stefaniestad, SC 74975-2361', 20.9359400, 105.8625460, NULL, NULL, 'Quo doloremque est modi labore doloremque.', 10, 145, '20:27:48', '02:24:00', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(4, 'Bins Group', 'champlin.catharine@example.org', '830.793.3973', '3297 Cameron Union\nEast Lucienne, HI 66879', 21.1568890, 105.9062110, NULL, NULL, 'Eum ratione provident rerum molestiae culpa quibusdam.', 32, 85, '05:58:25', '11:07:05', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(5, 'Quitzon-Glover', 'goyette.reba@example.org', '+1 (660) 488-6601', '9328 Britney Garden\nBergnaumberg, RI 07507-8387', 20.9412460, 105.9285440, NULL, NULL, 'Sequi fugiat dolor id eos nisi voluptates.', 50, 139, '07:15:09', '07:37:06', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(6, 'Huel Inc', 'kschuster@example.net', '667-229-6956', '3399 Nicolas Estate Suite 574\nErickton, MD 24664', 20.9703830, 105.7832650, NULL, NULL, 'Enim et sequi quisquam sint facere perspiciatis autem vitae.', 40, 199, '02:03:58', '05:28:27', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(7, 'Prohaska LLC', 'kade90@example.net', '575.278.0527', '4951 Hollie Stravenue\nNorth Myrtlestad, KS 46426', 21.1263900, 105.7895830, NULL, NULL, 'Iste et consequatur quis libero magni.', 24, 71, '23:24:05', '04:28:45', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(8, 'Hickle LLC', 'beier.neha@example.org', '+1-757-266-0973', '81460 Anibal Extensions Suite 332\nSkilesstad, OK 99151-8306', 20.8046930, 105.9615620, NULL, NULL, 'Tempore ut alias facilis rerum.', 48, 143, '18:26:51', '14:49:53', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(9, 'Cormier Group', 'mellie58@example.org', '+1-737-397-1767', '825 Bayer Plains Suite 550\nLake Joesph, IN 93266-3297', 20.9053610, 105.7144610, NULL, NULL, 'Earum quia nemo suscipit est accusantium.', 47, 120, '21:06:57', '22:54:12', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(10, 'Schneider, Conn and Mayert', 'qlangworth@example.com', '+1-351-961-2487', '7774 Daphne Inlet Apt. 054\nRachaelstad, TN 07237-9069', 20.9517550, 105.9792160, NULL, NULL, 'Inventore qui ipsa quae quibusdam excepturi.', 29, 198, '04:27:20', '17:49:15', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(11, 'Wuckert, Lowe and Kautzer', 'lakin.timmothy@example.org', '+15105288250', '5840 Schimmel Unions Apt. 991\nLake Kaleb, TX 67676-8198', 20.8958220, 105.8806780, NULL, NULL, 'Eligendi nihil veniam rerum vitae omnis est dolor.', 38, 121, '04:38:37', '12:12:43', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(12, 'Fay PLC', 'ines10@example.net', '(347) 208-5707', '333 Hegmann Groves\nLake Ottisburgh, NM 46339', 20.8101960, 105.9945410, NULL, NULL, 'Unde et debitis vel ducimus eum.', 25, 70, '09:46:15', '20:22:17', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(13, 'Murphy Ltd', 'hermiston.alvah@example.net', '541-716-3248', '71931 Valentina Park Apt. 224\nRahsaanside, NH 79735-1678', 21.0732590, 105.7062210, NULL, NULL, 'Voluptatem velit blanditiis a earum aut.', 32, 69, '00:45:43', '03:19:01', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(14, 'Auer, Reichert and Murazik', 'petra.gutmann@example.org', '769.742.8460', '943 Roel Springs\nLake Davonte, MA 18717', 20.8926640, 105.9574180, NULL, NULL, 'Sit doloremque incidunt nihil ipsum fugit.', 11, 62, '05:23:15', '08:44:07', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(15, 'Rohan LLC', 'eichmann.teagan@example.org', '479-418-4112', '84614 Flossie Wells\nNorth Johnpaulborough, IL 39226-6465', 20.8461050, 105.7929070, NULL, NULL, 'Molestiae temporibus et accusantium nesciunt nihil.', 22, 175, '13:16:15', '01:22:30', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(16, 'Abshire-Ziemann', 'jacobs.lindsey@example.net', '(956) 270-9137', '441 Wehner Drive Apt. 137\nKarleyview, ID 26671', 21.0061590, 105.9031200, NULL, NULL, 'Quis architecto id exercitationem quibusdam.', 17, 68, '03:05:12', '06:01:22', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(17, 'D\'Amore, Mante and Wiegand', 'yasmeen01@example.org', '854-549-2162', '56599 Miracle Prairie\nEast Rosalind, MO 97020-6189', 20.8027350, 105.9765270, NULL, NULL, 'Mollitia aut occaecati qui qui repellendus cupiditate autem.', 47, 187, '04:22:16', '15:27:29', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(18, 'Becker-Williamson', 'ora17@example.com', '732.795.7586', '920 Adams Creek Suite 241\nLake Julian, CO 26472-9192', 20.8657490, 105.9136660, NULL, NULL, 'Cumque aut ipsa nostrum.', 32, 96, '19:34:16', '00:17:07', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(19, 'Fahey, Schoen and Hoppe', 'marlon.gorczany@example.org', '1-708-504-6476', '661 Hodkiewicz Square\nHudsonbury, MI 08948-5723', 20.9470880, 105.8738970, NULL, NULL, 'Laboriosam eligendi tempora porro facere pariatur in porro.', 37, 191, '07:24:55', '06:48:08', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(20, 'Tremblay, Emard and Toy', 'merl66@example.org', '+1-769-651-3445', '64924 Clarissa Valleys\nDouglasstad, VA 20688-4419', 21.0136610, 105.8241200, NULL, NULL, 'Dolorum ut qui dolor similique sequi id.', 48, 155, '20:05:16', '23:55:39', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(21, 'Lindgren, Wiza and Goodwin', 'ari65@example.org', '+1 (770) 241-8811', '63419 Johns Plains\nLamarborough, KS 74621', 21.0099430, 105.9929760, NULL, NULL, 'Sit porro corporis consequatur sit dolorem deserunt adipisci.', 46, 189, '16:30:05', '17:01:12', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(22, 'Ryan-Turner', 'maggio.annamae@example.org', '+1 (949) 222-1334', '10254 Price Tunnel\nNorth Eunaport, MT 46678-4846', 20.9535830, 105.9152770, NULL, NULL, 'Dolor vitae voluptas quas molestiae voluptas et et.', 42, 156, '12:17:45', '01:45:08', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(23, 'Littel, Kuhlman and Rempel', 'jkovacek@example.net', '(830) 562-2873', '85800 Borer Fords\nWestburgh, IA 18410-5084', 21.1112190, 105.9404520, NULL, NULL, 'Laudantium ut ex sed repudiandae.', 21, 155, '05:31:09', '17:31:03', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(24, 'Labadie Ltd', 'bernser@example.com', '1-253-985-1268', '22871 Frankie Island\nWest Myrna, NE 56931-1413', 21.1688040, 105.9830740, NULL, NULL, 'Ut numquam est voluptatem ea.', 48, 140, '03:59:14', '10:10:09', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(25, 'Lesch-Swaniawski', 'mlynch@example.org', '+19855120530', '167 Cooper Junction Suite 737\nLake Janelleport, AL 64073-5852', 20.8867000, 105.9358700, NULL, NULL, 'Repellendus error aliquam provident reiciendis necessitatibus neque officiis.', 39, 141, '21:57:27', '07:02:52', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(26, 'Stroman Group', 'cristobal.bayer@example.net', '(520) 392-8420', '105 Vladimir Mills Suite 879\nPort Rashadview, ND 15849', 21.1390130, 105.9965690, NULL, NULL, 'Velit aut libero ut laudantium fugit sint.', 31, 158, '13:14:50', '09:17:43', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(27, 'Hane, Kerluke and Murphy', 'kris.benny@example.com', '+1 (502) 563-1081', '927 Emmerich Pike\nWest Alvenaton, OR 12028', 21.0734990, 105.9903850, NULL, NULL, 'Sit quas accusamus et.', 17, 178, '08:12:04', '04:29:51', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(28, 'Russel, Roberts and Cummerata', 'lritchie@example.net', '+1-272-504-9251', '54467 Henriette Causeway\nKosschester, KS 42428-9783', 20.9462010, 105.9274060, NULL, NULL, 'Animi incidunt minima sunt corporis.', 13, 88, '07:44:46', '09:30:19', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(29, 'Harris, McCullough and Abbott', 'aric.reichel@example.org', '520.454.2295', '3491 Sauer Divide\nLake Juvenalburgh, VA 21770-8035', 21.0777490, 105.7002530, NULL, NULL, 'Qui est vel minus.', 16, 133, '06:43:55', '11:33:14', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(30, 'Shields-Cummerata', 'anderson.lucious@example.net', '478-570-6820', '253 Mya Ways\nSchmidtside, KS 51588', 20.9680030, 105.8788530, NULL, NULL, 'Ab id consequuntur sit.', 21, 105, '19:12:13', '18:08:50', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(32, 'Trill Rooftop Cafe', 'johnwick37@example.net', '+1-984-492-1234', '1 Nguy Nhu Kon Tum, Nhan Chinh, Thanh Xuan, Ha Noi', 21.0030547, 105.8053927, '/storage/images/1735641954_avatar_6773cb6239d82.jpg', '[\"\\/storage\\/images\\/1735641954_media_6773cb62b4757.jpg\",\"\\/storage\\/images\\/1735641954_media_6773cb62b5148.jpg\",\"\\/storage\\/images\\/1735641954_media_6773cb62b58ea.jpg\",\"\\/storage\\/images\\/1735641954_media_6773cb62b5e3e.jpg\",null]', 'Trill Rooftop Cafeは、ハノイで最もユニークなルーフトップカフェの一つとして知られています。このカフェは高層ビルの屋上に位置し、都市全体の素晴らしい景色を楽しむことができます。広々としたオープンエアスペースには、快適なソファやカラフルな装飾が施されており、訪れる人々に都会の喧騒から離れたリラックスした空間を提供します。夜になると、ロマンチックな照明が空間を照らし、特にカップルや友人との時間を楽しむのに最適な場所となります。 メニューには、クラシックなコーヒーからフレッシュジュース、特製カクテルまで幅広い選択肢が用意されています。「Trillスペシャルコーヒー」や、人気の「トロピカルフルーツスムージー」は、訪問者に好評です。また、フレンドリーなスタッフと細やかなサービスが、このカフェの魅力をさらに引き立てています。パーティーやイベントにも利用できるため、多目的な場所として人気があります。', 15, 150, '08:00:00', '22:00:00', '2024-12-29 21:09:09', '2024-12-31 03:45:54'),
(33, 'The Coffee House', 'hi@thecoffeehouse.vn', '+1800.6936', '1 Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi', 21.0308504, 105.7870396, '/storage/images/1735532883_avatar_677221539d60e.jpg', '[\"\\/storage\\/images\\/1735642757_media_6773ce85353a5.jpg\",\"\\/storage\\/images\\/1735642757_media_6773ce853a908.jpg\",\"\\/storage\\/images\\/1735642757_media_6773ce853b22a.jpg\",\"\\/storage\\/images\\/1735642757_media_6773ce853ba0e.jpg\"]', 'The Coffee Houseは、ベトナム全土で有名なカフェチェーンの一つで、スタイリッシュで親しみやすい雰囲気が特徴です。この店舗は広々としたスペースを持ち、自然光が差し込むデザインが、訪れる人々に快適さと温かみを与えます。木製の家具と緑の観葉植物が調和し、都会の中にいながらも穏やかな時間を過ごすことができます。\r\nメニューには、高品質なベトナムコーヒーから、アメリカンコーヒー、フルーツティー、そしてデザートまで幅広く揃っています。特に、アイスブレンディッドドリンクと「ホットシグネチャーコーヒー」が人気です。ビジネスパーソンがミーティングの場として利用することも多く、電源コンセントや無料Wi-Fiなどの設備も充実しています。一人でもグループでも、どんな場面にも適したカフェと言えます。', 40, 200, '08:00:00', '22:00:00', '2024-12-29 21:28:03', '2024-12-31 03:59:17'),
(34, 'Yu Tang', 'support.hn@ggg.com.vn', '+043 222 3000', '32 Chua Lang, Lang Thuong, Dong Da, Ha Noi', 21.0232359, 105.8077753, '/storage/images/1735533024_avatar_677221e087161.jpg', '[\"\\/storage\\/images\\/1735572707_media_6772bce3a7815.jpg\",\"\\/storage\\/images\\/1735572707_media_6772bce3aaa60.jpg\",\"\\/storage\\/images\\/1735572707_media_6772bce3ab298.jpg\",\"\\/storage\\/images\\/1735572707_media_6772bce3ab9c0.jpg\",null]', 'Yu Tangは、台湾風のモダンなカフェとして、特に若者やバブルティーファンに人気があります。インテリアはシンプルで洗練されており、木目調の家具と暖色系のライトが温かみのある空間を演出しています。壁には台湾文化を象徴するアート作品が飾られており、異国情緒を感じることができます。\r\nこのカフェの最大の魅力は、バリエーション豊富なタピオカミルクティーです。新鮮な材料を使ったドリンクは、甘さやトッピングをカスタマイズできるため、自分好みの一杯を楽しむことができます。また、軽食やデザートも提供されており、友達との会話や勉強の合間にぴったりです。気軽に立ち寄れる雰囲気が魅力のYu Tangは、一度訪れると何度も通いたくなる場所です。\r\n\r\n', 150, 300, '08:00:00', '22:30:00', '2024-12-29 21:30:24', '2024-12-30 08:31:47'),
(35, 'Cafe Nang Som', 'cafenangsom@gmail.com', '+18007070', '12 Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi', 21.0307253, 105.7857467, '/storage/images/1735533925_avatar_67722565bbf67.jpg', '[\"\\/storage\\/images\\/1735642388_media_6773cd147dfab.jpg\",\"\\/storage\\/images\\/1735642388_media_6773cd148397e.jpg\",\"\\/storage\\/images\\/1735642388_media_6773cd148409b.jpg\",\"\\/storage\\/images\\/1735642388_media_6773cd1484752.jpg\"]', 'Cafe Nắng Sớmは、その名の通り、朝日を浴びながら一日をスタートするのに最適なカフェです。シンプルで温かみのあるインテリアと、太陽の光が差し込む広々とした空間が特徴です。このカフェは、仕事の合間やリラックスしたいときに最適なスポットとして、地元の人々や観光客に愛されています。\r\nメニューには、クラシックなコーヒーから特製のフルーツジュースまで、多彩な選択肢が揃っています。特に「サンライズブレンドコーヒー」は、朝の目覚めにぴったりの一杯です。フレンドリーなスタッフが迎えてくれるこのカフェでは、静かな時間を楽しむことができます。', 160, 260, '07:00:00', '22:00:00', '2024-12-29 21:45:25', '2024-12-31 03:53:08'),
(36, 'Cup of Joy Coffee', 'withlovejoystudio@gmail.com', '0938891513', '35 Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi', 21.0310160, 105.7851382, '/storage/images/1735534129_avatar_67722631f30a1.png', '[\"\\/storage\\/images\\/1735572883_media_6772bd935f76d.jpg\",\"\\/storage\\/images\\/1735572883_media_6772bd936320c.jpg\",\"\\/storage\\/images\\/1735572883_media_6772bd93638f1.jpg\",\"\\/storage\\/images\\/1735572883_media_6772bd9363f5f.jpg\",null]', 'Cup of Joy Coffeeは、明るく楽しい雰囲気を提供するカフェです。このカフェは、カラフルな装飾とポジティブなメッセージが書かれたウォールアートで訪問者を歓迎します。特に若い世代やクリエイティブな雰囲気を好む人々に人気があります。\r\nメニューには、スペシャルコーヒーからスイーツまで豊富に揃っています。「ジョイフルアイスブレンド」と「ハンドメイドクッキー」は、このカフェのシグネチャーアイテムです。また、快適な座席と無料Wi-Fiが用意されており、勉強や仕事の場としても適しています。ポジティブなエネルギーに満ちたこのカフェは、毎日をちょっと楽しくしてくれる場所です。', 130, 230, '10:00:00', '21:00:00', '2024-12-29 21:48:50', '2024-12-30 08:34:43'),
(37, 'Fika Coffee & Bakery', 'fikahoian@gmail.com', '0983 671 191', '2 Tran Thai Tong, Dich Vong Hau, Cau Giay, Ha Noi', 21.0360679, 105.7892565, '/storage/images/1735534378_avatar_6772272a0aee1.png', '[\"\\/storage\\/images\\/1735643028_media_6773cf9411566.jpg\",\"\\/storage\\/images\\/1735643028_media_6773cf9417db4.jpg\",\"\\/storage\\/images\\/1735643028_media_6773cf94188eb.jpg\",\"\\/storage\\/images\\/1735643028_media_6773cf9418f85.jpg\"]', 'Fika Coffee & Bakeryは、スカンジナビアスタイルを取り入れたモダンなカフェです。「Fika」という言葉は、スウェーデン語で「コーヒーブレイク」を意味し、このカフェはその名の通り、ゆったりとしたひと時を楽しむための場所を提供しています。\r\nインテリアはミニマルで、白と木目調のデザインが調和し、シンプルながらも洗練された雰囲気を醸し出しています。特製のコーヒーと一緒に楽しめる焼きたてのペストリーやケーキが豊富に揃い、特に「シナモンロール」や「チーズケーキ」が人気です。また、広々とした空間と落ち着いた音楽が、勉強や読書にも最適な環境を提供しています。家族や友人と、あるいは一人でも気軽に訪れたい場所です。', 40, 140, '09:00:00', '22:00:00', '2024-12-29 21:52:58', '2024-12-31 04:03:48'),
(38, 'Roxy Coffee & Tea', 'archie.macculloch260@btinternet.com', '0978 199 786', '18 Nguyen Hoang, My Dinh 2, Nam Tu Liem, Ha Noi', 21.0329713, 105.7735615, '/storage/images/1735643298_avatar_6773d0a2e0533.jpg', '[\"\\/storage\\/images\\/1735643223_media_6773d05778f58.jpg\",\"\\/storage\\/images\\/1735643223_media_6773d0577c2a7.jpg\",\"\\/storage\\/images\\/1735643223_media_6773d0577cc6f.jpg\",\"\\/storage\\/images\\/1735643223_media_6773d0577d353.jpg\"]', 'Roxy Coffee & Teaは、カジュアルでフレンドリーな雰囲気を持つカフェとして、多くの地元の人々に愛されています。このカフェは、通りに面した便利なロケーションに位置し、軽食やドリンクを楽しむのに理想的なスポットです。\r\nメニューには、クラシックなベトナムコーヒーから創造的なフルーツティーまで幅広く揃っています。「ハニーレモンティー」や「スムーズブレンドコーヒー」は、訪れる人々の間で特に人気があります。インテリアはシンプルながらも温かみがあり、フレンドリーなスタッフが迎えてくれるため、初めて訪れる人もすぐにリラックスできるでしょう。手頃な価格設定と居心地の良い空間が魅力的です。', 30, 150, '07:00:00', '22:30:00', '2024-12-29 22:00:33', '2024-12-31 04:08:18'),
(39, 'Blackbird Coffee Roasters', 'blackbirdcoffeevn@gmail.com', '0389 513 053', '3 Le Duc Tho, My Dinh 1, Nam Tu Liem, Ha Noi', 21.0361390, 105.7709696, '/storage/images/1735534986_avatar_6772298a1c3e2.jpg', '[\"\\/storage\\/images\\/1735643443_media_6773d133abc8f.jpg\",\"\\/storage\\/images\\/1735643443_media_6773d133af492.jpg\",\"\\/storage\\/images\\/1735643443_media_6773d133afd0a.jpg\",\"\\/storage\\/images\\/1735643443_media_6773d133b07eb.jpg\"]', 'Blackbird Coffee Roastersは、コーヒー好きにはたまらない特別な場所です。このカフェは、自家焙煎した高品質なコーヒー豆を使用しており、その香りと味わいの深さで知られています。特に、スペシャルティコーヒーを提供する点で他のカフェとは一線を画しています。\r\n店内はモダンでスタイリッシュなデザインが特徴で、落ち着いた雰囲気が訪れる人々を引き付けます。バリスタが丁寧に作る「ハンドドリップコーヒー」や「カフェラテ」は、コーヒー通におすすめです。また、コーヒーと相性抜群のスイーツも充実しており、焼きたてのブラウニーやバナナケーキが特に好評です。一人で静かに時間を過ごしたい人や、コーヒーについて語り合いたい人にぴったりの場所です。', 45, 145, '09:00:00', '21:00:00', '2024-12-29 22:03:06', '2024-12-31 04:10:43'),
(40, 'Aroma Coffee', 'Aromacoffee2024@gmail.com', '091 414 55 88', '24 Nguyen Co Thach, My Dinh 1, Nam Tu Liem, Ha Noi', 21.0350709, 105.7655481, '/storage/images/1735535299_avatar_67722ac371794.png', '[\"\\/storage\\/media\\/1735535299_media_67722ac3746d3.jpg\",\"\\/storage\\/media\\/1735535299_media_67722ac374e97.jpg\",\"\\/storage\\/media\\/1735535299_media_67722ac37560b.jpg\",\"\\/storage\\/media\\/1735535299_media_67722ac375bdf.jpg\"]', 'Aroma Coffeeは、名前の通り、コーヒーの豊かな香りに包まれるカフェです。このカフェは、忙しい日常の中で一息つきたい人々に、静かでリラックスできる空間を提供します。\r\n木材を多用したインテリアと柔らかな照明が、暖かく居心地の良い雰囲気を作り出しています。メニューには、クラシックなエスプレッソやカプチーノのほか、「Aromaブレンドスペシャル」が人気で、一口飲むごとに深い満足感を味わえます。また、スムージーや軽食も用意されており、どんな時間帯でも楽しめる場所です。', 47, 180, '07:30:00', '23:00:00', '2024-12-29 22:08:19', '2024-12-29 22:08:19'),
(41, 'Cafe de Paris', 'cafedeparis@net.com', '0933 080 598', '10 Pham Van Bach, Dich Vong, Cau Giay, Ha Noi', 21.0270807, 105.7888987, '/storage/images/1735646567_avatar_6773dd677a5a2.jpg', '[\"\\/storage\\/images\\/1735646594_media_6773dd822a833.jpg\",\"\\/storage\\/images\\/1735646594_media_6773dd822e102.jpg\",\"\\/storage\\/images\\/1735646594_media_6773dd822e79d.jpg\",\"\\/storage\\/images\\/1735646594_media_6773dd822f078.jpg\"]', 'Cafe de Parisは、フランス風のエレガントな雰囲気を楽しめるカフェです。このカフェは、パリの街角にいるかのような感覚を味わいたい人々にとって理想的な場所です。クラシックなインテリアと、ヨーロッパスタイルのデコレーションが、訪れる人々を魅了します。\r\nメニューには、ラテアートが美しい「カフェラテ」や、フランス産の紅茶が楽しめる「アールグレイティー」など、こだわりのドリンクが揃っています。また、クロワッサンやマカロンといったフランスの伝統的なペストリーが提供されており、特に女性客に人気があります。友人や家族と楽しい時間を過ごすだけでなく、一人で静かにリラックスするのにも最適な場所です。\r\n\r\n必要であれば、さらに追加の説明や修正も承ります！', 60, 200, '09:00:00', '21:00:00', '2024-12-29 22:15:18', '2024-12-31 05:03:14'),
(42, 'Neo Cafe', 'neocafe.tech@gmail.com', '0335 133 420', '91 Trần Đại Nghĩa, Bách Khoa, Hai Bà Trưng, Hà Nội', 21.0062588, 105.8419767, '/storage/images/1735536031_avatar_67722d9f5381b.jpg', '[\"\\/storage\\/media\\/1735536031_media_67722d9f577d2.jpg\",\"\\/storage\\/media\\/1735536031_media_67722d9f57fbd.jpg\",\"\\/storage\\/media\\/1735536031_media_67722d9f585ec.jpg\",\"\\/storage\\/media\\/1735536031_media_67722d9f58ec2.jpg\"]', 'Neo Cafeは、都市の中心部に位置するシンプルで落ち着いたカフェで、忙しい日常の中で静かなひと時を過ごすのに最適な場所です。カフェのインテリアは、シンプルでありながら洗練されたデザインが特徴で、木材の温かみと柔らかな照明が心地よい雰囲気を作り出しています。\r\nこのカフェでは、ベトナムコーヒーやアメリカーノ、エスプレッソなどの定番のコーヒーに加え、フレッシュジュースや特製スムージーなどの飲み物が豊富に揃っています。コーヒーと共に楽しむことができる軽食やデザートも人気で、特に「チョコレートケーキ」や「パウンドケーキ」が訪れる人々に好評です。ゆったりとした空間で、仕事や勉強をするのにも最適なカフェです。', 40, 180, '07:00:00', '23:00:00', '2024-12-29 22:20:31', '2024-12-29 22:20:31'),
(43, 'Furin Coffee', 'furincoffee@gmail.com', '091689236', 'Ngõ 84 Trần Đại Nghĩa, Bách Khoa, Hai Bà Trưng, Hà Nội', 21.0062600, 105.8553700, '/storage/images/1735571796_avatar_6772b954092fe.jpg', '[\"\\/storage\\/media\\/1735571796_media_6772b95412375.jpg\",\"\\/storage\\/media\\/1735571796_media_6772b95412a7f.jpg\",\"\\/storage\\/media\\/1735571796_media_6772b95413229.jpg\",\"\\/storage\\/media\\/1735571796_media_6772b95413a4a.jpg\"]', 'Furin Coffeeは、静かな場所でリラックスした時間を楽しむことができるカフェです。店内は、木のぬくもりを感じさせるシンプルなデザインが特徴で、落ち着いた色調の家具が配置され、心地よい空間が広がっています。\r\n特にこのカフェで人気があるのは、さまざまな種類のコーヒーと一緒に楽しめる焼き立てのペストリーです。特に「カスタードクリームパイ」や「バナナブレッド」は絶品で、何度でも食べたくなる美味しさです。また、フレンドリーなスタッフが常に笑顔で迎えてくれるため、どこか温かみのあるカフェとして親しまれています。静かな時間を楽しみたい人々にとって、このカフェは一度訪れる価値のある場所です。', 185, 309, '07:00:00', '23:00:00', '2024-12-30 08:16:36', '2024-12-30 08:16:36'),
(44, 'Urban Station Coffee', 'urbanstationcoffee@gmail.com', '0917 510 505', 'Ngõ 82 P. Phạm Ngọc Thạch, Đống Đa, Hà Nội', 21.0200900, 105.8309700, '/storage/images/1735572158_avatar_6772babed01ea.jpg', '[\"\\/storage\\/media\\/1735572158_media_6772babed4096.jpg\",\"\\/storage\\/media\\/1735572158_media_6772babed4b30.jpg\",\"\\/storage\\/media\\/1735572158_media_6772babed50ca.png\",\"\\/storage\\/media\\/1735572158_media_6772babed5c24.jpg\"]', 'Urban Station Coffeeは、都会的なデザインと快適な空間を提供するカフェです。店内はモダンでスタイリッシュなインテリアが特徴で、コーヒーショップとしての定番の雰囲気を持ちつつも、どこかリラックスできる雰囲気が漂っています。特に、電源とWi-Fiが完備されているため、仕事や勉強をする人々にとっては理想的な場所となっています。\r\nコーヒーメニューは豊富で、「アイスカフェラテ」や「カプチーノ」などの定番に加え、季節限定のドリンクも提供されています。また、スナックや軽食もあり、特に「ベーグルサンドウィッチ」や「クッキー」が人気です。都会的な雰囲気と共に、仕事や友達との時間を楽しむことができるカフェです。', 185, 310, '07:40:00', '22:45:00', '2024-12-30 08:22:38', '2024-12-30 08:22:38'),
(45, 'Cafe Sách Bách Khoa', 'cafesachbachkhoa@gmail.com', '0964 297 512', '5, Đại La, Hai Bà Trưng, Hà Nội', 21.0062600, 105.8553700, '/storage/images/1735572444_avatar_6772bbdc6700c.jpg', '[\"\\/storage\\/media\\/1735572444_media_6772bbdc6b379.jpg\",\"\\/storage\\/media\\/1735572444_media_6772bbdc6bc9e.jpg\",\"\\/storage\\/media\\/1735572444_media_6772bbdc6c598.jpg\",\"\\/storage\\/media\\/1735572444_media_6772bbdc6cc4a.jpg\"]', 'Cafe Sách Bách Khoaは、読書や静かな時間を楽しむことができる特別なカフェです。図書館のようにたくさんの本が並べられており、コーヒーを片手に読書を楽しむことができる空間が広がっています。店内はシンプルでありながらも温かみのあるインテリアが特徴で、リラックスできる雰囲気が漂っています。\r\nコーヒーメニューには、クラシックなコーヒーのほか、特製の「抹茶ラテ」や「アイスティー」もあり、読書や作業の合間にぴったりです。軽食としては、ベーカリーやサンドイッチなどが提供されており、「クロワッサン」や「チーズトースト」が特に人気です。本を読みながらゆったりとした時間を過ごすには最適なカフェです。', 165, 310, '08:30:00', '23:30:00', '2024-12-30 08:27:24', '2024-12-30 08:27:24'),
(46, 'The Coffee House 1', 'thecoffeehouse@contact.vn', '0243 123 4567', '213 Trần Đại Nghĩa, Hai Bà Trưng, Hà Nội', 20.9983018, 105.8463195, '/storage/images/1735637902_avatar_6773bb8eef5b2.jpg', '[\"\\/storage\\/media\\/1735637903_media_6773bb8fa278f.jpg\",\"\\/storage\\/media\\/1735637903_media_6773bb8fa362d.jpg\",\"\\/storage\\/media\\/1735637903_media_6773bb8fa3c34.jpg\",\"\\/storage\\/media\\/1735637903_media_6773bb8fa438b.jpg\"]', 'The Coffee Houseは、ベトナム全土で人気のあるカフェチェーンで、シンプルで落ち着いた雰囲気が特徴です。広々とした空間とモダンなインテリアが、快適なカフェ体験を提供します。店内には、木製の家具や緑の観葉植物が配置され、訪れる人々にリラックスした時間を提供しています。\r\nメニューには、ベトナムコーヒーをはじめとする多彩なコーヒーが揃い、特に「アイスブレンドコーヒー」や「ホットラテ」が人気です。さらに、スイーツや軽食も充実しており、「チョコレートケーキ」や「ベーグルサンドイッチ」が特に好評です。このカフェは、仕事や勉強をするためにも、友達との会話を楽しむためにもぴったりの場所です。', 50, 200, '07:00:00', '22:00:00', '2024-12-31 02:38:23', '2024-12-31 02:38:23'),
(47, 'Mộc An Coffee & Tea', 'mocan.coffee@gmail.com', '0243 234 5678', '65 Trần Đại Nghĩa, Hai Bà Trưng, Hà Nội', 21.0062588, 105.8419767, '/storage/images/1735644160_avatar_6773d4004692b.jpg', '[\"\\/storage\\/images\\/1735644160_media_6773d4004a8de.jpg\",\"\\/storage\\/images\\/1735644160_media_6773d4004b788.jpg\",\"\\/storage\\/images\\/1735644160_media_6773d4004c18d.jpg\",\"\\/storage\\/images\\/1735644160_media_6773d4004cf3f.jpg\",null]', 'Mộc An Coffee & Teaは、自然をテーマにしたカフェで、木のぬくもりを感じることができる温かい雰囲気が特徴です。店内は、木材を基調にしたシンプルでありながら落ち着いたデザインが施されており、訪れる人々にリラックスした時間を提供します。大きな窓から自然光が差し込み、まるで森の中にいるかのような感覚を味わえる空間です。\r\nメニューには、豊富な種類のコーヒーやティーがあり、特にベトナム風のアイスコーヒーや、さっぱりとしたフルーツティーが人気です。また、手作りのペストリーや軽食も揃っており、「バナナブレッド」や「チョコレートケーキ」が特に好評です。落ち着いた環境で友達との会話を楽しむこともできますし、一人で静かな時間を過ごすのにも最適なカフェです。', 25, 60, '08:00:00', '21:30:00', '2024-12-31 02:41:29', '2024-12-31 04:22:40'),
(48, 'Kope coffee', 'kopecoffee@gmail.com', '0243 345 6789', '75 Trần Đại Nghĩa, Hai Bà Trưng, Hà Nội', 21.0057868, 105.8458355, '/storage/images/1735644349_avatar_6773d4bda551e.jpg', '[\"\\/storage\\/images\\/1735644349_media_6773d4bda7e2e.jpg\",\"\\/storage\\/images\\/1735644349_media_6773d4bda86a1.jpg\",\"\\/storage\\/images\\/1735644349_media_6773d4bda8f21.jpg\",\"\\/storage\\/images\\/1735644349_media_6773d4bda9887.jpg\",null]', 'Kope Coffeeは、こだわりのコーヒーとリラックスできる空間を提供するカフェです。このカフェでは、厳選されたコーヒー豆を使用し、バリスタが丁寧に淹れたコーヒーを楽しむことができます。店内はモダンでシンプルなデザインが特徴で、都会的な雰囲気が漂っています。\r\n「カプチーノ」や「アメリカーノ」といった定番のコーヒーはもちろん、フルーツを使った「アイスラテ」や「抹茶ラテ」などもあり、どんな気分でも楽しめます。さらに、スイーツや軽食も提供されており、「クロワッサン」や「ベーグルサンド」が人気です。静かな空間でゆったりとした時間を過ごすことができるため、勉強や仕事をする人にもおすすめです。', 20, 50, '08:00:00', '22:00:00', '2024-12-31 02:43:48', '2024-12-31 04:25:49'),
(49, 'Maxx Cafe', 'maxxcafe@contact.vn', '0243 456 7890', '119 Trần Đại Nghĩa, Hai Bà Trưng, Hà Nội', 21.0022244, 105.8449794, '/storage/images/1735644513_avatar_6773d561d3f69.jpg', '[\"\\/storage\\/images\\/1735644747_media_6773d64baa2df.jpg\",\"\\/storage\\/images\\/1735644747_media_6773d64bae830.jpg\",\"\\/storage\\/images\\/1735644747_media_6773d64baf064.jpg\",\"\\/storage\\/images\\/1735644747_media_6773d64baf9ce.jpg\",null]', 'マックスカフェは、活気に満ちたカフェでありながら、落ち着いた雰囲気も併せ持つ場所です。カジュアルな内装と開放感のある空間が特徴で、友達と一緒にくつろぐのにぴったりです。店内には大きなソファ席やテーブル席があり、グループでの利用にも最適です。\r\nメニューは、豊富なドリンクメニューとともに、軽食やスイーツも充実しています。「アイスカフェラテ」や「フラペチーノ」などの冷たいドリンクが人気で、特に「ブルーベリーチーズケーキ」や「チョコレートムース」が好評です。明るくて楽しい雰囲気の中でリラックスできるカフェで、忙しい日常から一息つきたいときにぴったりです。', 25, 65, '07:30:00', '22:00:00', '2024-12-31 02:45:09', '2024-12-31 04:32:27'),
(52, 'Cafe Hầm Trú Ẩn', 'hamtruan.cafe@gmail.com', '0243 567 8901', '101 Nguyễn Hiền, Bách Khoa, Hai Bà Trưng, Hà Nội', 21.0008258, 105.8472641, '/storage/images/1735644963_avatar_6773d7237a954.jpg', '[\"\\/storage\\/images\\/1735644963_media_6773d7237d21a.jpg\",\"\\/storage\\/images\\/1735644963_media_6773d7237daa0.jpg\",\"\\/storage\\/images\\/1735644963_media_6773d7237e1f3.jpg\",\"\\/storage\\/images\\/1735644963_media_6773d7237edd0.jpg\",null]', 'Cafe Hầm Trú Ẩnは、地下に隠れた秘密のカフェのような雰囲気を持っています。店内は、暗めの照明と落ち着いた色調が特徴で、静かな空間でゆったりとした時間を過ごすことができます。名前の通り、「隠れ家」としての雰囲気があり、他のカフェと比べて静かでリラックスできる環境が整っています。\r\nメニューには、深い味わいのあるコーヒーや、スムージー、ティーが揃っており、特に「ベトナムアイスコーヒー」や「ミルクティー」が人気です。また、軽食やスイーツも豊富で、「シナモンロール」や「アップルパイ」が特に評判です。少し落ち着いた空間で、静かな時間を楽しむのに最適なカフェです。', 20, 60, '09:00:00', '22:00:00', '2024-12-31 02:53:11', '2024-12-31 04:36:03'),
(53, 'Tiệm Cà Phê Nhà Bình An', 'nhabinhancafe@gmail.com', '0243 678 9012', 'Ngõ 121 Lê Thanh Nghị, Hai Bà Trưng, Hà Nội', 21.0015668, 105.8429287, '/storage/images/1735645163_avatar_6773d7eb9355e.jpg', '[\"\\/storage\\/images\\/1735645163_media_6773d7eb977ff.jpg\",\"\\/storage\\/images\\/1735645163_media_6773d7eb98071.jpg\",\"\\/storage\\/images\\/1735645163_media_6773d7eb98a30.jpg\",\"\\/storage\\/images\\/1735645163_media_6773d7eb99436.jpg\",null]', 'Tiệm Cà Phê Nhà Bình Anは、温かく、家庭的な雰囲気を持つカフェです。店内は、木製の家具と温かみのある照明が特徴で、まるで自宅にいるかのようなリラックスした空間が広がっています。おしゃれで落ち着いたインテリアは、静かで穏やかな時間を過ごすのにぴったりです。\r\nメニューには、コーヒーやお茶、フレッシュジュースが豊富に揃っており、特に「抹茶ラテ」や「カフェマキアート」が人気です。スイーツや軽食も提供されており、「シフォンケーキ」や「ベーグルサンド」が特に評判です。友達と一緒にくつろぐのにも、ひとりで静かな時間を楽しむのにも最適なカフェです。', 15, 50, '08:00:00', '21:00:00', '2024-12-31 02:54:18', '2024-12-31 04:39:23'),
(54, 'DayTea', 'daytea@contact.vn', '0243 789 0123', '2 Nguyễn Hiền, Bách Khoa, Hai Bà Trưng, Hà Nội', 21.0008258, 105.8472641, '/storage/images/1735645453_avatar_6773d90dc0c07.jpg', '[\"\\/storage\\/images\\/1735645453_media_6773d90dc5357.jpg\",\"\\/storage\\/images\\/1735645453_media_6773d90dc5bc0.jpg\",\"\\/storage\\/images\\/1735645453_media_6773d90dc6383.jpg\",\"\\/storage\\/images\\/1735645453_media_6773d90dc6be4.jpg\",null]', 'DayTeaは、フレッシュで軽やかなドリンクを提供するカフェです。店内は明るく開放的な雰囲気が漂っており、ナチュラルな素材を使ったインテリアが特徴です。特に、自然光がたっぷり差し込む大きな窓があり、リラックスした時間を過ごすには最適な場所です。\r\nこのカフェでは、フレッシュジュースやスムージー、アイスティーなど、ヘルシーでフルーティーなドリンクを中心に取り揃えています。また、「フルーツタルト」や「チーズケーキ」などのスイーツも豊富で、ドリンクと一緒に楽しむことができます。爽やかな空間で、リフレッシュしたいときにぴったりのカフェです。', 25, 55, '09:00:00', '22:00:00', '2024-12-31 02:55:16', '2024-12-31 04:44:13'),
(55, 'Aha coffee', 'aha.coffee@gmail.com', '0243 890 1234', '110 Trần Đại Nghĩa, Hai Bà Trưng, Hà Nội', 21.0075355, 105.8440408, '/storage/images/1735645598_avatar_6773d99e18c08.jpg', '[\"\\/storage\\/images\\/1735645598_media_6773d99e1bed5.jpg\",\"\\/storage\\/images\\/1735645598_media_6773d99e1c58b.jpg\",\"\\/storage\\/images\\/1735645598_media_6773d99e1d098.jpg\",\"\\/storage\\/images\\/1735645598_media_6773d99e1da97.jpg\",null]', 'Aha Coffeeは、シンプルでありながら心地よいカフェです。店内はモダンで洗練されたデザインが特徴で、白を基調とした空間に木材の家具が配置され、落ち着いた雰囲気を提供しています。静かな環境で、友達と一緒に会話を楽しむのにも最適な場所です。\r\nメニューには、ベトナムコーヒーを中心に、さまざまなコーヒードリンクが揃っています。特に「アイスカフェラテ」や「フレンチプレスコーヒー」が人気で、豊かな味わいが楽しめます。また、スイーツや軽食も充実しており、「チョコレートケーキ」や「パウンドケーキ」が特に評判です。シンプルで落ち着いた空間で、リラックスしたひとときを過ごすことができます。', 20, 50, '07:00:00', '23:00:00', '2024-12-31 02:56:11', '2024-12-31 04:46:38'),
(56, 'Indoor', 'indoor.cafe@gmail.com', '0243 901 2345', '12 Nguyễn Hiền, Bách Khoa, Hai Bà Trưng, Hà Nội', 21.0008258, 105.8472641, '/storage/images/1735645674_avatar_6773d9ea9a30e.jpg', '[\"\\/storage\\/images\\/1735645674_media_6773d9ea9c5f5.jpg\",\"\\/storage\\/images\\/1735645674_media_6773d9ea9ce5e.jpg\",\"\\/storage\\/images\\/1735645674_media_6773d9ea9d618.jpg\",\"\\/storage\\/images\\/1735645674_media_6773d9ea9dcf4.jpg\",null]', 'indoorは、スタイリッシュでモダンなカフェであり、都会的な雰囲気が漂っています。店内はシンプルでありながら、洗練されたデザインが施されており、落ち着いた色調のインテリアが特徴です。シンプルながらも広々とした空間が、リラックスした時間を提供します。\r\nこのカフェでは、豊富な種類のコーヒーを提供しており、特に「カフェラテ」や「カプチーノ」が人気です。加えて、フレッシュジュースやスムージーもあり、健康的なドリンクを楽しむことができます。また、軽食やスイーツも充実しており、「パウンドケーキ」や「クロワッサン」が好評です。都会的な雰囲気で、ゆったりと過ごしたいときにぴったりのカフェです。', 30, 70, '08:00:00', '22:00:00', '2024-12-31 02:57:33', '2024-12-31 04:47:54'),
(57, 'ニャットアンコーヒーショップ', 'nhatanh.cafe@gmail.com', '0243 012 3456', 'Ngõ 148 Lê Thanh Nghị, Hai Bà Trưng, Hà Nội', 21.0062600, 105.8553700, '/storage/images/1735645783_avatar_6773da5756252.jpg', '[\"\\/storage\\/images\\/1735645783_media_6773da5758807.jpg\",\"\\/storage\\/images\\/1735645783_media_6773da5758ea5.jpg\",\"\\/storage\\/images\\/1735645783_media_6773da57596f6.jpg\",\"\\/storage\\/images\\/1735645783_media_6773da575a217.jpg\",null]', 'ニャットアンコーヒーショップは、シンプルで落ち着いた雰囲気のカフェで、静かな空間でリラックスしたひとときを過ごすのにぴったりの場所です。店内は木のぬくもりを感じさせるインテリアが特徴で、シンプルながら心地よい空間が広がっています。カフェはまるで自宅のように温かく、気軽に訪れることができます。\r\nこのカフェでは、ベトナムコーヒーやアメリカーノなどの定番メニューをはじめ、スムージーやティーなどの軽いドリンクも提供されています。特に、「アイスカフェ」や「バタフライピーソーダ」が人気です。さらに、軽食やデザートも提供されており、「ベーグルサンド」や「カスタードケーキ」が特に評判です。静かな時間を過ごしたい方にぴったりのカフェです。', 20, 60, '09:00:00', '21:30:00', '2024-12-31 02:59:25', '2024-12-31 04:49:43'),
(58, 'Lousie de café', 'lousie.cafe@gmail.com', '0243 123 6789', '140 Lê Thanh Nghị, Bách Khoa, Hai Bà Trưng, Hà Nội', 21.0026564, 105.8458537, '/storage/images/1735646008_avatar_6773db38bd4f9.jpg', '[\"\\/storage\\/images\\/1735646008_media_6773db38c13a8.jpg\",\"\\/storage\\/images\\/1735646008_media_6773db38c1984.jpg\",\"\\/storage\\/images\\/1735646008_media_6773db38c2346.jpg\",\"\\/storage\\/images\\/1735646008_media_6773db38c2d22.jpg\",null]', 'Lousie de caféは、エレガントでおしゃれなカフェで、パリ風のデザインが特徴です。店内は洗練されたインテリアが施され、白を基調にした空間に花や観葉植物が飾られています。おしゃれでありながら、居心地の良い空間で、落ち着いた時間を過ごすことができます。\r\nこのカフェのメニューには、フレッシュなコーヒーや、さまざまな種類の紅茶、スムージーが揃っています。特に、「アイスラテ」や「カフェモカ」が人気で、豊かな味わいを楽しむことができます。さらに、スイーツや軽食も充実しており、「クロワッサン」や「ラズベリータルト」が特に好評です。優雅な雰囲気の中で、ゆったりとした時間を楽しむのに最適なカフェです。', 35, 80, '08:00:00', '22:30:00', '2024-12-31 03:00:29', '2024-12-31 04:53:28'),
(59, 'Cloudy Coffee', 'cloudycoffee@contact.vn', '0243 111 2233', '7 Dương Đình Nghệ, Yên Hoà, Cầu Giấy, Hà Nội', 21.0226421, 105.7879811, '/storage/images/1735646114_avatar_6773dba2813ba.jpg', '[\"\\/storage\\/images\\/1735646114_media_6773dba283922.jpg\",\"\\/storage\\/images\\/1735646114_media_6773dba2841fb.jpg\",\"\\/storage\\/images\\/1735646114_media_6773dba2849d5.jpg\",\"\\/storage\\/images\\/1735646114_media_6773dba285369.jpg\"]', 'Cloudy Coffeeは、現代的なデザインとミニマリストなスタイルが融合したユニークなカフェです。シンプルで洗練されたインテリアが特徴で、自然光を取り入れた広々とした空間は、リラックスした時間を過ごすのに最適です。特に、若者やビジネスパーソンに人気があり、快適な座席と無料Wi-Fiが提供されているため、作業や勉強にもぴったりです。 メニューには、クラシックなコーヒーからユニークなドリンク、軽食まで幅広く取り揃えています。特に、カフェラテやシグネチャードリンク「Cloudy Special」は、多くの訪問者に愛されています。また、フレンドリーなスタッフと迅速なサービスが、このカフェの魅力の一つです。友人や家族との集まり、または個人的な時間を楽しむ場所として、Cloudy Coffeeは訪れる価値があります。', 30, 70, '07:00:00', '22:00:00', '2024-12-31 03:05:53', '2024-12-31 04:55:14'),
(60, 'Tropical Vibes Cafe', 'tropicalvibes@gmail.com', '0243 222 3344', '15 Trung Kính, Yên Hoà, Cầu Giấy, Hà Nội', 21.0201047, 105.7912340, '/storage/images/1735646206_avatar_6773dbfe1be09.jpg', '[\"\\/storage\\/images\\/1735646206_media_6773dbfe1e73f.jpg\",\"\\/storage\\/images\\/1735646206_media_6773dbfe1eda8.jpg\",\"\\/storage\\/images\\/1735646206_media_6773dbfe1f785.jpg\",\"\\/storage\\/images\\/1735646206_media_6773dbfe1fff2.jpg\",null]', 'Tropical Vibes Cafeは、忙しい日常生活から離れて、リラックスできるトロピカルなオアシスを提供します。このカフェは、鮮やかな色使いとエキゾチックな装飾でデザインされており、南国のリゾート地にいるかのような雰囲気を楽しめます。インテリアだけでなく、音楽や香りもテーマに合わせて統一されており、訪れる人々に完全なリラクゼーションを提供します。 メニューには、新鮮なフルーツを使用したスムージーやトロピカルカクテルが揃っており、特に「Mango Paradise」や「Pineapple Breeze」は大人気です。カフェスペースは広く、ソファ席やテラス席が用意されているため、グループでも一人でも快適に過ごせます。忙しい日常を忘れ、自然とつながるひとときを提供してくれる、まさに癒しのスポットです。', 35, 75, '08:00:00', '22:30:00', '2024-12-31 03:06:46', '2024-12-31 04:56:46'),
(61, 'Vintage Coffee', 'vintagecoffee@gmail.com', '0243 333 4455', '8 Nguyễn Văn Huyên, Nghĩa Đô, Cầu Giấy, Hà Nội', 21.0434698, 105.7977253, '/storage/images/1735646314_avatar_6773dc6a8bb81.jpg', '[\"\\/storage\\/images\\/1735646314_media_6773dc6a8e0c3.jpg\",\"\\/storage\\/images\\/1735646314_media_6773dc6a8e854.jpg\",\"\\/storage\\/images\\/1735646314_media_6773dc6a8f0f7.jpg\",\"\\/storage\\/images\\/1735646314_media_6773dc6a8f902.jpg\"]', 'Vintage Coffeeは、名前の通りヴィンテージスタイルでデザインされたカフェです。クラシックな木製家具、温かみのある照明、そして古いレコードや本が並ぶ棚が、訪れる人々に懐かしさと落ち着きを与えます。このカフェは、都会の喧騒を忘れ、静かに時間を楽しむのに理想的な場所です。 コーヒー愛好者にはたまらない、特製のドリップコーヒーやカプチーノがおすすめです。また、軽食やデザートも豊富に取り揃えており、友人とのおしゃべりや読書の伴侶として最適です。スタッフは親切で、サービスの質も高いため、何度でも訪れたくなるような雰囲気があります。デートや静かな時間を過ごしたいときに、ぜひ訪れてみてください。', 25, 60, '07:30:00', '22:00:00', '2024-12-31 03:07:44', '2024-12-31 04:58:34'),
(62, 'Blue Moon Cafe', 'bluemooncafe@gmail.com', '0243 444 5566', '20 Mễ Trì Thượng, Mễ Trì, Nam Từ Liêm, Hà Nội', 21.0087309, 105.7777606, '/storage/images/1735646409_avatar_6773dcc999624.jpg', '[\"\\/storage\\/images\\/1735646409_media_6773dcc99cfdd.jpg\",\"\\/storage\\/images\\/1735646409_media_6773dcc99d6eb.jpg\",\"\\/storage\\/images\\/1735646409_media_6773dcc99dc8f.jpg\",\"\\/storage\\/images\\/1735646409_media_6773dcc99e43c.jpg\"]', 'Blue Moon Cafeは、特別な瞬間を過ごしたい人々にぴったりのカフェです。インテリアは、月夜をイメージしたロマンチックで落ち着いた雰囲気で、カップルや一人で訪れる人々に人気があります。柔らかな照明と居心地の良い家具が、リラックスした時間を提供します。 メニューには、高品質なコーヒーやティー、そして特製のデザートが含まれています。「Blue Moon Special」は、カフェの名物ドリンクで、多くの人に愛されています。さらに、屋外席も完備されており、心地よい風を感じながら過ごすことができます。特別な日に訪れたい、とっておきのスポットです。', 40, 60, '09:00:00', '23:00:00', '2024-12-31 03:09:04', '2024-12-31 05:00:09'),
(63, 'Halo Coffee', 'halocoffee@gmail.com', '0243 555 6677', '5 Lê Quang Đạo, Mỹ Đình 1, Nam Từ Liêm, Hà Nội', 21.0245000, 105.8411700, '/storage/images/1735646513_avatar_6773dd31d5d3e.jpg', '[\"\\/storage\\/images\\/1735652219_media_6773f37b3912a.webp\",\"\\/storage\\/images\\/1735652219_media_6773f37b48bd5.png\",\"\\/storage\\/images\\/1735652219_media_6773f37b49b0c.jpg\",\"\\/storage\\/images\\/1735652219_media_6773f37b4a803.png\",null]', 'Halo Coffeeは、日常の喧騒から逃れて、リフレッシュしたい人々に最適なカジュアルカフェです。このカフェは、明るく活気のある雰囲気で、若者や家族連れに特に人気があります。壁にはユニークなアート作品が飾られ、空間全体がモダンでありながら親しみやすいデザインになっています。 メニューは手頃な価格でありながら、質の高いドリンクを提供しています。特に、ミルクティーやフルーツティーはこのカフェの定番です。スタッフはフレンドリーで、サービスも迅速かつ丁寧です。友人と楽しいひとときを過ごしたり、仕事や学業の合間にリフレッシュするのに最適な場所です。', 20, 50, '08:00:00', '21:30:00', '2024-12-31 03:09:57', '2024-12-31 06:36:59');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `restaurants_styles`
--

CREATE TABLE `restaurants_styles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `style_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `restaurants_styles`
--

INSERT INTO `restaurants_styles` (`id`, `restaurant_id`, `style_id`) VALUES
(1, 1, 1),
(2, 1, 3),
(3, 1, 4),
(4, 2, 2),
(7, 4, 3),
(8, 4, 6),
(9, 5, 3),
(10, 5, 4),
(11, 5, 6),
(12, 6, 1),
(13, 7, 2),
(14, 7, 5),
(15, 8, 6),
(16, 9, 1),
(17, 9, 2),
(18, 9, 6),
(19, 10, 5),
(20, 11, 6),
(21, 12, 1),
(22, 12, 3),
(23, 12, 6),
(24, 13, 1),
(25, 13, 3),
(26, 13, 6),
(27, 14, 3),
(28, 15, 2),
(29, 16, 5),
(30, 17, 6),
(31, 18, 1),
(32, 18, 2),
(33, 19, 2),
(34, 19, 4),
(35, 20, 2),
(36, 20, 6),
(37, 21, 2),
(38, 21, 4),
(39, 22, 1),
(40, 22, 3),
(41, 23, 6),
(42, 24, 2),
(43, 25, 1),
(44, 25, 2),
(45, 26, 5),
(46, 27, 4),
(47, 28, 5),
(48, 29, 3),
(49, 29, 5),
(50, 30, 2),
(51, 30, 3),
(52, 30, 6),
(53, 32, 1),
(54, 33, 2),
(55, 34, 3),
(56, 35, 3),
(57, 36, 4),
(58, 37, 6),
(59, 38, 2),
(60, 39, 2),
(61, 40, 6),
(62, 41, 4),
(63, 42, 1),
(64, 43, 2),
(65, 44, 4),
(66, 45, 5),
(67, 46, 2),
(68, 47, 2),
(69, 48, 3),
(71, 52, 6),
(72, 53, 3),
(73, 54, 2),
(74, 55, 4),
(75, 56, 1),
(76, 57, 4),
(77, 58, 3),
(78, 59, 2),
(79, 60, 1),
(80, 61, 3),
(81, 62, 5),
(82, 63, 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `restaurant_id`, `rating`, `comment`, `image`, `created_at`, `updated_at`) VALUES
(1, 10, 1, 5, 'Modi aliquid necessitatibus accusantium ex rem ex expedita.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(2, 10, 1, 4, 'Aut ut ducimus quis officiis nesciunt dolorum voluptatem.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(3, 1, 1, 1, 'Debitis ipsa ut dicta aut est.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(4, 3, 1, 1, 'Placeat rerum vel explicabo temporibus.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(5, 2, 1, 5, 'Nobis nostrum ipsum nihil labore aut blanditiis exercitationem.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(6, 2, 2, 1, 'Dolor omnis facilis officia.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(7, 5, 2, 3, 'Excepturi est veritatis asperiores distinctio.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(8, 5, 2, 2, 'Ratione sit voluptas rem quisquam iure aliquam.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(9, 4, 2, 1, 'Quis est eum fuga.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(10, 1, 2, 3, 'Suscipit cupiditate rerum voluptatem a libero vel.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(11, 6, 2, 5, 'Mollitia quaerat voluptas et porro quia aut quae.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(18, 2, 4, 2, 'Et assumenda corrupti asperiores eveniet quo ad.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(19, 6, 4, 4, 'Veniam adipisci dolorum omnis.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(20, 10, 4, 1, 'Omnis reprehenderit laudantium reiciendis expedita architecto corporis dolorem voluptatum.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(21, 6, 4, 1, 'Reprehenderit unde aliquam voluptatem.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(22, 8, 4, 3, 'Aliquam quia hic commodi nobis deleniti mollitia.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(23, 6, 4, 5, 'Labore ea sint debitis hic.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(24, 10, 4, 3, 'Repudiandae rerum ut quia culpa illum.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(25, 5, 5, 3, 'Ipsa quisquam voluptatem soluta omnis.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(26, 4, 5, 5, 'Rem non et aut sunt labore dolorem.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(27, 10, 5, 4, 'Excepturi in ratione porro rem.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(28, 5, 5, 2, 'Rerum sit porro officiis eum qui culpa facilis.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(29, 4, 5, 1, 'Et sed minima dignissimos laudantium voluptate repudiandae velit quam.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(30, 1, 6, 2, 'Praesentium voluptatem dicta saepe velit.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(31, 3, 6, 5, 'Aliquam ratione distinctio architecto iste molestias facere eos quia.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(32, 4, 6, 2, 'Consequatur pariatur facere nemo repellendus.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(33, 3, 6, 3, 'Ut ipsum iste ipsa commodi ut.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(34, 2, 6, 2, 'Dolorum est consequatur sunt a.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(35, 10, 6, 3, 'Iusto delectus molestiae dolorem similique.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(36, 2, 6, 5, 'Exercitationem rem voluptates delectus sit dolore explicabo laboriosam.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(37, 7, 7, 2, 'Error aliquid aut et natus.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(38, 6, 7, 2, 'Aliquam magni consequatur ea maiores sit saepe sed.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(39, 5, 7, 3, 'Eos laudantium debitis corrupti dolorem aut.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(40, 4, 7, 4, 'Quas occaecati quaerat corrupti sapiente.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(41, 6, 7, 4, 'Deleniti beatae eveniet et ullam perspiciatis tempora.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(42, 2, 7, 1, 'Quos fugit aut aut aut provident sed quia.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(43, 6, 7, 3, 'Nemo sunt cumque error in et.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(44, 7, 8, 3, 'Aspernatur distinctio voluptas error sunt.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(45, 1, 8, 1, 'Reprehenderit quisquam qui quia voluptatem ex assumenda rerum commodi.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(46, 1, 8, 2, 'Aliquam culpa dolore qui dolorem ut saepe.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(47, 8, 8, 1, 'Cumque adipisci non nostrum sunt laudantium consectetur.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(48, 1, 8, 3, 'Commodi est aut numquam incidunt vel qui eligendi.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(49, 9, 8, 5, 'Accusantium molestias cum dolores alias aliquam et.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(50, 7, 9, 1, 'Blanditiis placeat et facere soluta ipsum ea.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(51, 8, 9, 3, 'Sint quas adipisci deleniti iure voluptatem architecto facilis.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(52, 3, 9, 5, 'Consequatur et nemo dolorem illum.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(53, 1, 9, 2, 'Error sunt saepe asperiores et nam.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(54, 10, 9, 2, 'Aspernatur qui hic cumque impedit aspernatur dolor.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(55, 7, 10, 1, 'Earum quidem et nesciunt dicta nemo similique.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(56, 2, 10, 5, 'Id eos eum neque id consequuntur provident rem.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(57, 4, 10, 2, 'Nulla esse accusantium possimus id nihil.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(58, 8, 10, 4, 'Facere aut eum tenetur corporis ipsa dolorem et facilis.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(59, 2, 10, 1, 'Quasi dolores debitis officia.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(60, 10, 11, 5, 'Quibusdam voluptatum odio ab consequuntur ullam suscipit.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(61, 9, 11, 4, 'Esse quasi ipsum deleniti sapiente.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(62, 7, 11, 3, 'Voluptates voluptatem nulla quos sunt.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(63, 9, 11, 1, 'Odio ipsam quia quod est amet enim.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(64, 1, 11, 5, 'Quod perspiciatis ut error voluptas id officia.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(65, 2, 12, 1, 'Quos quia ut impedit.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(66, 6, 12, 1, 'Recusandae recusandae ab eos quis.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(67, 1, 12, 3, 'Aliquam tenetur quae tempore vel quis voluptatibus.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(68, 3, 12, 5, 'Et sunt natus veritatis.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(69, 9, 12, 4, 'Unde sunt consequatur aliquid dicta molestiae ipsa.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(70, 8, 12, 5, 'Ea consequatur ad qui nemo culpa veniam.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(71, 1, 13, 2, 'Quo commodi ullam qui eius.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(72, 6, 13, 2, 'Rerum illo id quo voluptatibus dolores.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(73, 6, 13, 5, 'Reiciendis qui ut laboriosam iure architecto eum illo.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(74, 6, 13, 4, 'Mollitia et in odit nulla repellat ratione.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(75, 9, 13, 3, 'Quasi nihil aliquid et illum voluptatem neque.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(76, 4, 13, 3, 'Ad error sunt impedit aliquam qui aliquid nesciunt.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(77, 5, 13, 1, 'Repellendus maxime enim quo assumenda.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(78, 10, 14, 5, 'Ipsum qui quam quod error eum est et.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(79, 3, 14, 2, 'Maxime consectetur dolor ea aspernatur quia quaerat.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(80, 6, 14, 5, 'Ratione ut veniam nesciunt exercitationem est.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(81, 5, 14, 3, 'Omnis eos ullam voluptatem quam.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(82, 9, 14, 3, 'Totam omnis possimus molestiae magni et maxime et.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(83, 8, 14, 1, 'Temporibus nulla quas qui omnis.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(84, 10, 15, 4, 'Quidem ex et et culpa.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(85, 9, 15, 4, 'Non consectetur nulla et laborum voluptas voluptatem.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(86, 4, 15, 2, 'Corrupti et natus alias adipisci eveniet et perferendis.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(87, 7, 15, 5, 'In amet et sint dolore.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(88, 8, 15, 2, 'Natus voluptas quia illo voluptas.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(89, 9, 16, 2, 'Quidem modi sed delectus et.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(90, 9, 16, 3, 'Corporis debitis libero et repellendus eius aspernatur tempore atque.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(91, 2, 16, 2, 'Dolor quidem sequi expedita consectetur minus nobis.', NULL, '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(92, 5, 16, 4, 'Vel incidunt molestiae accusamus libero.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(93, 10, 16, 1, 'Nihil doloremque ut blanditiis quidem.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(94, 6, 16, 2, 'Consequatur libero optio provident accusamus et eius.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(95, 5, 16, 2, 'Labore ea porro et magnam pariatur ducimus.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(96, 6, 17, 5, 'Vitae hic mollitia aut totam et.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(97, 10, 17, 5, 'Non quod mollitia ut culpa consequatur blanditiis qui.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(98, 2, 17, 3, 'A omnis laborum voluptatem magnam ut alias animi.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(99, 6, 17, 3, 'Eius neque id inventore non iure.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(100, 8, 17, 5, 'Tenetur ut est nostrum necessitatibus est aliquid nisi debitis.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(101, 5, 17, 4, 'Consequatur ex officiis enim vero nam.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(102, 1, 18, 5, 'Dolor mollitia maiores rerum in.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(103, 9, 18, 3, 'Minus nam qui saepe provident quia.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(104, 5, 18, 5, 'Sequi omnis tempore ut aut aut aspernatur ad.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(105, 1, 18, 1, 'Veritatis est provident laborum error rerum.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(106, 5, 18, 3, 'Eos aliquam nesciunt exercitationem tempora.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(107, 8, 18, 1, 'Qui labore qui voluptate.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(108, 6, 18, 5, 'Perspiciatis non et cumque magni facilis veniam.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(109, 6, 19, 1, 'Voluptatem nostrum quos dignissimos et commodi molestiae.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(110, 6, 19, 5, 'Qui in voluptas aut ut cum.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(111, 2, 19, 4, 'Consequatur praesentium dolorum dolor.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(112, 8, 19, 1, 'Aut delectus mollitia occaecati in.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(113, 5, 19, 1, 'Sit ea voluptatem est et.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(114, 9, 20, 1, 'Eaque ut quaerat est tempore et provident.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(115, 8, 20, 5, 'Optio autem delectus consequatur et.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(116, 6, 20, 4, 'Voluptatibus sed repellat adipisci dicta quos animi.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(117, 8, 20, 3, 'Quia rem assumenda et molestiae.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(118, 5, 20, 1, 'Ut veritatis quia et impedit neque inventore aliquid ullam.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(119, 3, 20, 5, 'Ullam reprehenderit sunt rem consequatur.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(120, 5, 20, 2, 'Molestiae officia amet officiis aliquid dolores laudantium.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(121, 9, 21, 2, 'Laboriosam blanditiis dolorum maiores voluptatibus porro sit.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(122, 3, 21, 4, 'Ex sed ipsum perspiciatis qui sint ea.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(123, 10, 21, 2, 'Aut dolores aut quo at commodi facere.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(124, 2, 21, 3, 'Consectetur provident rerum eum exercitationem voluptatibus repellat nihil dolor.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(125, 6, 21, 4, 'Tenetur doloremque sequi ipsam.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(126, 3, 22, 2, 'Excepturi harum porro qui sint exercitationem.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(127, 3, 22, 5, 'Saepe hic qui animi consequatur nostrum.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(128, 9, 22, 4, 'Atque neque molestias minus at hic consectetur.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(129, 9, 22, 1, 'Quam id et occaecati expedita.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(130, 3, 22, 3, 'Autem quam laboriosam velit natus totam est.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(131, 4, 23, 2, 'Ut fuga illum quia pariatur autem eum.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(132, 3, 23, 3, 'Quod aperiam ea vitae aut veritatis consectetur nam eveniet.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(133, 7, 23, 5, 'Omnis doloribus in eum.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(134, 9, 23, 4, 'Eius quo quod est impedit.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(135, 5, 23, 3, 'Unde optio enim temporibus consectetur placeat consequatur blanditiis aliquam.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(136, 8, 23, 3, 'Placeat sint commodi aliquid est nesciunt.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(137, 5, 23, 1, 'Ea ipsa doloribus ipsum eum praesentium voluptas omnis et.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(138, 4, 24, 5, 'Accusantium omnis aut velit architecto voluptate.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(139, 3, 24, 5, 'Est blanditiis aperiam expedita sint dolore soluta.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(140, 1, 24, 5, 'Deleniti consequuntur est sit molestias atque nulla sit suscipit.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(141, 3, 24, 4, 'Molestiae distinctio nostrum aperiam tenetur.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(142, 1, 24, 5, 'Voluptas magnam incidunt accusamus fuga consequuntur porro.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(143, 10, 25, 2, 'Provident harum illo impedit omnis omnis voluptas nihil.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(144, 5, 25, 1, 'Neque sit et nostrum esse.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(145, 4, 25, 3, 'Saepe quos molestiae consequuntur explicabo voluptas qui veniam.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(146, 3, 25, 5, 'Aut architecto possimus nisi sed nesciunt.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(147, 1, 25, 4, 'Quis sint sed officia error.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(148, 8, 26, 1, 'Quaerat facere facilis voluptatem esse vel.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(149, 10, 26, 3, 'Consequatur libero alias animi praesentium veniam.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(150, 10, 26, 4, 'Cumque pariatur omnis occaecati nihil.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(151, 10, 26, 3, 'Quo tempore aut quisquam labore ut deleniti voluptatem cum.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(152, 6, 26, 3, 'Quia aut ipsum omnis incidunt repellat voluptate rem.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(153, 10, 26, 1, 'Nesciunt recusandae ratione adipisci asperiores illum consequatur.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(154, 10, 26, 1, 'Eligendi aut sint nisi.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(155, 10, 27, 3, 'Nobis asperiores exercitationem est placeat.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(156, 6, 27, 2, 'Voluptates est possimus quod labore atque ratione et.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(157, 8, 27, 5, 'Dolore non ut harum est velit et.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(158, 7, 27, 1, 'Dolorum omnis eius id sit nihil.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(159, 2, 27, 2, 'Consequatur adipisci ab non id ab.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(160, 9, 28, 1, 'Illum dolorem sunt corrupti minima aut quia eos natus.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(161, 8, 28, 3, 'Et qui ut illo ut eos nesciunt.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(162, 7, 28, 1, 'Officia temporibus ut omnis et a laboriosam ut autem.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(163, 8, 28, 5, 'Sunt in et quo aliquid omnis.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(164, 2, 28, 4, 'Ipsum iure est unde est sed voluptate est ipsam.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(165, 7, 29, 1, 'Esse mollitia amet voluptatum soluta culpa rerum impedit omnis.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(166, 1, 29, 4, 'Architecto facere odit nihil velit et eos alias debitis.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(167, 8, 29, 3, 'Et quia cupiditate quas exercitationem.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(168, 4, 29, 2, 'Voluptates eaque tempore autem eum.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(169, 7, 29, 5, 'Dolor sed accusantium et perspiciatis culpa voluptate saepe.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(170, 6, 30, 4, 'Sit suscipit aut totam.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(171, 6, 30, 4, 'Molestiae similique est reiciendis expedita.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(172, 10, 30, 4, 'Voluptatem impedit sunt omnis sed ut.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(173, 6, 30, 2, 'Doloribus enim voluptates est in perspiciatis.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(174, 10, 30, 5, 'Perferendis dolor natus cupiditate sed ratione.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(175, 9, 30, 5, 'Hic vel nulla sint ut rerum voluptate.', NULL, '2024-12-29 19:29:18', '2024-12-29 19:29:18'),
(176, 11, 9, 4, 'Nice', '/storage/images/1735526116_image_677206e4317e0.png', '2024-12-29 19:35:16', '2024-12-29 19:35:16'),
(177, 11, 42, 5, 'Nice', NULL, '2024-12-30 00:30:34', '2024-12-30 00:30:34');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0XiiT12ZglEG5rnXSQjm7gAbZw5pZfUbuNtDqyYn', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWDhkS2I0ekxBVm9wUEd0b1ZIWldtVk5nYlR5ZzM0Sk82YTZkaHRTNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1735656759),
('i6wYFjkoYBO3PWVcEqIRvOyVm9ha0WaMqmpfaniz', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRnp2VmFPcXRTNzNmdjl4VEVrWXNlOGVzdHFaU2NYV1J6MmlRY2VLeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1735646808),
('unrYAREMWzBcXfzBlGlpZj13yYtFl4PhQJOMT3mq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMm10NXg4c0d2SEhvWVdyNmlJVTFSZkRDVkg1MDBlMlVqOU5HSzRXViI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9mYXZvcml0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1735659406);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `styles`
--

CREATE TABLE `styles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `styles`
--

INSERT INTO `styles` (`id`, `name`) VALUES
(1, '開放的な空間'),
(2, '現代的な空間'),
(3, 'レトロな空間'),
(4, '落ち着いた空間'),
(5, '高級な空間'),
(6, '共有スペース');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `latitude` decimal(10,7) NOT NULL DEFAULT 21.0170210,
  `longitude` decimal(10,7) NOT NULL DEFAULT 105.7834800,
  `birth` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `workplace` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `style_id` bigint(20) UNSIGNED DEFAULT NULL,
  `desired_distance` int(11) NOT NULL DEFAULT 1,
  `price_start` int(11) NOT NULL DEFAULT 40,
  `price_end` int(11) NOT NULL DEFAULT 90,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `latitude`, `longitude`, `birth`, `avatar`, `workplace`, `nationality`, `city`, `style_id`, `desired_distance`, `price_start`, `price_end`, `role`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Luu Viet Hoan', 'Hoan.LV@sun-asterisk.com', '$2y$12$ZlKVKRMPiuZkm4NN91CuLeSOgHWVhMhX7YAueZw2YHU90axanzAPO', '+84372689718', 'Trung Van, Nam Tu Liem, Ha Noi', 20.8177600, 105.8819190, '2003-07-05', 'avt1.jpg', 'Hanoi University of Science and Technology, Hanoi, Vietnam', 'Vietnam', 'Hanoi', NULL, 1, 40, 90, 'admin', NULL, 'kWT5JmAGM6', '2024-12-29 19:29:15', '2024-12-29 19:29:15'),
(2, 'Ha Dinh Nam', 'Nam.HD@sun-asterisk.com', '$2y$12$AcXVQ4I0UpE2MLScF7FwrOh2ia3Vqq0t/pMV2tOD9tj51FAChDVzy', '+84398626045', 'Bach Khoa, Hai Ba Trung, Ha Noi', 20.9657350, 105.8473360, '2003-09-18', 'avt2.jpg', 'Hanoi University of Science and Technology, Hanoi, Vietnam', 'Vietnam', 'Hanoi', NULL, 1, 40, 90, 'admin', NULL, 'O7iw4gkO0I', '2024-12-29 19:29:15', '2024-12-29 19:29:15'),
(3, 'Vu Minh Quan', 'Quan.VM@sun-asterisk.com', '$2y$12$.mvb5UzS8.f5hnHyJBCj0uh/0kz6yZRKpHNE6azjZlh4gnCSOebge', '+84352650269', 'Hoang Liet, Hoang Mai, Ha Noi', 21.0023990, 105.8759910, '2003-02-14', 'avt3.jpg', 'Hanoi University of Science and Technology, Hanoi, Vietnam', 'Vietnam', 'Hanoi', NULL, 1, 40, 90, 'admin', NULL, 'WskldHlwze', '2024-12-29 19:29:16', '2024-12-29 19:29:16'),
(4, 'Verla Davis', 'smueller@sun-asterisk.com', '$2y$12$QwEazFYwDE9SOHwndk42TuCoWSQmkJ7VbkAOoKPCYbEkMLmTKpNBS', '+28623459232', '136 Durgan Canyon Apt. 516, West Ollieburgh, Chile', 21.0609910, 105.9684710, '2005-03-09', 'avt4.jpg', 'Swift-Marks', 'Chile', 'West Ollieburgh', NULL, 1, 40, 90, 'user', NULL, 'XNwZdzmoLN', '2024-12-29 19:29:16', '2024-12-29 19:29:16'),
(5, 'Prof. Dedrick Davis IV', 'okon.albert@sun-asterisk.com', '$2y$12$WJZrYWkt6tl1aGgx4rYcW.qQGCL/3ed4FO3Njwx2O70osmnsmVRdi', '+70921980929', '383 Mohr Isle, North Saul, Wallis and Futuna', 20.8613940, 105.7455940, '2005-03-04', 'avt5.jpg', 'Beier PLC', 'Wallis and Futuna', 'North Saul', NULL, 1, 40, 90, 'user', NULL, 'rOeceZh33S', '2024-12-29 19:29:16', '2024-12-29 19:29:16'),
(6, 'Aylin Rippin', 'aimee.wolf@sun-asterisk.com', '$2y$12$3WRC/t7.0aZUtaVGujcVI.k8dbgspefXUTlfxacPxS5i5rvJ3BN2a', '+24438637058', '1515 Barrows Avenue Apt. 991, Corwinhaven, Bermuda', 21.0416020, 105.9228200, '1996-12-01', 'avt6.jpg', 'Tromp Group', 'Bermuda', 'Corwinhaven', NULL, 1, 40, 90, 'user', NULL, 'ma6PvE8IoF', '2024-12-29 19:29:16', '2024-12-29 19:29:16'),
(7, 'Paula Brown Jr.', 'amari.purdy@sun-asterisk.com', '$2y$12$GLsXTEB43t0bNtXKU12PrevXtu2AeEYwQ4p0O6PVEeyGHoJ0OmneK', '+17187902621', '892 Braun Union Suite 293, East Kaci, Kenya', 21.1496040, 105.7998510, '2018-11-06', 'avt7.jpg', 'Mante-Hackett', 'Kenya', 'East Kaci', NULL, 1, 40, 90, 'user', NULL, 'n2HdZzLvLE', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(8, 'Annetta Fadel', 'sauer@sun-asterisk.com', '$2y$12$zGJVOKoYwsoEL4LERh/steqsFZGCss7KyvFHBKR3LSqgfU8yR5/Dm', '+41190816094', '901 Hamill Crossing Suite 477, Krajcikberg, Italy', 21.0788640, 105.7608380, '2018-01-26', 'avt8.jpg', 'Ruecker-Lind', 'Italy', 'Krajcikberg', NULL, 1, 40, 90, 'user', NULL, '1fbbWlqbOx', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(9, 'Dave Carroll', 'joyce59@sun-asterisk.com', '$2y$12$HCOnpe/1HL76HipofwxHU.VHjaoNXUKIeZHw9KrYy8ISc5KwChfhi', '+34142238179', '757 Ledner Falls Suite 061, East Melba, Christmas Island', 20.8878900, 105.9333100, '2010-10-02', 'avt9.jpg', 'Quigley PLC', 'Christmas Island', 'East Melba', NULL, 1, 40, 90, 'user', NULL, 'OJbs6IxQi9', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(10, 'Mr. Vern Ward', 'effertz.sibyl@sun-asterisk.com', '$2y$12$JWet2fUcQG4QiNFKcFj4LOxwGtr.WRCKhFGRpvITXUq0p0Dr5rZeG', '+11944574267', '52035 Walter Mews Suite 227, Kuhlmanmouth, South Africa', 21.1781140, 105.9285310, '2023-01-10', 'avt10.jpg', 'Rowe-Ritchie', 'South Africa', 'Kuhlmanmouth', NULL, 1, 40, 90, 'user', NULL, 'NvJodY6ovr', '2024-12-29 19:29:17', '2024-12-29 19:29:17'),
(11, 'Doan Quang Minh', 'minhdq@sun-asterisk.com', '$2y$12$pdIc19ljrPolA1SxNhMDsuykYfN7k0nxAAfmH4w3ioyyoJ.dWWRce', NULL, NULL, 21.0170210, 105.7834800, NULL, NULL, NULL, NULL, NULL, NULL, 1, 40, 90, 'user', NULL, NULL, '2024-12-29 19:34:21', '2024-12-29 19:34:21'),
(13, 'Doan Quang Minh', 'minhdq2@sun-asterisk.com', '$2y$12$EG0sunMVTQHIKTKgrYfNlOLl9J9cn5mIU7WKl0/SY4dAYwHuIgTa.', NULL, NULL, 21.0170210, 105.7834800, NULL, NULL, NULL, NULL, NULL, NULL, 1, 40, 90, 'admin', NULL, NULL, '2024-12-29 19:53:34', '2024-12-29 19:53:34'),
(14, 'Nguoi Dung Thu', 'user@sun-asterisk.com', '$2y$12$gbGLwAJ/e0yiS.mfpefzzOMzPsZdZanOpLN7eYhU6RdUYOUGSL2HK', '+840324155666', 'Lô E6, Khu đô thị mới Cầu Giấy, Nam Từ Liêm, Hà Nội', 21.0170210, 105.7834800, '2003-07-05', '/storage/images/1735650803_6773edf354c2b.jpg', 'Tokyo Tower Business Center', 'Japan', 'Hokkaido', 1, 3, 40, 90, 'user', NULL, NULL, '2024-12-31 06:05:44', '2024-12-31 06:13:24'),
(15, 'Quan Tri Vien', 'admin@sun-asterisk.com', '$2y$12$gQ/MKFeQMWHRU35Hy45gaOOFGobeDOUhZuzi2vtGZCaI3gllKohzm', '+840123456999', 'Lô E6, Khu đô thị mới Cầu Giấy, Nam Từ Liêm, Hà Nội', 21.0170210, 105.7834800, '2003-07-05', '/storage/images/1735651029_6773eed55f9a6.jpg', 'Tokyo Tower Business Center', 'Vietnam', 'Hà Nội', 2, 3, 40, 90, 'admin', NULL, NULL, '2024-12-31 06:16:05', '2024-12-31 06:17:10');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collections_user_id_foreign` (`user_id`);

--
-- Chỉ mục cho bảng `collections_favorites`
--
ALTER TABLE `collections_favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collections_favorites_collection_id_foreign` (`collection_id`),
  ADD KEY `collections_favorites_favorite_id_foreign` (`favorite_id`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorites_user_id_foreign` (`user_id`),
  ADD KEY `favorites_restaurant_id_foreign` (`restaurant_id`);

--
-- Chỉ mục cho bảng `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Chỉ mục cho bảng `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `restaurants_name_unique` (`name`),
  ADD UNIQUE KEY `restaurants_email_unique` (`email`),
  ADD UNIQUE KEY `restaurants_phone_unique` (`phone`);

--
-- Chỉ mục cho bảng `restaurants_styles`
--
ALTER TABLE `restaurants_styles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurants_styles_restaurant_id_foreign` (`restaurant_id`),
  ADD KEY `restaurants_styles_style_id_foreign` (`style_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_user_id_foreign` (`user_id`),
  ADD KEY `reviews_restaurant_id_foreign` (`restaurant_id`);

--
-- Chỉ mục cho bảng `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Chỉ mục cho bảng `styles`
--
ALTER TABLE `styles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`),
  ADD KEY `users_style_id_foreign` (`style_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `collections`
--
ALTER TABLE `collections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `collections_favorites`
--
ALTER TABLE `collections_favorites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT cho bảng `restaurants_styles`
--
ALTER TABLE `restaurants_styles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT cho bảng `styles`
--
ALTER TABLE `styles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `collections`
--
ALTER TABLE `collections`
  ADD CONSTRAINT `collections_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `collections_favorites`
--
ALTER TABLE `collections_favorites`
  ADD CONSTRAINT `collections_favorites_collection_id_foreign` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collections_favorites_favorite_id_foreign` FOREIGN KEY (`favorite_id`) REFERENCES `favorites` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `restaurants_styles`
--
ALTER TABLE `restaurants_styles`
  ADD CONSTRAINT `restaurants_styles_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `restaurants_styles_style_id_foreign` FOREIGN KEY (`style_id`) REFERENCES `styles` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_style_id_foreign` FOREIGN KEY (`style_id`) REFERENCES `styles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
