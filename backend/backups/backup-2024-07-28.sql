-- MySQL dump 10.13  Distrib 9.0.0, for Win64 (x86_64)
--
-- Host: localhost    Database: alsard-ims
-- ------------------------------------------------------
-- Server version	8.0.38

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
-- Table structure for table `employeeitems`
--

DROP TABLE IF EXISTS `employeeitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeeitems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employeeId` int DEFAULT NULL,
  `itemId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `EmployeeItems_itemId_employeeId_unique` (`employeeId`,`itemId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `employeeitems_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`Id`) ON UPDATE CASCADE,
  CONSTRAINT `employeeitems_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `items` (`Id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeeitems`
--

LOCK TABLES `employeeitems` WRITE;
/*!40000 ALTER TABLE `employeeitems` DISABLE KEYS */;
INSERT INTO `employeeitems` VALUES (4,3,4,'2024-07-24 08:44:13','2024-07-24 08:44:13'),(5,3,5,'2024-07-24 09:11:25','2024-07-24 09:11:25'),(6,3,10,'2024-07-24 09:12:19','2024-07-24 09:12:19'),(7,3,12,'2024-07-24 09:12:40','2024-07-24 09:12:40'),(8,3,7,'2024-07-24 09:13:38','2024-07-24 09:13:38'),(9,3,6,'2024-07-24 09:14:10','2024-07-24 09:14:10'),(10,3,8,'2024-07-24 09:14:32','2024-07-24 09:14:32'),(11,3,9,'2024-07-24 09:14:45','2024-07-24 09:14:45'),(12,3,11,'2024-07-24 09:14:55','2024-07-24 09:14:55'),(13,3,13,'2024-07-24 09:15:14','2024-07-24 09:15:14'),(14,3,14,'2024-07-24 09:15:22','2024-07-24 09:15:22'),(17,2,18,'2024-07-24 11:13:25','2024-07-24 11:13:25'),(18,2,16,'2024-07-24 11:14:44','2024-07-24 11:14:44'),(19,3,15,'2024-07-24 11:17:47','2024-07-24 11:17:47'),(20,2,20,'2024-07-28 06:11:47','2024-07-28 06:11:47'),(21,2,21,'2024-07-28 06:22:48','2024-07-28 06:22:48'),(22,2,17,'2024-07-28 06:22:54','2024-07-28 06:22:54'),(23,2,19,'2024-07-28 06:23:03','2024-07-28 06:23:03'),(24,3,22,'2024-07-28 06:24:34','2024-07-28 06:24:34'),(25,3,23,'2024-07-28 06:24:40','2024-07-28 06:24:40'),(26,2,24,'2024-07-28 06:27:12','2024-07-28 06:27:12'),(27,2,26,'2024-07-28 06:27:17','2024-07-28 06:27:17'),(28,2,25,'2024-07-28 06:45:14','2024-07-28 06:45:14'),(29,2,27,'2024-07-28 06:46:29','2024-07-28 06:46:29');
/*!40000 ALTER TABLE `employeeitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `employeeId` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `Position` varchar(255) NOT NULL,
  `isEditable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (2,'Basam','it@alsardgroup.com','07740800989','274','IT','IT support',1,'2024-07-24 08:11:25','2024-07-28 06:46:43'),(3,'Rawa Abdulla ','eng.it@alsardgroup.com','07740800980','238','IT','IT manager ',1,'2024-07-24 08:40:29','2024-07-28 06:37:20');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `Category` varchar(255) NOT NULL,
  `tagId` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `subLocation` varchar(255) NOT NULL,
  `reserved` varchar(255) NOT NULL DEFAULT 'no',
  `isEditable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (4,'HP',' ','pro book 440G7','Laptop','000030','alsardgroup','IT Office','yes',1,'2024-07-24 08:43:37','2024-07-24 10:46:24'),(5,'Panasonic','Handset Phone','KX-TG3711BX5','Phone ','000027','alsardgroup','IT Office','yes',1,'2024-07-24 08:51:29','2024-07-28 06:11:00'),(6,'Canon',' Black & White','I-sensys MF4430','Printer','000028','alsardgroup','IT Office','yes',1,'2024-07-24 08:52:55','2024-07-24 10:46:51'),(7,'Logitech','Wireless & Pair','M150 & K220','Mouse & Keyboard','000029','alsardgroup','IT Office','yes',1,'2024-07-24 08:54:31','2024-07-24 10:47:00'),(8,'Logitech',' Wireless','M185','Mouse','000031','alsardgroup','IT Office','yes',1,'2024-07-24 08:55:51','2024-07-24 10:47:11'),(9,'Transcend',' ','TS4TSJ25H3B','External Hard Drive','000032','alsardgroup','IT Office','yes',1,'2024-07-24 08:57:33','2024-07-24 10:47:16'),(10,'DELL','27-Inch, 60 Hz ','S2721HM','Monitor','000033','alsardgroup','IT Office','yes',1,'2024-07-24 08:58:16','2024-07-24 10:47:40'),(11,'Gigabyte',' ','Z97X-Gaming 3','PC Case','000046','alsardgroup','IT Office','yes',1,'2024-07-24 08:59:49','2024-07-24 10:47:43'),(12,'Transend','16 GB Storage','USB 2.0','Flash Memory','000048','alsardgroup','IT Office','yes',1,'2024-07-24 09:01:33','2024-07-24 10:47:35'),(13,'Laptop Cooling Pad','4x Fan ',' ','Cooling Pad','000288','alsardgroup','IT Office','yes',1,'2024-07-24 09:04:23','2024-07-24 10:47:51'),(14,'Sandisk',' ','Cruzer Glide 3.0','Flash Memory','000331','alsardgroup','IT Office','yes',1,'2024-07-24 09:06:25','2024-07-24 10:47:57'),(15,'Dongle/Ameen',' ','AMEEN V9.0','USB Flash','000191','alsardgroup','IT Office','yes',1,'2024-07-24 10:44:55','2024-07-24 11:17:47'),(16,'Honeywell ','  ','1450g','Barcode reader','000006','alsardgroup','IT Office','yes',1,'2024-07-24 10:51:53','2024-07-24 11:14:45'),(17,'HP','23\' inch','23er ','Monitor','000008','alsardgroup','IT Office','yes',1,'2024-07-24 10:52:38','2024-07-28 06:22:54'),(18,'Logitech','Wireless Pair','M170','Mouse & Keyboard ','0000009','alsardgroup','IT Office','yes',1,'2024-07-24 10:54:26','2024-07-24 11:13:25'),(19,'Brother ',' ','PT-E100','Label machine ','000010','alsardgroup','IT Office','yes',1,'2024-07-24 10:55:31','2024-07-28 06:23:03'),(20,'Lenovo',' ','81BF','Laptop','000011','alsardgroup','IT Office','yes',1,'2024-07-24 10:56:15','2024-07-28 06:11:47'),(21,'Canon',' ','DR-C230','Scanner ','000012','alsardgroup','IT Office','yes',1,'2024-07-24 10:57:42','2024-07-28 06:22:48'),(22,'Panasonic','  ','KX-TG12CNH-1','Handset phone','000013','alsardgroup','IT Office','yes',1,'2024-07-24 10:58:54','2024-07-28 06:24:34'),(23,'Panasonic',' ','KX-TG2711FXB','Handset Phone','000045','alsardgroup','IT Office','yes',1,'2024-07-24 11:00:44','2024-07-28 06:24:40'),(24,'Sandisk',' ',' 16GB','Flash Memory ','000052','alsardgroup','IT Office','yes',1,'2024-07-24 11:03:14','2024-07-28 06:27:12'),(25,'Sandisk',' ','32GB','Flash Memory','000053','alsardgroup','IT Office','yes',1,'2024-07-24 11:03:57','2024-07-28 06:45:14'),(26,'Silicon Power',' IP68 Water proof','4TB','External Hard Drive ','000848','alsardgroup','IT Office','yes',1,'2024-07-24 11:08:49','2024-07-28 06:27:17'),(27,'test Item',' a new test item','test-testa21','cat','00000701','alsardgroup','IT Office','yes',1,'2024-07-28 06:35:28','2024-07-28 06:46:29');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','123','admin','2024-07-24 08:02:22','2024-07-24 08:02:22');
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

-- Dump completed on 2024-07-28 10:17:48
