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
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeeitems`
--

LOCK TABLES `employeeitems` WRITE;
/*!40000 ALTER TABLE `employeeitems` DISABLE KEYS */;
INSERT INTO `employeeitems` VALUES (4,3,4,'2024-07-24 08:44:13','2024-07-24 08:44:13'),(5,3,5,'2024-07-24 09:11:25','2024-07-24 09:11:25'),(6,3,10,'2024-07-24 09:12:19','2024-07-24 09:12:19'),(7,3,12,'2024-07-24 09:12:40','2024-07-24 09:12:40'),(8,3,7,'2024-07-24 09:13:38','2024-07-24 09:13:38'),(9,3,6,'2024-07-24 09:14:10','2024-07-24 09:14:10'),(10,3,8,'2024-07-24 09:14:32','2024-07-24 09:14:32'),(11,3,9,'2024-07-24 09:14:45','2024-07-24 09:14:45'),(12,3,11,'2024-07-24 09:14:55','2024-07-24 09:14:55'),(13,3,13,'2024-07-24 09:15:14','2024-07-24 09:15:14'),(14,3,14,'2024-07-24 09:15:22','2024-07-24 09:15:22'),(19,3,15,'2024-07-24 11:17:47','2024-07-24 11:17:47'),(24,3,22,'2024-07-28 06:24:34','2024-07-28 06:24:34'),(25,3,23,'2024-07-28 06:24:40','2024-07-28 06:24:40'),(30,4,16,'2024-07-28 12:14:09','2024-07-28 12:14:09'),(31,4,17,'2024-07-28 12:14:16','2024-07-28 12:14:16'),(32,4,18,'2024-07-28 12:14:25','2024-07-28 12:14:25'),(33,4,19,'2024-07-28 12:14:31','2024-07-28 12:14:31'),(34,4,20,'2024-07-28 12:14:52','2024-07-28 12:14:52'),(35,4,21,'2024-07-28 12:15:25','2024-07-28 12:15:25'),(36,4,24,'2024-07-28 12:15:31','2024-07-28 12:15:31'),(37,4,25,'2024-07-28 12:15:37','2024-07-28 12:15:37'),(38,4,26,'2024-07-28 12:15:43','2024-07-28 12:15:43'),(39,5,28,'2024-07-28 12:45:17','2024-07-28 12:45:17'),(40,5,29,'2024-07-28 12:45:23','2024-07-28 12:45:23'),(41,5,30,'2024-07-28 12:45:29','2024-07-28 12:45:29'),(42,6,31,'2024-07-28 13:07:06','2024-07-28 13:07:06'),(43,6,32,'2024-07-28 13:07:31','2024-07-28 13:07:31'),(44,6,33,'2024-07-28 13:07:43','2024-07-28 13:07:43'),(45,6,35,'2024-07-28 13:08:00','2024-07-28 13:08:00'),(46,6,34,'2024-07-28 13:08:18','2024-07-28 13:08:18'),(47,6,37,'2024-07-28 13:08:24','2024-07-28 13:08:24'),(48,6,36,'2024-07-28 13:08:40','2024-07-28 13:08:40'),(49,6,38,'2024-07-28 13:15:22','2024-07-28 13:15:22'),(50,6,39,'2024-07-28 13:15:29','2024-07-28 13:15:29'),(51,7,40,'2024-07-28 13:33:53','2024-07-28 13:33:53'),(52,7,41,'2024-07-28 13:34:00','2024-07-28 13:34:00'),(54,8,43,'2024-07-30 10:42:35','2024-07-30 10:42:35'),(55,8,44,'2024-07-30 10:44:57','2024-07-30 10:44:57'),(56,8,45,'2024-07-30 10:48:18','2024-07-30 10:48:18'),(57,8,46,'2024-07-30 10:55:24','2024-07-30 10:55:24'),(58,8,47,'2024-07-30 10:55:42','2024-07-30 10:55:42'),(59,8,48,'2024-07-30 10:57:53','2024-07-30 10:57:53'),(60,9,49,'2024-07-30 11:07:11','2024-07-30 11:07:11'),(61,9,50,'2024-07-30 11:07:16','2024-07-30 11:07:16'),(62,9,51,'2024-07-30 11:07:22','2024-07-30 11:07:22'),(63,10,52,'2024-07-30 11:46:42','2024-07-30 11:46:42'),(64,10,53,'2024-07-30 11:46:47','2024-07-30 11:46:47'),(65,10,54,'2024-07-30 11:46:54','2024-07-30 11:46:54'),(66,10,55,'2024-07-30 11:46:58','2024-07-30 11:46:58'),(67,10,56,'2024-07-30 11:47:04','2024-07-30 11:47:04'),(68,10,57,'2024-07-30 11:47:09','2024-07-30 11:47:09'),(69,10,58,'2024-07-30 11:47:15','2024-07-30 11:47:15'),(70,10,59,'2024-07-30 11:47:24','2024-07-30 11:47:24'),(71,10,60,'2024-07-30 11:47:31','2024-07-30 11:47:31'),(72,10,61,'2024-07-30 11:47:40','2024-07-30 11:47:40'),(73,11,62,'2024-07-30 12:06:42','2024-07-30 12:06:42'),(74,11,65,'2024-07-30 12:06:51','2024-07-30 12:06:51'),(75,11,63,'2024-07-30 12:06:56','2024-07-30 12:06:56'),(76,11,66,'2024-07-30 12:07:02','2024-07-30 12:07:02'),(77,11,64,'2024-07-30 12:07:07','2024-07-30 12:07:07'),(78,12,67,'2024-07-30 12:16:58','2024-07-30 12:16:58'),(79,12,68,'2024-07-30 12:17:03','2024-07-30 12:17:03'),(80,12,69,'2024-07-30 12:17:09','2024-07-30 12:17:09'),(81,12,70,'2024-07-30 12:17:14','2024-07-30 12:17:14'),(82,13,71,'2024-07-30 12:37:12','2024-07-30 12:37:12'),(83,13,72,'2024-07-30 12:37:18','2024-07-30 12:37:18'),(84,13,77,'2024-07-30 12:37:25','2024-07-30 12:37:25'),(85,13,75,'2024-07-30 12:37:30','2024-07-30 12:37:30'),(86,13,73,'2024-07-30 12:37:35','2024-07-30 12:37:35'),(87,13,74,'2024-07-30 12:37:41','2024-07-30 12:37:41'),(88,13,76,'2024-07-30 12:37:47','2024-07-30 12:37:47'),(89,14,78,'2024-07-30 12:46:31','2024-07-30 12:46:31'),(90,14,80,'2024-07-30 12:46:37','2024-07-30 12:46:37'),(91,14,79,'2024-07-30 12:46:42','2024-07-30 12:46:42');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (3,'Rawa Abdulla ','eng.it@alsardgroup.com','07740800980','195','IT','IT manager ',0,'2024-07-24 08:40:29','2024-07-29 06:36:00'),(4,'Basam','it@alsardgroup.com','07740800989','270','IT','IT support',0,'2024-07-28 12:13:06','2024-07-29 06:36:00'),(5,'Fro Mahmood Muhammed','Recruitment@alsardgroup.com','07730169295','269','HR','Recruitment Officer',0,'2024-07-28 12:36:07','2024-07-29 06:36:00'),(6,'Hevi Rafiq Kaisxasraw','hevi.rafiq@alsardgroup.com','07508409462','255','HR','HR Assistant',0,'2024-07-28 12:52:43','2024-07-29 06:36:00'),(7,'Diya Hiwa Najah','HR.trainee@alsardgroup.com','07702757977',' ','HR','HR Internship',0,'2024-07-28 13:30:21','2024-07-29 06:36:00'),(8,'Ari Bakir','general.manager@alsardgroup.com','07701526465','252','Administration','General Manager',0,'2024-07-30 10:25:42','2024-07-31 07:00:00'),(9,'Rebeen Nariman Muhamed','engproject@alsardgroup.com','4','6','Administration','Project Manager',0,'2024-07-30 11:03:56','2024-07-31 07:00:00'),(10,'Soma Abass ','soma.abas@alsardgroup.com','07711571293','5','Administration','Admin Assistant',0,'2024-07-30 11:13:23','2024-07-31 07:05:42'),(11,'Chalak Sharif Abdulrahman+','law2@alsardgroup.com','3','3','law','n',0,'2024-07-30 11:50:35','2024-07-31 07:00:00'),(12,'Muhamed Salar Qadr','law2@alsardgroup.com','d','ht','law','y',0,'2024-07-30 12:08:13','2024-07-31 07:00:00'),(13,'Shahryar Hammed Amin','shahryar@alsardgroup.com','07501243500','3002','law','goverment relation admin',0,'2024-07-30 12:37:04','2024-07-31 07:09:00'),(14,'Soma Ali Ahmed','soma.ali@alsardgroup.com','2',' 2','law','4',0,'2024-07-30 12:46:25','2024-07-31 07:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (4,'HP',' ','pro book 440G7','Laptop','000030','alsardgroup','IT Office','yes',0,'2024-07-24 08:43:37','2024-07-29 06:36:00'),(5,'Panasonic','Handset Phone','KX-TG3711BX5','Phone ','000027','alsardgroup','IT Office','yes',0,'2024-07-24 08:51:29','2024-07-29 06:36:00'),(6,'Canon',' Black & White','I-sensys MF4430','Printer','000028','alsardgroup','IT Office','yes',0,'2024-07-24 08:52:55','2024-07-29 06:36:00'),(7,'Logitech','Wireless & Pair','M150 & K220','Mouse & Keyboard','000029','alsardgroup','IT Office','yes',0,'2024-07-24 08:54:31','2024-07-29 06:36:00'),(8,'Logitech',' Wireless','M185','Mouse','000031','alsardgroup','IT Office','yes',0,'2024-07-24 08:55:51','2024-07-29 06:36:00'),(9,'Transcend',' ','TS4TSJ25H3B','External Hard Drive','000032','alsardgroup','IT Office','yes',0,'2024-07-24 08:57:33','2024-07-29 06:36:00'),(10,'DELL','27-Inch, 60 Hz ','S2721HM','Monitor','000033','alsardgroup','IT Office','yes',0,'2024-07-24 08:58:16','2024-07-29 06:36:00'),(11,'Gigabyte',' ','Z97X-Gaming 3','PC Case','000046','alsardgroup','IT Office','yes',0,'2024-07-24 08:59:49','2024-07-29 06:36:00'),(12,'Transend','16 GB Storage','USB 2.0','Flash Memory','000048','alsardgroup','IT Office','yes',0,'2024-07-24 09:01:33','2024-07-29 06:36:00'),(13,'Cooling Pad','4x Fan ',' ','Cooling Pad','000288','alsardgroup','IT Office','yes',0,'2024-07-24 09:04:23','2024-07-29 06:36:00'),(14,'Sandisk',' ','Cruzer Glide 3.0','Flash Memory','000331','alsardgroup','IT Office','yes',0,'2024-07-24 09:06:25','2024-07-29 06:36:00'),(15,'Dongle/Ameen',' ','AMEEN V9.0','USB Flash','000191','alsardgroup','IT Office','yes',0,'2024-07-24 10:44:55','2024-07-29 06:36:00'),(16,'Honeywell ','  ','1450g','Barcode reader','000006','alsardgroup','IT Office','yes',0,'2024-07-24 10:51:53','2024-07-29 06:36:00'),(17,'HP','23\' inch','23er ','Monitor','000008','alsardgroup','IT Office','yes',0,'2024-07-24 10:52:38','2024-07-29 06:36:00'),(18,'Logitech','Wireless Pair','M170','Mouse & Keyboard ','0000009','alsardgroup','IT Office','yes',0,'2024-07-24 10:54:26','2024-07-29 06:36:00'),(19,'Brother ',' ','PT-E100','Label machine ','000010','alsardgroup','IT Office','yes',0,'2024-07-24 10:55:31','2024-07-29 06:36:00'),(20,'Lenovo',' ','81BF','Laptop','000011','alsardgroup','IT Office','yes',0,'2024-07-24 10:56:15','2024-07-29 06:36:00'),(21,'Canon',' ','DR-C230','Scanner ','000012','alsardgroup','IT Office','yes',0,'2024-07-24 10:57:42','2024-07-29 06:36:00'),(22,'Panasonic','  ','KX-TG12CNH-1','Handset phone','000013','alsardgroup','IT Office','yes',0,'2024-07-24 10:58:54','2024-07-29 06:36:00'),(23,'Panasonic',' ','KX-TG2711FXB','Handset Phone','000045','alsardgroup','IT Office','yes',0,'2024-07-24 11:00:44','2024-07-29 06:36:00'),(24,'Sandisk',' ',' 16GB','Flash Memory ','000052','alsardgroup','IT Office','yes',0,'2024-07-24 11:03:14','2024-07-29 06:36:00'),(25,'Sandisk',' ','32GB','Flash Memory','000053','alsardgroup','IT Office','yes',0,'2024-07-24 11:03:57','2024-07-29 06:36:00'),(26,'Silicon Power',' IP68 Water proof','4TB','External Hard Drive ','000848','alsardgroup','IT Office','yes',0,'2024-07-24 11:08:49','2024-07-29 06:36:00'),(28,'HP',' ','15-DW4000NIA','Laptop','000131','Alsardgroup','HR Office','yes',0,'2024-07-28 12:40:48','2024-07-29 06:36:00'),(29,'Panasonic',' ','KX-T730CID','Phone','000129','alsardgroup','HR Office','yes',0,'2024-07-28 12:42:38','2024-07-29 06:36:00'),(30,'Microsoft',' ',' ','Mouse','0000662','Alsardgroup','HR Office','yes',0,'2024-07-28 12:45:01','2024-07-29 06:36:00'),(31,'Dell',' ','Optiplex-3020','PC Case','0000117','Alsardgroup','HR Office','yes',0,'2024-07-28 12:57:33','2024-07-29 06:36:00'),(32,'HP',' ','MSU1459','Mouse','0000118','Alsardgroup','HR Office','yes',0,'2024-07-28 12:58:15','2024-07-29 06:36:00'),(33,'Dell',' ','KB212-B','Keyboard','0000119','Alsardgroup','HR Office','yes',0,'2024-07-28 12:59:32','2024-07-29 06:36:00'),(34,'Panasonic','  ','KX-TG3721BX5','Handset Phone','0000120','alsardgroup','HR Office','yes',0,'2024-07-28 13:00:40','2024-07-29 06:36:00'),(35,'HP','23\" inch','23er','Monitor','0000121','Alsardgroup','HR Office','yes',0,'2024-07-28 13:01:41','2024-07-29 06:36:00'),(36,'Dongle/Ameen','  ','Ameen HR v8.0','USB','0000122','Alsardgroup','HR Office','yes',0,'2024-07-28 13:04:07','2024-07-29 06:36:00'),(37,'PCE',' ','M8-900','UPS','0000123','Alsardgroup','HR Office','yes',0,'2024-07-28 13:04:50','2024-07-29 06:36:00'),(38,'ORICO','  ','1TB','External Hard Drive','0000124','Alsardgroup','HR Office','yes',0,'2024-07-28 13:05:54','2024-07-29 06:36:00'),(39,'Canon',' ','ds770','Scanner','0000125','Alsardgroup','HR Office','yes',0,'2024-07-28 13:06:49','2024-07-29 06:36:00'),(40,'Lenovo',' ','Thinkpad X1 Carbon','Laptop','0000020','Alsardgroup','HR Internship','yes',0,'2024-07-28 13:32:31','2024-07-29 06:36:00'),(41,'Rapoo',' ','M10','Mouse','0000022','Alsardgroup','HR Internship','yes',0,'2024-07-28 13:33:10','2024-07-29 06:36:00'),(43,'Lenovo','SKM0N21187KS0002987','MORFKHO','Mouse & keyboard Pair','0000243','Alsardgroup','General Manager Office','yes',0,'2024-07-30 10:36:30','2024-07-31 07:00:00'),(44,'lenovo','SKM0N21187KS0002987',' MPNXS832700D','all in one pc','0000244','Alsardgroup','General Manager Office','yes',0,'2024-07-30 10:44:44','2024-07-31 07:00:00'),(45,'Panasonic','9BBXE026575','KX-TG3711BX5','Handset phone','0000245','alsardgroup','General Manager Office','yes',0,'2024-07-30 10:47:38','2024-07-31 07:00:00'),(46,'canon','2QT32290',' I-sensys MF742Cdw','printer','0000246','alsardgroup','General Manager Office','yes',0,'2024-07-30 10:51:27','2024-07-31 07:00:00'),(47,'sunwood',' ','SD9331','Papper Shredder','0000247','alsardgroup','General Manager Office','yes',0,'2024-07-30 10:54:42','2024-07-31 07:00:00'),(48,'PCE','2318115 05513','M8-900','ups','0000248','alsardgroup','General Manager Office','yes',0,'2024-07-30 10:57:39','2024-07-31 07:00:00'),(49,'canon','MTNA927040','i-sensys LBP6020 ','ups','0000536','alsardgroup','Project Manager','yes',0,'2024-07-30 11:02:20','2024-07-31 07:00:00'),(50,'Microsoft ',' ',' ','Mouse ','0000537','alsardgroup','Project Manager','yes',0,'2024-07-30 11:05:41','2024-07-31 07:00:00'),(51,'lenovo','R90T3BPT',' 81AX','laptop','0000538','alsardgroup','Project Manager','yes',0,'2024-07-30 11:06:58','2024-07-31 07:00:00'),(52,'Logitech ','2238LZD1X6U8','M171','Mouse','0000142','alsardgroup','Admin Assistant','yes',0,'2024-07-30 11:17:13','2024-07-31 07:00:00'),(53,'HP','BCYSU0AHH5Z7UC','PR1101U','Keyboard','0000143','alsardgroup','Admin Assistant','yes',0,'2024-07-30 11:18:32','2024-07-31 07:00:00'),(54,' ','3CBCG052640','KX-T7730X','Telephone','0000144','alsardgroup','Admin Assistant','yes',0,'2024-07-30 11:20:38','2024-07-31 07:00:00'),(55,'ADATA',' ','UV220/8GB','Flash Memory','0000145','alsardgroup','Admin Assistant','yes',0,'2024-07-30 11:23:35','2024-07-31 07:00:00'),(56,'PCE','231811 506304','M8-900','UPS','0000146','alsardgroup','Admin Assistant','yes',0,'2024-07-30 11:24:40','2024-07-31 07:00:00'),(57,'DELL','CN0XXCGPTV20016L1JDVA00','SE2722H','Monitor','0000147','alsardgroup','Admin Assistant','yes',0,'2024-07-30 11:25:53','2024-07-31 07:00:00'),(58,'LG','707INEW37748',' 24MT48AF','Monitor','0000148','alsardgroup','Admin Assistant','yes',0,'2024-07-30 11:27:09','2024-07-31 07:00:00'),(59,'HP','VNBRQ4M0SS','Color Laser Jet Pro MFP M283fdw','Printer','0000149','alsardgroup','Admin Assistant','yes',0,'2024-07-30 11:43:11','2024-07-31 07:00:00'),(60,' ',' ','RECEIVER','HDMI EXTENDER','0000150','alsardgroup','Admin Assistant','yes',0,'2024-07-30 11:45:14','2024-07-31 07:00:00'),(61,'HP','TRF4170F46','PRO 3500 SERIES MT','PC Case','0000151','alsardgroup','Admin Assistant','yes',0,'2024-07-30 11:46:08','2024-07-31 07:00:00'),(62,'lenovo','SSKM0N61177AVLC9AY709X',' ','Mouse and KeyBoard Pair','0000177','alsardgroup','n','yes',0,'2024-07-30 11:51:59','2024-07-31 07:00:00'),(63,'lenovo','MP1NAK5Y','F0ER001YAX','All in one pc','0000178','alsardgroup','n','yes',0,'2024-07-30 11:56:49','2024-07-31 07:00:00'),(64,'Panasonic','PQQX168730ZA-BM','KX-T730CID','Telephone','0000179','alsardgroup','n','yes',0,'2024-07-30 12:00:07','2024-07-31 07:00:00'),(65,'I-sensys','GVD58955','MF4010','Printer','0000180','alsardgroup','n','yes',0,'2024-07-30 12:04:41','2024-07-31 07:00:00'),(66,'MAXMA','E1309017479','MA1500','UPS','0000865','alsardgroup','n','yes',0,'2024-07-30 12:06:29','2024-07-31 07:00:00'),(67,'Panasonic','1CBED086917',' KX-TG6711UE1','Hnadset phone ','0000156','alsardgroup','n','yes',0,'2024-07-30 12:12:16','2024-07-31 07:00:00'),(68,'lenovo','MP2DQFM3','F0GJ00KJAX','all in one pc','0000157','alsardgroup',' ','yes',0,'2024-07-30 12:13:38','2024-07-31 07:00:00'),(69,'lenovo','8SGX31C40691AVLC33N72KZ',' ','Mous and Keyboard Pair','0000158','alsardgroup','  ','yes',0,'2024-07-30 12:14:36','2024-07-31 07:00:00'),(70,'MAXIMA','E1203013937','MA1500','UPS','0000159','alsardgroup','n','yes',0,'2024-07-30 12:16:31','2024-07-31 07:00:00'),(71,'SUNWOOW',' ','SD9251','Papper Shredder','000055','alsardgroup','n','yes',0,'2024-07-30 12:24:18','2024-07-31 07:00:00'),(72,'Lenovo ','SKM0N21187KS0002AAW',' ','Mouse and KeyBoard Pair','0000172','alsardgroup','n','yes',0,'2024-07-30 12:26:01','2024-07-31 07:00:00'),(73,'lenovo','MP1ATMSH','F0D5008LAX','all in one pc','0000173','alsardgroup','n','yes',0,'2024-07-30 12:26:56','2024-07-31 07:00:00'),(74,'EPSON','S28K059877','L210','Printer','0000174','alsardgroup','n','yes',0,'2024-07-30 12:27:45','2024-07-31 07:00:00'),(75,'Binatone ','VT 1004014803G','Symphony 2210','Hanset Phone','0000175','alsardgroup','n','yes',0,'2024-07-30 12:28:52','2024-07-31 07:00:00'),(76,'MAXMA',' ','MA1500','UPS','0000176','alsardgroup','n','yes',0,'2024-07-30 12:31:12','2024-07-31 07:00:00'),(77,'xiaomi','47780/K3UU06182','pad 6 23043RP34G','Tablet','0000195','alsardgroup','n','yes',0,'2024-07-30 12:32:35','2024-07-31 07:00:00'),(78,'HP','5CD3454JD7','Pavilion TS 15 Notebook','laptop','0000240','alsardgroup','n','yes',0,'2024-07-30 12:43:57','2024-07-31 07:00:00'),(79,'ORICO',' ',' ','External Hard Drive','0000241','alsardgroup','n','yes',0,'2024-07-30 12:44:50','2024-07-31 07:00:00'),(80,'Panasonic','PQQX168730ZA-BM','KX-T730CID',' ','0000242','alsardgroup','n','yes',0,'2024-07-30 12:45:54','2024-07-31 07:00:00');
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

-- Dump completed on 2024-07-31 10:12:12
