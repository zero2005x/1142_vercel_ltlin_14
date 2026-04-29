CREATE TABLE "Category_14" (
    cid int NOT NULL PRIMARY KEY,
    cname varchar(255),
    size varchar(255),
    image_url text,
    remote_image_url text,
    link_url text
);


INSERT INTO "Category_14" (cid, cname, size, image_url, remote_image_url, link_url) 
VALUES 
(1, 'hats', null, '/images/midterm/homepage/hats.png', 'https://i.ibb.co/cvpntL1/hats.png', '/mid_14/hats'), 
(2, 'jackets', null, '/images/midterm/homepage/jackets.png', 'https://i.ibb.co/px2tCc3/jackets.png', '/mid_14/jackets'), 
(3, 'sneakers', null, '/images/midterm/homepage/sneakers.png', 'https://i.ibb.co/0jqHpnp/sneakers.png', '/mid_14/sneakers'), 
(4, 'womens', 'large', '/images/midterm/homepage/womens.png', 'https://i.ibb.co/GCCdy8t/womens.png', '/mid_14/womens'), 
(5, 'mens', 'large', '/images/midterm/homepage/mens.png', 'https://i.ibb.co/R70vBrQ/men.png', '/mid_14/mens');

CREATE TABLE "Shop_14" (
    pid int NOT NULL PRIMARY KEY,
    pname varchar(255),
    cat_id int,
    price real,
    img_url text,
    remote_img_url text
);



INSERT INTO "Shop_14" (pid, pname, cat_id, price, img_url, remote_img_url) 
VALUES 
(1, 'Brown Brim', 1, 25, '/images/midterm/hats/brown-brim.png', 'https://i.ibb.co/ZYW3VTp/brown-brim.png'), 
(2, 'Blue Beanie', 1, 18, '/images/midterm/hats/blue-beanie.png', 'https://i.ibb.co/ypkgK0X/blue-beanie.png'), 
(3, 'Brown Cowboy', 1, 35, '/images/midterm/hats/brown-cowboy.png', 'https://i.ibb.co/QdJwgmp/brown-cowboy.png'), 
(4, 'Grey Brim', 1, 25, '/images/midterm/hats/grey-brim.png', 'https://i.ibb.co/RjBLWxB/grey-brim.png'), 
(5, 'Green Beanie', 1, 18, '/images/midterm/hats/green-beanie.png', 'https://i.ibb.co/YTjW3vF/green-beanie.png'),
(6, 'Palm Tree Cap', 1, 14, '/images/midterm/hats/palm-tree-cap.png', 'https://i.ibb.co/rKBDvJX/palm-tree-cap.png'),
(7, 'Red Beanie', 1, 18, '/images/midterm/hats/red-beanie.png', 'https://i.ibb.co/bLB646Z/red-beanie.png'), 
(8, 'Wolf Cap', 1, 14, '/images/midterm/hats/wolf-cap.png', 'https://i.ibb.co/1f2nWMM/wolf-cap.png'), 
(9, 'Blue Snapback', 1, 16, '/images/midterm/hats/blue-snapback.png', 'https://i.ibb.co/X2VJP2W/blue-snapback.png'), 
(10, 'Black Jean Shearling', 2, 125, '/images/midterm/jackets/black-shearling.png', 'https://i.ibb.co/XzcwL5s/black-shearling.png'), 
(11, 'Blue Jean Jacket', 2, 90, '/images/midterm/jackets/blue-jean-jacket.png', 'https://i.ibb.co/mJS6vz0/blue-jean-jacket.png'), 
(12, 'Grey Jean Jacket', 2, 90, '/images/midterm/jackets/grey-jean-jacket.png', 'https://i.ibb.co/N71k1ML/grey-jean-jacket.png'), 
(13, 'Brown Shearling', 2, 165, '/images/midterm/jackets/brown-shearling.png', 'https://i.ibb.co/s96FpdP/brown-shearling.png'), 
(14, 'Tan Trench', 2, 185, '/images/midterm/jackets/brown-trench.png', 'https://i.ibb.co/M6hHc3F/brown-trench.png'), 
(15, 'Adidas NMD', 3, 220, '/images/midterm/sneakers/adidas-nmd.png', 'https://i.ibb.co/0s3pdnc/adidas-nmd.png'), 
(16, 'Adidas Yeezy', 3, 280, '/images/midterm/sneakers/yeezy.png', 'https://i.ibb.co/dJbG1cT/yeezy.png'), 
(17, 'Black Converse', 3, 110, '/images/midterm/sneakers/black-converse.png', 'https://i.ibb.co/bPmVXyP/black-converse.png'), 
(18, 'Nike White AirForce', 3, 160, '/images/midterm/sneakers/white-nike-high-tops.png', 'https://i.ibb.co/1RcFPk0/white-nike-high-tops.png'), 
(19, 'Nike Red High Tops', 3, 160, '/images/midterm/sneakers/nikes-red.png', 'https://i.ibb.co/QcvzydB/nikes-red.png'), 
(20, 'Nike Brown High Tops', 3, 160, '/images/midterm/sneakers/nike-brown.png', 'https://i.ibb.co/fMTV342/nike-brown.png'), 
(21, 'Air Jordan Limited', 3, 190, '/images/midterm/sneakers//nike-funky.png', 'https://i.ibb.co/w4k6Ws9/nike-funky.png'), 
(22, 'Timberlands', 3, 200, '/images/midterm/sneakers/timberlands.png', 'https://i.ibb.co/Mhh6wBg/timberlands.png'), 
(23, 'Blue Tanktop', 4, 25, '/images/midterm/womens/blue-tank.png', 'https://i.ibb.co/7CQVJNm/blue-tank.png'), 
(24, 'Floral Blouse', 4, 20, '/images/midterm/womens/floral-blouse.png', 'https://i.ibb.co/4W2DGKm/floral-blouse.png'), 
(25, 'Floral Dress ', 4, 80, '/images/midterm/womens/floral-skirt.png', 'https://i.ibb.co/KV18Ysr/floral-skirt.png'), 
(26, 'Red Dots Dress', 4, 80, '/images/midterm/womens/red-polka-dot-dress.png', 'https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png'), 
(27, 'Striped Sweater', 4, 45, '/images/midterm/womens/striped-sweater.png', 'https://i.ibb.co/KmSkMbH/striped-sweater.png'), 
(28, 'Yellow Track Suit', 4, 135, '/images/midterm/womens/yellow-track-suit.png', 'https://i.ibb.co/v1cvwNf/yellow-track-suit.png'), 
(29, 'White Blouse', 4, 20, '/images/midterm/womens/white-vest.png', 'https://i.ibb.co/qBcrsJg/white-vest.png'), 
(30, 'Camo Down Vest', 5, 325, '/images/midterm/mens/camo-vest.png', 'https://i.ibb.co/xJS0T3Y/camo-vest.png'), 
(31, 'Floral T-shirt', 5, 20, '/images/midterm/mens/floral-shirt.png', 'https://i.ibb.co/qMQ75QZ/floral-shirt.png'), 
(32, 'Black & White Longsleeve', 5, 25, '/images/midterm/mens/long-sleeve.png', 'https://i.ibb.co/55z32tw/long-sleeve.png'), 
(33, 'Pink T-shirt ', 5, 25, '/images/midterm/mens/pink-shirt.png', 'https://i.ibb.co/RvwnBL8/pink-shirt.png'), 
(34, 'Jean Long Sleeve', 5, 40, '/images/midterm/mens/roll-up-jean-shirt.png', 'https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png'), 
(35, 'Burgundy T-shirt', 5, 25, '/images/midterm/mens/polka-dot-shirt.png', 'https://i.ibb.co/mh3VM1f/polka-dot-shirt.png');

