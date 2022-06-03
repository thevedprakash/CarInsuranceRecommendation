create database carzo;
USE `carzo`;
 
/****** Object:  Table [dbo].[CarMake]    Script Date: 28-08-2019 17:43:47 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE CarMake(
	`MakeId`varchar(50) NOT NULL,
	`MakeName` varchar(50) NULL
);
/****** Object:  Table [dbo].[CarMakeYear]    Script Date: 28-08-2019 17:43:48 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE CarMakeYear(
	`ModelId` varchar(50) NULL,
	`Year` int NULL
);
/****** Object:  Table [dbo].[CarModel]    Script Date: 28-08-2019 17:43:48 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE CarModel(
	`MakeId` varchar(50) NOT NULL,
	`ModelId` varchar(50) NULL,
	`ModelName` varchar(255) NULL
);
/****** Object:  Table [dbo].[Cars]    Script Date: 28-08-2019 17:43:48 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE Cars(
	`ModelId` varchar(50) NULL,
	`Usage` varchar(50) NULL,
	`Year` int NULL,
	`IDV_Category` varchar(10) NULL,
	`Price` int NULL
);
/****** Object:  Table [dbo].[Cars_Master]    Script Date: 28-08-2019 17:43:48 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE Cars_Master(
	`MakeID` varchar(50) NOT NULL,
	`ModelID` varchar(50) NULL,
	`MakeName` varchar(50) NULL,
	`Usage` varchar(50) NULL,
	`Year` int NULL,
	`IDV_Category` varchar(10) NULL,
	`Price` int NULL,
	`ModelName` varchar(255) NULL
);
