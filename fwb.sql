-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 21, 2021 lúc 10:42 AM
-- Phiên bản máy phục vụ: 10.4.17-MariaDB
-- Phiên bản PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `fwb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `from` int(11) DEFAULT NULL,
  `to` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`id`, `content`, `parent_id`, `post_id`, `user_id`, `created_at`) VALUES
(5, 'Comment 4', NULL, 2, 83, '2021-01-12 10:49:04'),
(7, 'Comment 2', NULL, 2, 83, '2021-01-12 10:54:57'),
(8, 'Reply to comment 1', 2, 2, 83, '2021-01-12 10:55:00'),
(26, 'Yeah, I\'ve done it', NULL, 38, 93, '2021-01-20 11:37:18'),
(33, 'Done', NULL, 38, 93, '2021-01-20 13:38:43'),
(34, 'Lots of bugs', NULL, 42, 83, '2021-01-21 11:04:20'),
(36, 'CCGV??????????WTF??????????', NULL, 42, 83, '2021-01-21 11:05:10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hobits`
--

CREATE TABLE `hobits` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `hobits`
--

INSERT INTO `hobits` (`id`, `name`, `created_at`) VALUES
(1, 'Reading', '2021-01-12 06:50:20'),
(2, 'Playing games', '2021-01-12 06:50:20'),
(3, 'Football', '2021-01-12 06:50:33'),
(4, 'Hanging out', '2021-01-19 04:25:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `imageUrl` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `images`
--

INSERT INTO `images` (`id`, `imageUrl`, `post_id`, `created_at`) VALUES
(2, 'image-1610420921830.jpeg', 2, '2021-01-07 14:55:10'),
(4, 'image-1610420921830.jpeg', 4, '2021-01-07 14:55:10'),
(8, 'image-1610420921830.jpeg', 15, '2021-01-12 10:08:42'),
(29, 'image-1611028631376.jpeg', 38, '2021-01-19 10:57:11'),
(30, 'image-1611194159335.jpeg', 40, '2021-01-21 08:55:59'),
(32, 'image-1611194293706.jpeg', 42, '2021-01-21 08:58:13');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `matchings`
--

CREATE TABLE `matchings` (
  `id` int(11) NOT NULL,
  `matching_name_one` int(11) DEFAULT NULL,
  `matching_name_two` int(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `matchings`
--

INSERT INTO `matchings` (`id`, `matching_name_one`, `matching_name_two`, `status`, `created_at`) VALUES
(1, 83, 92, 2, '2021-01-13 11:29:43'),
(2, 80, 92, 0, '2021-01-13 11:32:33'),
(3, 83, 80, 0, '2021-01-13 11:32:52'),
(22, 95, 83, 0, '2021-01-19 13:26:12'),
(23, 83, 1, 0, '2021-01-21 08:28:10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `method` varchar(10) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `amount` int(11) NOT NULL,
  `created_at` int(11) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `payments`
--

INSERT INTO `payments` (`id`, `userId`, `method`, `amount`, `created_at`) VALUES
(9, 93, 'card', 20000, 2147483647),
(14, 83, 'card', 20000, 2147483647);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `like` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `status`, `like`, `user_id`, `created_at`) VALUES
(2, 'Post 2', 'This is post 2', 0, 'khaclam2427@gmail.com lam@gmail.com ', 1, '2021-01-07 14:52:25'),
(4, 'Post two', 'This is post 2', 0, 'khaclam2427@gmail.com ', 1, '2021-01-07 14:58:18'),
(15, 'Post with image', 'Images', 0, 'khaclam2427@gmail.com lam@gmail.com ', 83, '2021-01-12 10:08:41'),
(38, NULL, 'Lỗi tung tóe! hihihi...!', 0, ',khaclam2427@gmail.com,lam@gmail.com', 93, '2021-01-19 10:57:11'),
(40, NULL, 'New day', 0, '', 93, '2021-01-21 08:55:59'),
(42, NULL, 'New Working day', 0, '  ,blabla@gmail.com,khaclam2427@gmail.com', 93, '2021-01-21 08:58:13');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`) VALUES
(1, 'admin', '2021-01-19 02:30:35'),
(2, 'premium', '2021-01-19 02:30:35'),
(3, 'free', '2021-01-19 02:30:42');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role_permission`
--

CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `imageUrl` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `birthday` varchar(50) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `region` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `link_fb` text COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `hobits` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `reset_token` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `reset_token_expire` varchar(50) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `full_name`, `gender`, `imageUrl`, `email`, `password`, `birthday`, `country`, `region`, `status`, `link_fb`, `description`, `hobits`, `reset_token`, `reset_token_expire`, `created_at`) VALUES
(1, 'KhacLam2409', 'Nguyen Khac Lam', 0, 'image-1611221703826.jpeg', 'khaclam2409@gmail.com', '$2a$10$ZMXarFtuNY/5HWG8udmzxeqLxfloyehJMfJqFg.pm8kS2/b8bXqX.', '2021-01-11', 'Anguilla', 'Blowing Rock', 1, NULL, NULL, ',Reading,Playing games,Football', '', '', '2021-01-21 09:38:48'),
(80, 'KhacLam', NULL, NULL, 'image-1610933751135.jpeg', 'khaclam@gmail.com', '$2a$10$nrRokBu/MhwuBpziZJa2BOKF3NC3IhKa/bm38ugSvqcG4Cmrr2hti', NULL, NULL, NULL, 0, NULL, NULL, '', '', '', '2021-01-18 01:35:51'),
(83, 'Khac Lam Nguyen', 'Nguyen Khac Lam', 0, 'image-1610964879006.jpeg', 'khaclam2427@gmail.com', '$2a$10$warhrAASge2rCWSmrqqLpO2ILx7Pidx/hM9cB44Ib2oNqc39PgIs.', '1999-01-20', 'Vietnam', 'Hà Nội', 0, NULL, 'Hello I\'m from Vietnam and I am a programmer...!', 'Reading,Football', '', '', '2021-01-21 04:43:51'),
(92, 'Son', NULL, 1, NULL, 'son@gmail.com', '$2a$10$YBty5kQPmsRRpO8HS1AYYeQO3FNvTmNEAHH792DSuQlv.NjDp5wA2', NULL, NULL, NULL, 0, NULL, NULL, '', '', '2021-01-12 14:25:55', '2021-01-18 01:56:14'),
(93, 'Lam Nguyen Khac', 'Nguyen Khac Lam', 0, 'image-1611196172695.jpeg', 'lam@gmail.com', '$2a$10$mRliLJS.tOdJw9AfKXATAO/z/oMnlh.fDLO.6PGKYFqVTIplTeeQK', '2000-10-19', 'Uzbekistan', 'Surxondaryo (Termiz)', 0, NULL, 'Hello I\'m from Vietnam', 'Reading,Hanging out', '', '2021-01-14 10:56:17', '2021-01-21 02:29:32'),
(95, 'nklam', 'NGUYEN KHAC LAM', 0, 'image-1611027008332.jpeg', 'lamnk@gmail.com', '$2a$10$Dl9r6cgFoFvHhOtGdcK82efFBoS2CKJVfCXj2oxPVw9Q0QbZ3S.AG', '2000-01-05', 'Argentina', 'Capital Federal', 0, NULL, 'Hello there', '', '', '2021-01-19 10:29:34', '2021-01-19 03:50:02'),
(103, 'Fan Mu', 'Fan Mu', 1, 'image-1611198647626.jpeg', 'blabla@gmail.com', '$2a$10$YcO5kEKDddvz33S7l7HatOS53JLJsMev6xN9iDnanZK9t8UvKwD4K', '2021-01-21', 'Croatia', 'Karlovačka Županija', 0, NULL, 'Gáy thôi nào ae ơi!', ',Hanging out,Football', '', '2021-01-21 10:02:51', '2021-01-21 03:12:23'),
(108, 'clgt', NULL, 2, NULL, 'clgt@gmail.com', '$2a$10$sbVVIkfsksxsZ6RsWUDzQerSzvLwXY9rUSU8cicqEMpO.h0GJ.0sS', '1', NULL, NULL, 0, NULL, NULL, '', '', '2021-01-21 11:16:26', '2021-01-21 04:16:26');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `user_role`
--

INSERT INTO `user_role` (`id`, `user_id`, `role_id`) VALUES
(1, 93, 2),
(2, 1, 1),
(3, 83, 2),
(5, 95, 3),
(13, 103, 3),
(18, 108, 3);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `to` (`to`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `hobits`
--
ALTER TABLE `hobits`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`);

--
-- Chỉ mục cho bảng `matchings`
--
ALTER TABLE `matchings`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `role_permission`
--
ALTER TABLE `role_permission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permission_id` (`permission_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Chỉ mục cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT cho bảng `hobits`
--
ALTER TABLE `hobits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT cho bảng `matchings`
--
ALTER TABLE `matchings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `role_permission`
--
ALTER TABLE `role_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT cho bảng `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`to`) REFERENCES `rooms` (`id`);

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

--
-- Các ràng buộc cho bảng `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `role_permission`
--
ALTER TABLE `role_permission`
  ADD CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  ADD CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Các ràng buộc cho bảng `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
