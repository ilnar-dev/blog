-- MySQL dump 10.13  Distrib 8.0.23, for osx10.16 (x86_64)
--
-- Host: 127.0.0.1    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `article`
--
USE `blog`;
DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `intro` text,
  `text` text,
  `main_image_id` int DEFAULT NULL,
  `gallery_id` int DEFAULT NULL,
  `published` tinyint DEFAULT '0',
  `published_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'Переход из PHP в Node.js','Статья о том как перейти из пыхи в ноду 111','<h3>Зачем?</h3><p>PHP отличный инструмент для многих задач. Многомиллионные бизнесы были построены с его использованием. Но я решил посвятить некоторе время на изучение Node JS и в этой статье я бы хотел рассказать о плюсах и минусах этого решения.</p><h4>Расширение кругозора</h4><p>Когда ты долгое время работаешь с одним и тем же инструментом есть риск потерять профессиональную гибкость.</p><blockquote><p>Если ты умеешь пользоваться только молотком то все начинает казаться гвоздями</p></blockquote><p>Я изучал и питон и Java и JS в прошлом. Я не погружался глубоко, но некоторые интересные приемы и решения из стандартных библиотек давали мне пищу для размышлений. Мое понимание OOP прокачалось после Java, асинхронное программирование с нодой и что не надо загонять себя в рамки ООП парадигмы я понял благодаря питону.</p><h4>Рынок</h4><p>С переездом в Финляндию я обнаружил что PHP намного менее популярен в Европе. Во времена когда я руководил командой разработки коллеги из других компаний спрашивали меня не возникает ли проблем с наймом.</p>',17,NULL,1,'2023-08-06 08:35:11'),(2,'Test article №2',NULL,'Test article two\'s text. Hello everyone, this is a super-duper text here.',20,NULL,0,NULL),(3,'Test title',NULL,'Test text for post creation',19,NULL,0,NULL),(4,'Test of main image upload','Test intro for the post which is great','<p>Test text</p>',24,NULL,1,'2023-08-06 09:22:55');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery_image`
--

DROP TABLE IF EXISTS `gallery_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery_image` (
  `id` int NOT NULL,
  `gallery_id` int NOT NULL,
  `image_id` int NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery_image`
--

LOCK TABLES `gallery_image` WRITE;
/*!40000 ALTER TABLE `gallery_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `gallery_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,'161520445017487558.png','/Users/ilnar/Projects/Blog/public/uploads/161520445017487558.png'),(2,'Airbnb LOS records doc.png','/Users/ilnar/Projects/Blog/public/uploads/Airbnb LOS records doc.png'),(3,'screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png','/Users/ilnar/Projects/Blog/public/uploads/screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png'),(4,'screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png','/Users/ilnar/Projects/Blog/public/uploads/screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png'),(5,'screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png','/Users/ilnar/Projects/Blog/public/uploads/screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png'),(6,'screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png','/Users/ilnar/Projects/Blog/public/uploads/screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png'),(7,'screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png','/Users/ilnar/Projects/Blog/public/uploads/screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png'),(8,'screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png','/Users/ilnar/Projects/Blog/public/uploads/screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png'),(9,'screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png','/Users/ilnar/Projects/Blog/public/uploads/screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png'),(10,'screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png','/Users/ilnar/Projects/Blog/public/uploads/screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png'),(11,'Без названия (2).png','/Users/ilnar/Projects/Blog/public/uploads/Без названия (2).png'),(12,'Без названия (2).png','/Users/ilnar/Projects/Blog/public/uploads/Без названия (2).png'),(13,'Без названия.png','/Users/ilnar/Projects/Blog/public/uploads/Без названия.png'),(14,'Без названия (1).png','/Users/ilnar/Projects/Blog/public/uploads/Без названия (1).png'),(15,'Без названия (1).png','/Users/ilnar/Projects/Blog/public/uploads/Без названия (1).png'),(16,'Без названия (2).png','/Users/ilnar/Projects/Blog/public/uploads/Без названия (2).png'),(17,'screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png','/Users/ilnar/Projects/Blog/public/uploads/screenshot-dashboard.hostaway.eu-2021.05.21-21_14_08.png'),(18,'20181020_122614.jpg','/Users/ilnar/Projects/Blog/public/uploads/20181020_122614.jpg'),(19,'20181020_122614.jpg','/Users/ilnar/Projects/Blog/public/uploads/20181020_122614.jpg'),(20,'5es734.jpeg','/Users/ilnar/Projects/Blog/public/uploads/5es734.jpeg'),(21,'Flag_of_the_Vatican_City.svg.png','/Users/ilnar/Projects/Blog/public/uploads/Flag_of_the_Vatican_City.svg.png'),(22,'Flag_of_Portugal.svg.webp','/Users/ilnar/Projects/Blog/public/uploads/Flag_of_Portugal.svg.webp'),(23,'Flag_of_Portugal.svg.webp','/Users/ilnar/Projects/Blog/public/uploads/Flag_of_Portugal.svg.webp'),(24,'Flag_of_Ireland.svg.webp','/Users/ilnar/Projects/Blog/public/uploads/Flag_of_Ireland.svg.webp');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-26 16:49:04
