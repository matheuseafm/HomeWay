USE homeway_db;

-- Inserir usuários
INSERT INTO User (name, email, emailVerified, image, hashedPassword)
VALUES
  ('João Silva', 'joao@example.com', NOW(), 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', 'hashed_password1'),
  ('Maria Oliveira', 'maria@example.com', NOW(), 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', 'hashed_password2');

-- Inserir contas
INSERT INTO Account (userId, type, provider, providerAccountId, refresh_token, access_token)
SELECT id, 'oauth', 'google', CONCAT('google-uid-', ROW_NUMBER() OVER (ORDER BY id)), NULL, CONCAT('access-token-', ROW_NUMBER() OVER (ORDER BY id))
FROM User;

-- Inserir listings
INSERT INTO Listing (title, description, imageSrc, img2, IMG3, category, roomCount, bathroomCount, guestCount, locationValue, userId, price)
SELECT
  'Apartamento Moderno',
  'Apartamento confortável no centro da cidade',
   'https://share-site-prod.s3.amazonaws.com/ezgif_com_gif_maker_60_6802a31501.jpg',
  'https://share-site-prod.s3.amazonaws.com/ezgif_com_gif_maker_60_6802a31501.jpg',
  'https://share-site-prod.s3.amazonaws.com/ezgif_com_gif_maker_60_6802a31501.jpg',
  'apartamento',
  3,
  2,
  6,
  'SP',
  id,
  250
FROM User
WHERE email = 'joao@example.com'
UNION ALL
SELECT
  'Casa de Praia',
  'Casa aconchegante perto do mar',
   'https://share-site-prod.s3.amazonaws.com/ezgif_com_gif_maker_60_6802a31501.jpg',
  'https://share-site-prod.s3.amazonaws.com/ezgif_com_gif_maker_60_6802a31501.jpg',
  'https://share-site-prod.s3.amazonaws.com/ezgif_com_gif_maker_60_6802a31501.jpg',
  'casa',
  4,
  3,
  8,
  'RJ',
  id,
  400
FROM User
WHERE email = 'maria@example.com';

-- Inserir reservas
INSERT INTO Reservation (userId, listingId, startDate, endDate, totalPrice)
SELECT
  u2.id,
  l1.id,
  '2025-07-01',
  '2025-07-07',
  1750
FROM User u2
JOIN Listing l1 ON l1.userId = (SELECT id FROM User WHERE email = 'joao@example.com')
WHERE u2.email = 'maria@example.com'
UNION ALL
SELECT
  u1.id,
  l2.id,
  '2025-08-10',
  '2025-08-15',
  2000
FROM User u1
JOIN Listing l2 ON l2.userId = (SELECT id FROM User WHERE email = 'maria@example.com')
WHERE u1.email = 'joao@example.com';

-- Inserir favoritos
INSERT INTO Favorite (userId, listingId)
SELECT
  u1.id,
  l2.id
FROM User u1
JOIN Listing l2 ON l2.userId = (SELECT id FROM User WHERE email = 'maria@example.com')
WHERE u1.email = 'joao@example.com'
UNION ALL
SELECT
  u2.id,
  l1.id
FROM User u2
JOIN Listing l1 ON l1.userId = (SELECT id FROM User WHERE email = 'joao@example.com')
WHERE u2.email = 'maria@example.com';
