-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: team14db
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `appointment` (
  `idappointment` int NOT NULL AUTO_INCREMENT,
  `description` longtext NOT NULL,
  `status` enum('approved','denied','pending') NOT NULL DEFAULT 'pending',
  `date` date NOT NULL,
  `user_iduser` varchar(45) NOT NULL,
  `officeHour_idofficeHour` int NOT NULL,
  PRIMARY KEY (`idappointment`),
  KEY `fk_appointment_user_idx` (`user_iduser`),
  KEY `fk_appointment_officeHour1_idx` (`officeHour_idofficeHour`),
  CONSTRAINT `fk_appointment_officeHour1` FOREIGN KEY (`officeHour_idofficeHour`) REFERENCES `officeHour` (`idofficeHour`),
  CONSTRAINT `fk_appointment_user` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom`
--

DROP TABLE IF EXISTS `classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `classroom` (
  `idclassroom` varchar(64) NOT NULL,
  `writeup` TEXT,
  PRIMARY KEY (`idclassroom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forumReply`
--

DROP TABLE IF EXISTS `forumReply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `forumReply` (
  `idforumReply` int NOT NULL AUTO_INCREMENT,
  `reply` longtext NOT NULL,
  `forumThread_idforumThread` int NOT NULL,
  `user_iduser` varchar(45) NOT NULL,
  PRIMARY KEY (`idforumReply`),
  KEY `fk_forumReply_forumThread1_idx` (`forumThread_idforumThread`),
  KEY `fk_forumReply_user1_idx` (`user_iduser`),
  CONSTRAINT `fk_forumReply_forumThread1` FOREIGN KEY (`forumThread_idforumThread`) REFERENCES `forumThread` (`idforumThread`),
  CONSTRAINT `fk_forumReply_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forumReply`
--

LOCK TABLES `forumReply` WRITE;
/*!40000 ALTER TABLE `forumReply` DISABLE KEYS */;
/*!40000 ALTER TABLE `forumReply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forumThread`
--

DROP TABLE IF EXISTS `forumThread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `forumThread` (
  `idforumThread` int NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  `paragraph` longtext NOT NULL,
  `user_iduser` varchar(45) NOT NULL,
  `classroom_idclassroom` varchar(64) NOT NULL,
  PRIMARY KEY (`idforumThread`),
  KEY `fk_forumThread_user1_idx` (`user_iduser`),
  KEY `fk_forumThread_classroom1_idx` (`classroom_idclassroom`),
  CONSTRAINT `fk_forumThread_user1` FOREIGN KEY (`user_iduser`,`classroom_idclassroom`) REFERENCES `user` (`iduser`,`classroom_idclassroom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forumThread`
--

LOCK TABLES `forumThread` WRITE;
/*!40000 ALTER TABLE `forumThread` DISABLE KEYS */;
/*!40000 ALTER TABLE `forumThread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `officeHour`
--

DROP TABLE IF EXISTS `officeHour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `officeHour` (
  `idofficeHour` int NOT NULL AUTO_INCREMENT,
  `in effect` tinyint NOT NULL DEFAULT 1,
  `time_start` time NOT NULL,
  `time_end` time NOT NULL,
  `day_of_week` tinyint NOT NULL,
  `classroom_idclassroom` varchar(64) NOT NULL,
  `user_iduser` varchar(45) NOT NULL,
  PRIMARY KEY (`idofficeHour`),
  KEY `fk_officeHour_tutorProfile1_idx` (`user_iduser`),
  KEY `fk_classroom_idclassroom_idx` (`classroom_idclassroom`),
  CONSTRAINT `fk_officeHour_user_iduser` FOREIGN KEY (`user_iduser`,`classroom_idclassroom`) REFERENCES `user` (`iduser`,`classroom_idclassroom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officeHour`
--

LOCK TABLES `officeHour` WRITE;
/*!40000 ALTER TABLE `officeHour` DISABLE KEYS */;
/*!40000 ALTER TABLE `officeHour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `tickets` (
  `idtickets` int NOT NULL AUTO_INCREMENT,
  `description` longtext NOT NULL,
  `response` longtext,
  `time_posted` datetime NOT NULL,
  `time_resolved` datetime,
  `feedback_style` enum('hands on','visual','conceptual'),
  `status` enum('in progress','unresolved','resolved') NOT NULL DEFAULT 'resolved',
  `textual_feedback` longtext,
  `studentId` varchar(45) NOT NULL,
  `tutorId` varchar(45),
  `user_classroom_idclassroom1` varchar(64) NOT NULL,
  PRIMARY KEY (`idtickets`),
  KEY `fk_tickets_tutorProfile1_idx` (`tutorId`,`user_classroom_idclassroom1`),
  KEY `fk_tickets_user2_idx` (`studentId`,`user_classroom_idclassroom1`),
  CONSTRAINT `fk_tickets_tutorProfile1` FOREIGN KEY (`tutorId`, `user_classroom_idclassroom1`) REFERENCES `user` (`iduser`, `classroom_idclassroom`),
  CONSTRAINT `fk_tickets_user2` FOREIGN KEY (`studentId`, `user_classroom_idclassroom1`) REFERENCES `user` (`iduser`, `classroom_idclassroom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutorProfile`
--

DROP TABLE IF EXISTS `tutorProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `tutorProfile` (
  `idtutorProfile` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `biography` longtext,
  `style` enum('hands-on','visual','conceptual'),
  `classroom_idclassroom` varchar(64) NOT NULL,
  PRIMARY KEY (`idtutorProfile`),
  KEY `fk_tutorProfile_classroom1_idx` (`classroom_idclassroom`),
  CONSTRAINT `fk_tutorProfile_classroom1` FOREIGN KEY (`classroom_idclassroom`) REFERENCES `classroom` (`idclassroom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutorProfile`
--

LOCK TABLES `tutorProfile` WRITE;
/*!40000 ALTER TABLE `tutorProfile` DISABLE KEYS */;
/*!40000 ALTER TABLE `tutorProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` varchar(45) NOT NULL,
  `user_type` enum('student','staff') NOT NULL,
  `classroom_idclassroom` varchar(64) NOT NULL,
  PRIMARY KEY (`iduser`,`classroom_idclassroom`),
  KEY `fk_user_classroom1_idx` (`classroom_idclassroom`),
  CONSTRAINT `fk_user_classroom1` FOREIGN KEY (`classroom_idclassroom`) REFERENCES `classroom` (`idclassroom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

CREATE USER IF NOT EXISTS `client`;
GRANT SELECT,INSERT,UPDATE ON * TO `client`;

CREATE OR REPLACE VIEW availableOfficeHour AS SELECT UNIX_TIMESTAMP(ADDTIME(DATE_ADD(CURDATE(),INTERVAL (day_of_week-DAYOFWEEK(CURDATE())+7)MOD 7 DAY),time_start)) AS time_start, UNIX_TIMESTAMP(ADDTIME(DATE_ADD(CURDATE(),INTERVAL (day_of_week-DAYOFWEEK(CURDATE())+7)MOD 7 DAY),time_end)) AS time_end,user_iduser,classroom_idclassroom,idofficeHour FROM officeHour WHERE `in effect`=1 AND idofficeHour NOT IN (SELECT idappointment  FROM appointment WHERE date>=CURDATE() AND status != 'denied');

CREATE OR REPLACE VIEW unavailableOfficeHour AS SELECT UNIX_TIMESTAMP(ADDTIME(DATE_ADD(CURDATE(),INTERVAL (day_of_week-DAYOFWEEK(CURDATE())+7)MOD 7 DAY),time_start)) AS time_start, UNIX_TIMESTAMP(ADDTIME(DATE_ADD(CURDATE(),INTERVAL (day_of_week-DAYOFWEEK(CURDATE())+7)MOD 7 DAY),time_end)) AS time_end,user_iduser,classroom_idclassroom,idofficeHour FROM officeHour WHERE `in effect`=1 AND idofficeHour IN (SELECT idappointment  FROM appointment WHERE date>=CURDATE() AND status != 'denied');

CREATE OR REPLACE VIEW futureAppointment AS SELECT appointment.idappointment AS appointmentId, appointment.description AS `description`,appointment.date AS `date`,appointment.user_iduser AS `studentId`,officeHour.idofficeHour AS officeHourId,officeHour.time_start as time_start,officeHour.time_end AS time_end,officeHour.classroom_idclassroom AS classroomId,officeHour.user_iduser AS tutorId FROM appointment INNER JOIN officeHour ON appointment.officeHour_idofficeHour = officeHour.idofficeHour WHERE appointment.date  >= CURDATE() AND officeHour.`in effect` = 1;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-18 17:47:30