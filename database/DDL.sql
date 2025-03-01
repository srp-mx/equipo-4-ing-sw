/*
Script to create the database schema.
*/

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

--------------------------------------------------------
-------------------- TABLE CREATION --------------------
--------------------------------------------------------

-- Accompanies table

CREATE TABLE Accompanies(
    Name VARCHAR(50),
    Id INT,
    Since DATE
);

-- Armor table

CREATE TABLE Armor(
    Id INT,
    Rarity INT,
    DescriptionUri VARCHAR(50),
    ImageUri VARCHAR(50),
    NameUri VARCHAR(50),
    Strength INT,
    Defense INT,
    Intelligence INT,
    Heart INT,
    DamageReceived INT
);

-- Assignment table

CREATE TABLE Assignment(
    Id INT,
    Name VARCHAR(100),
    StartDate DATE,
    EndDate DATE,
    Username VARCHAR(50),
    Optional BOOLEAN,
    Done BOOLEAN,
    Notes VARCHAR(500),
    Type INT,
    Name VARCHAR(100),
    Grade DOUBLE,
    DueDate DATE
);

-- Befriends table

CREATE TABLE Befriends(
    SourceUsername VARCHAR(50),
    DestinationUsername VARCHAR(50),
    Since DATE
);

-- Character table

CREATE TABLE Character(
    Name VARCHAR(50),
    Username VARCHAR(50),
    ExtraPoints INT,
    MomentOfLatestAction TIMESTAMP,
    Streak INT,
    Hp INT,
    StrengthExtra INT,
    DefenseExtra INT,
    IntelligenceExtra INT,
    HeartExtra INT,
    Type VARCHAR(30)
);

-- Clan table

CREATE TABLE Clan(
    Name VARCHAR(50),
    Username VARCHAR(50),
    Description VARCHAR(500),
    VictoryCount INT,
    LogoUri VARCHAR(50),
    Xp INT
);

-- Class table

CREATE TABLE Class(
    Name VARCHAR(100),
    StartDate DATE,
    EndDate DATE,
    Username VARCHAR(50),
    GradeFormula VARCHAR(200)
);

-- Equips table

CREATE TABLE Equips(
    Name VARCHAR(50),
    Id INT,
    Since DATE
);

-- Invites table

CREATE TABLE Invites(
    Username VARCHAR(50),
    Name VARCHAR(50),
    ExpiryDate DATE
);

-- OwnsArmor table

CREATE TABLE OwnsArmor(
    Name VARCHAR(50),
    Id INT,
    Since DATE
);

-- OwnsPet table

CREATE TABLE OwnsPet(
    Name VARCHAR(50),
    Id INT,
    Since DATE
);

-- OwnsWeapon table

CREATE TABLE OwnsWeapon(
    Name VARCHAR(50),
    Id INT,
    Since DATE
);

-- Pet table

CREATE TABLE Pet(
    Id INT,
    Rarity INT,
    DescriptionUri VARCHAR(50),
    ImageUri VARCHAR(50),
    Strength INT,
    Defense INT,
    Intelligence INT,
    Heart INT,
    Bond INT,
    Name VARCHAR(50)
);

-- Tags table

CREATE TABLE Tags(
    Id INT,
    Name VARCHAR(50),
    StartDate DATE,
    EndDate DATE,
    Username VARCHAR(50),
);

-- User table

CREATE TABLE User(
    Username VARCHAR(50),
    Name VARCHAR(50),
    Email VARCHAR(100),
    Password VARCHAR(100),
    Since DATE
);

-- Weapon table

CREATE TABLE Weapon(
    Id INT,
    Rarity INT,
    DescriptionUri VARCHAR(50),
    ImageUri VARCHAR(50),
    Strength INT,
    Defense INT,
    Intelligence INT,
    Heart INT,
    SlayCount INT
);

-- Wears table

CREATE TABLE Wears(
    Name VARCHAR(50),
    Id INT,
    Since DATE
);

--------------------------------------------------------
------------------ ENTITY RESTRICTIONS -----------------
--------------------------------------------------------

-- Accompanies table
-- Armor table
-- Assignment table
-- Befriends table
-- Character table
-- Clan table
-- Class table
-- Equips table
-- Invites table
-- OwnsArmor table
-- OwnsPet table
-- OwnsWeapon table
-- Pet table
-- Tags table
-- User table
-- Weapon table
-- Wears table

--------------------------------------------------------
------------------ DOMAIN RESTRICTIONS -----------------
--------------------------------------------------------

-- Accompanies table
-- Armor table
-- Assignment table
-- Befriends table
-- Character table
-- Clan table
-- Class table
-- Equips table
-- Invites table
-- OwnsArmor table
-- OwnsPet table
-- OwnsWeapon table
-- Pet table
-- Tags table
-- User table
-- Weapon table
-- Wears table

--------------------------------------------------------
--------------- REFERENTIAL RESTRICTIONS ---------------
--------------------------------------------------------

-- Accompanies table
-- Armor table
-- Assignment table
-- Befriends table
-- Character table
-- Clan table
-- Class table
-- Equips table
-- Invites table
-- OwnsArmor table
-- OwnsPet table
-- OwnsWeapon table
-- Pet table
-- Tags table
-- User table
-- Weapon table
-- Wears table
