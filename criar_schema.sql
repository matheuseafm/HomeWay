CREATE DATABASE IF NOT EXISTS homeway_db;
USE homeway_db;

-- Tabela User
CREATE TABLE User (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  emailVerified DATETIME,
  image VARCHAR(255),
  hashedPassword VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Tabela Account
CREATE TABLE Account (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  userId CHAR(36),
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  providerAccountId VARCHAR(255) NOT NULL,
  refresh_token VARCHAR(255),
  access_token VARCHAR(255),
  expires_at INT,
  token_type VARCHAR(255),
  scope VARCHAR(255),
  id_token VARCHAR(255),
  session_state VARCHAR(255),
  CONSTRAINT fk_account_user FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
  UNIQUE KEY unique_provider_providerAccountId (provider, providerAccountId)
);

-- Tabela Listing
CREATE TABLE Listing (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  imageSrc VARCHAR(255) NOT NULL,
  img2 VARCHAR(255) NOT NULL,
  IMG3 VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  category VARCHAR(255) NOT NULL,
  roomCount INT NOT NULL,
  bathroomCount INT NOT NULL,
  guestCount INT NOT NULL,
  locationValue VARCHAR(255) NOT NULL,
  userId CHAR(36) NOT NULL,
  price INT NOT NULL,
  CONSTRAINT fk_listing_user FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

-- Tabela Reservation
CREATE TABLE Reservation (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  userId CHAR(36) NOT NULL,
  listingId CHAR(36) NOT NULL,
  startDate DATETIME NOT NULL,
  endDate DATETIME NOT NULL,
  totalPrice INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reservation_user FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
  CONSTRAINT fk_reservation_listing FOREIGN KEY (listingId) REFERENCES Listing(id) ON DELETE CASCADE
);

-- Tabela Favorite
CREATE TABLE Favorite (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  userId CHAR(36) NOT NULL,
  listingId CHAR(36) NOT NULL,
  CONSTRAINT fk_favorite_user FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
  CONSTRAINT fk_favorite_listing FOREIGN KEY (listingId) REFERENCES Listing(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_listing (userId, listingId)
);
