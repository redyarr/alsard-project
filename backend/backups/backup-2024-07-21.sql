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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeeitems`
--

LOCK TABLES `employeeitems` WRITE;
/*!40000 ALTER TABLE `employeeitems` DISABLE KEYS */;
INSERT INTO `employeeitems` VALUES (1,1,1,'2024-07-21 05:47:45','2024-07-21 05:47:45'),(2,1,3,'2024-07-21 05:48:27','2024-07-21 05:48:27');
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
  `isEditable` varchar(255) NOT NULL DEFAULT 'yes',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'rawa abullah','eng.it@alsardgroup.com','07740800980','123','IT','IT-MANAGER','1','2024-07-21 05:47:39','2024-07-21 05:47:39'),(2,'redyar','redyarh@gmail.com','07740800980','1233','IT','INTERN','1','2024-07-21 05:48:51','2024-07-21 05:48:51');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'liada','brand new','2023','laptop','ALSARD-IT-000044232123111','ALSARD-GROUP','IT','yes',0,'2024-07-16 07:41:35','2024-07-21 05:47:45'),(2,'USB','brand new','2023','laptop','ALSARD-IT-000044232123197811','ALSARD-GROUP','IT','no',1,'2024-07-16 08:37:47','2024-07-21 05:52:09'),(3,'MOUSE','brand new','2023','MOUSE','ALSARD-IT-0000442321231978113','ALSARD-GROUP','IT','yes',1,'2024-07-21 05:48:22','2024-07-21 05:48:27'),(4,'KONKA','1080P QUALTY','2018','MONITOR','ALSARD-IT-000765','ALSARD-GROUP','HR','no',1,'2024-07-21 05:53:00','2024-07-21 05:53:00');
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
INSERT INTO `users` VALUES (1,'admin','123','admin','2024-07-16 07:40:39','2024-07-16 07:40:39');
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

-- Dump completed on 2024-07-21  9:13:00
