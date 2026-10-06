-- MySQL dump 10.13  Distrib 8.4.8, for Linux (x86_64)
--
-- Host: localhost    Database: laravel
-- ------------------------------------------------------
-- Server version	8.4.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `societe` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telephone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clients_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Mona El Fassi','Inwi','mona@gmail.com','0612345678','2026-06-11 19:38:52','2026-06-27 19:35:00'),(2,'Sophia Alami','Innovate Morocco','sophia.alami@innovatemy.ma','+212655998877','2026-06-25 15:52:16','2026-06-25 15:52:16'),(3,'Tariq Benziat','Nexus Tech S.A.R.L','t.benziat@nexustech.ma','+212611223344','2026-06-25 15:52:27','2026-06-25 15:52:27'),(4,'Omar Slaoui','Atlas Logistics','o.slaoui@atlaslogistics.ma','+212661998877','2026-06-25 15:57:08','2026-06-25 15:57:08'),(5,'Elena Rostova','FinTech Solutions LLC','e.rostova@fintechsol.com','+12125550199','2026-06-25 15:57:08','2026-06-25 15:57:08'),(6,'Mehdi Benjelloun','Green Energy Maroc','m.benjelloun@greenenergy.ma','+212662114477','2026-06-25 15:57:11','2026-06-25 15:57:11');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000001_create_cache_table',1),(2,'0001_01_01_000002_create_jobs_table',1),(3,'2026_02_25_123802_create_personal_access_tokens_table',1),(4,'2026_02_26_181820_create_users_table',1),(5,'2026_02_26_182208_create_clients_table',2),(6,'2026_02_26_182539_create_projets_table',2),(7,'2026_02_26_194908_add_societe_to_clients_table',3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'api-token','86a3ebff39d93cabc2c729ad418f0b432b37ce2771a87b61dc3c3755f9caabb5','[\"*\"]',NULL,NULL,'2026-06-11 19:23:21','2026-06-11 19:23:21'),(2,'App\\Models\\User',1,'api-token','5206b7032730b8d1fef0fcf0fbab92cece5ee79124c8c0fcac8fd125f8c46921','[\"*\"]','2026-06-11 19:38:51',NULL,'2026-06-11 19:26:54','2026-06-11 19:38:51'),(3,'App\\Models\\User',2,'api-token','2a1babde75fd05eebb00f41d3e1e7fa76e67fb2893406786b58f4f61fe7078f4','[\"*\"]','2026-06-25 11:50:06',NULL,'2026-06-23 22:09:07','2026-06-25 11:50:06'),(4,'App\\Models\\User',2,'api-token','c3c715c9dd1e0a9f8c20bf85577f7453f71936833e01cf430fe96d5802df1809','[\"*\"]','2026-06-25 13:14:41',NULL,'2026-06-25 12:07:48','2026-06-25 13:14:41'),(5,'App\\Models\\User',2,'api-token','69f98fc4404bb75e095059a494ccbb090317442510b6c8be4de2df0a588c6a0b','[\"*\"]','2026-06-25 13:53:22',NULL,'2026-06-25 13:15:29','2026-06-25 13:53:22'),(6,'App\\Models\\User',2,'api-token','b2b0035714c77275c860cc66eb5a20e82c72342d26a68df32b8562795612da52','[\"*\"]','2026-06-25 14:11:34',NULL,'2026-06-25 13:58:53','2026-06-25 14:11:34'),(7,'App\\Models\\User',2,'api-token','737a62580a0ed475467d5ab13da8f61b49f2f75c5d8f1136204ed6db11171357','[\"*\"]','2026-06-25 14:58:55',NULL,'2026-06-25 14:28:20','2026-06-25 14:58:55'),(8,'App\\Models\\User',2,'api-token','214f32dfa786cd98f2704e89882b20ea39dbdf7a7c640136127f2f8b9ce4bf88','[\"*\"]','2026-06-26 17:58:54',NULL,'2026-06-25 15:28:03','2026-06-26 17:58:54'),(9,'App\\Models\\User',4,'api-token','cc1cd9680c875109203b9bebf9915cc651347255e7baecac01e8b3e109d0cac4','[\"*\"]','2026-06-26 18:04:59',NULL,'2026-06-26 18:02:01','2026-06-26 18:04:59'),(10,'App\\Models\\User',2,'api-token','aefa90ae0fabdf36f74b5ac5e7f39fd8d2108e7ece835e62967481cd4f3d3040','[\"*\"]','2026-06-26 18:06:30',NULL,'2026-06-26 18:05:18','2026-06-26 18:06:30'),(11,'App\\Models\\User',3,'api-token','026bb3c5b472f64fd24928f23009527d6837017119b3cf30c84dc5f2cca18512','[\"*\"]','2026-06-27 11:33:37',NULL,'2026-06-26 18:09:15','2026-06-27 11:33:37'),(12,'App\\Models\\User',2,'api-token','06d75f3259e57977c207a6c88b77e7859ecded378c90baae103f397d941364b4','[\"*\"]','2026-06-27 13:48:15',NULL,'2026-06-27 11:34:20','2026-06-27 13:48:15'),(13,'App\\Models\\User',5,'api-token','a7131daae3a93f71dc547518bbd27c8adf69aaab386c614c92074ffb4fe44771','[\"*\"]',NULL,NULL,'2026-06-27 13:56:48','2026-06-27 13:56:48'),(14,'App\\Models\\User',5,'api-token','4e71931e983d1d92ff092a170fd34088d558170d890d9e66f5123e06a4590f0f','[\"*\"]','2026-06-27 14:17:41',NULL,'2026-06-27 13:57:41','2026-06-27 14:17:41'),(15,'App\\Models\\User',3,'api-token','11c50fb715c6e3020345a3c5ecd79b82a6fd166162e7aba0224f53af0ceb10c8','[\"*\"]','2026-06-27 14:25:28',NULL,'2026-06-27 14:18:58','2026-06-27 14:25:28'),(16,'App\\Models\\User',2,'api-token','e2a2ed1bb4f0baa70c57b51f45c1e163d3fe71deaf08fc46164ef274818488f1','[\"*\"]','2026-06-27 14:42:42',NULL,'2026-06-27 14:25:54','2026-06-27 14:42:42'),(17,'App\\Models\\User',5,'api-token','cd6de4db5512ef7f18684ab8eec8473726d06e2858e4206acf4cfe06f42d5b48','[\"*\"]','2026-06-27 15:04:30',NULL,'2026-06-27 14:43:15','2026-06-27 15:04:30'),(18,'App\\Models\\User',2,'api-token','77c41e0f9c3cd1563af685926fcf5340f29c023fb293aa9fb13b865db3f8b3f5','[\"*\"]','2026-06-27 15:18:56',NULL,'2026-06-27 15:05:05','2026-06-27 15:18:56'),(19,'App\\Models\\User',5,'api-token','49ee09b43a4402c037fc870cb654f389975fb359b6cc16b8ed8d3c82444e27d6','[\"*\"]','2026-06-27 15:21:12',NULL,'2026-06-27 15:19:24','2026-06-27 15:21:12'),(20,'App\\Models\\User',2,'api-token','381aef105a59a523af45812e691c3d25129e07740e83ceb21b507d4edeaa3747','[\"*\"]','2026-06-27 15:23:01',NULL,'2026-06-27 15:21:37','2026-06-27 15:23:01'),(21,'App\\Models\\User',4,'api-token','a768a0e7e31b37a4b03065adbd672938d138d583a8959910016ccabd18466904','[\"*\"]','2026-06-27 15:34:38',NULL,'2026-06-27 15:26:04','2026-06-27 15:34:38'),(22,'App\\Models\\User',2,'api-token','3657af93163d54babad214cf2bd41e772fb5c72e373396f4993124c77c807fdd','[\"*\"]','2026-06-27 15:48:11',NULL,'2026-06-27 15:35:44','2026-06-27 15:48:11'),(23,'App\\Models\\User',2,'api-token','af3faf46afd28018f3cf9e34fd0ba3c6b9f06d181c2314828749ee7039c901fe','[\"*\"]','2026-06-27 20:16:25',NULL,'2026-06-27 15:48:30','2026-06-27 20:16:25'),(24,'App\\Models\\User',5,'api-token','59b2f35dfbf52fffe6727c212f2c15eec45cb2d844641045b02ee59adb31dc59','[\"*\"]','2026-06-27 20:21:42',NULL,'2026-06-27 20:20:42','2026-06-27 20:21:42'),(25,'App\\Models\\User',4,'api-token','342ac0c4c383978c595d0f81b2b22c6903da4039c3d604e5dda5e49cb01f1f2b','[\"*\"]','2026-06-27 20:23:32',NULL,'2026-06-27 20:23:14','2026-06-27 20:23:32'),(26,'App\\Models\\User',2,'api-token','026726f365f83c7bd925e6098a6565fb1922d3c4638be928fdf1200ce14b408c','[\"*\"]','2026-06-28 13:28:23',NULL,'2026-06-27 20:23:52','2026-06-28 13:28:23'),(27,'App\\Models\\User',5,'api-token','5ef4c47a457ebdc628809f7b0dc9c185f9d6c9afa78060bdbba48ba972e63249','[\"*\"]','2026-06-28 13:40:41',NULL,'2026-06-28 13:28:59','2026-06-28 13:40:41'),(28,'App\\Models\\User',2,'api-token','fe7afa88eb73c2a4b82b7f515f16e18f86f38811d9fa1fcf7e7a8e97bd56077b','[\"*\"]','2026-06-28 13:54:00',NULL,'2026-06-28 13:42:09','2026-06-28 13:54:00'),(29,'App\\Models\\User',2,'api-token','2d31cbe6ca1c50b58f3c17041f538987d476b2ef3235d5971e692985db54f9d1','[\"*\"]','2026-06-28 14:26:55',NULL,'2026-06-28 13:54:23','2026-06-28 14:26:55'),(30,'App\\Models\\User',3,'api-token','1cc5081fa6ef8e703a317e0ad751fa9a43a0a26019753b9b49cc6f035f0d0713','[\"*\"]','2026-06-28 14:34:09',NULL,'2026-06-28 14:34:07','2026-06-28 14:34:09'),(31,'App\\Models\\User',2,'api-token','2740ad1e707e455bc27a9d58b52440beb13753ac3e4fe38fd9876ed7844b5e33','[\"*\"]','2026-06-28 14:37:39',NULL,'2026-06-28 14:34:37','2026-06-28 14:37:39');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projets`
--

DROP TABLE IF EXISTS `projets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `etat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `client_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projets_client_id_foreign` (`client_id`),
  KEY `projets_user_id_foreign` (`user_id`),
  CONSTRAINT `projets_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  CONSTRAINT `projets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projets`
--

LOCK TABLES `projets` WRITE;
/*!40000 ALTER TABLE `projets` DISABLE KEYS */;
INSERT INTO `projets` VALUES (1,'Cloud Architecture Migration','DevOps / Infrastructure','En Cours','2026-01-10','2026-06-30',1,2,'2026-06-25 15:54:08','2026-06-25 15:54:08'),(2,'E-Commerce Platform','Web Development','Terminé','2026-02-01','2026-05-15',2,2,'2026-06-25 15:54:11','2026-06-25 15:54:11'),(3,'Supply Chain Automation','IoT / Backend Development','En Cours','2026-03-01','2026-08-31',3,2,'2026-06-25 15:57:23','2026-06-25 15:57:23'),(4,'Payment Gateway Integration','Cybersecurity / API','En Attente','2026-07-01','2026-11-15',4,2,'2026-06-25 15:57:23','2026-06-25 15:57:23'),(5,'Smart Solar Grid Dashboard','Full-Stack React / Laravel','Terminé','2026-01-15','2026-05-30',5,1,'2026-06-25 15:57:24','2026-06-25 15:57:24'),(6,'Plateforme E-learning','Web Application','Terminé','2026-04-01','2026-05-30',4,4,'2026-06-26 19:25:21','2026-06-26 19:25:21'),(7,'Fitness Tracker Mobile App','Mobile App','Bloqué','2026-06-01','2026-07-05',2,5,'2026-06-27 16:42:46','2026-06-27 16:42:46'),(8,'Customer Churn Analytics','Data Science,Python','En Cours','2026-05-12','2026-06-30',5,1,'2026-06-27 19:48:41','2026-06-27 20:01:18'),(9,'Predictive Modeling','Data Science, Python','En Cours','2026-06-04','2026-07-04',5,5,'2026-06-28 12:33:49','2026-06-28 14:26:39');
/*!40000 ALTER TABLE `projets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Meriem Bennani','bennani@gmail.com','$2y$12$l00yCdjSAwKL6h5PgAhVzeC12JQVHbiLy8LSgYv7Iv3z.lj7J2m4e','user','2026-06-11 19:23:20','2026-06-27 19:40:10'),(2,'Amine Naciri','admin@test.com','$2y$12$JPpzqc9t2NMpBgIo2gilb.LgxqSsJHBytYz.tGTarI3MIYPmB1Cy6','admin','2026-06-23 22:07:47','2026-06-27 19:37:32'),(4,'Yassine Mansouri','y.mansouri@mydblink.com','$2y$12$YuzVAnt4qSXo.PyZRWMKGOxUp5UaG.05LLJsf.Hq2JKmS.mzc7XHK','user','2026-06-25 15:51:18','2026-06-25 15:51:18'),(5,'Ahmed Atlas','ahmed@gmail.com','$2y$12$/k/CToz8z0A2J/hEg0CEHe7WM03ub9y8RiDHg3Hc6FVLqkLuPPgIS','user','2026-06-27 13:56:48','2026-06-27 16:44:56');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-29  0:07:41
