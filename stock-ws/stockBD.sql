--
-- Fichier généré par SQLiteStudio v3.1.1 sur lun. juin 11 02:24:57 2018
--
-- Encodage texte utilisé : System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table : achat
CREATE TABLE achat (
    id INTEGER   PRIMARY KEY  AUTOINCREMENT,
    productName                CHAR (255),
    qte                INTEGER,
    sellPriceHt DOUBLE,
    sellPriceTtc DOUBLE,
    tva                DOUBLE,
    remise DOUBLE,
    disabled BOOLEAN,
    suppressionDate DATE,
    modificationDate DATE,
    factureId         BIGINT,
    produitId         BIGINT,

    FOREIGN KEY(produitId) REFERENCES produit(id),
	    FOREIGN KEY(factureId) REFERENCES facture(id)

);
INSERT INTO achat (id, productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId, produitId) VALUES (1, NULL, 1, NULL, NULL, 2, 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO achat (id, productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId, produitId) VALUES (2, NULL, 4, NULL, NULL, 5, 6, NULL, NULL, NULL, NULL, NULL);
INSERT INTO achat (id, productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId, produitId) VALUES (3, NULL, 2, NULL, NULL, 16, 5, NULL, NULL, NULL, NULL, NULL);
INSERT INTO achat (id, productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId, produitId) VALUES (4, NULL, 2, NULL, NULL, 9, 5, NULL, NULL, NULL, NULL, NULL);
INSERT INTO achat (id, productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId, produitId) VALUES (5, NULL, 10, 2, 2.1, 5, 3, NULL, NULL, NULL, 17, NULL);
INSERT INTO achat (id, productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId, produitId) VALUES (6, NULL, 10, 2, 2.2, 10, 3, NULL, NULL, NULL, 18, NULL);
INSERT INTO achat (id, productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId, produitId) VALUES (7, NULL, 0, 2, 2, 0, 0, NULL, NULL, NULL, 19, NULL);
INSERT INTO achat (id, productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId, produitId) VALUES (8, NULL, 22, 2, 2, 0, 0, NULL, NULL, NULL, 20, NULL);
INSERT INTO achat (id, productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId, produitId) VALUES (9, NULL, 100, 2, 2.36, 18, 5, NULL, NULL, NULL, 21, NULL);
INSERT INTO achat (id, productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId, produitId) VALUES (10, NULL, 5, 2, 2, 0, 0, NULL, NULL, NULL, 22, NULL);

-- Table : categorie
CREATE TABLE categorie (
    id                 INTEGER     PRIMARY KEY  AUTOINCREMENT,
    name                CHAR (255),
    subCategoryId         BIGINT,
    FOREIGN KEY(subCategoryId) REFERENCES categorie(id)
);

-- Table : client
CREATE TABLE client (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName                CHAR (255),
    lastName                CHAR (255),
	paymentMode                CHAR (50),
      	address                CHAR (255),
      	telephone                CHAR (8),
		fax                CHAR (8),
      	email                CHAR (255)
);
INSERT INTO client (id, firstName, lastName, paymentMode, address, telephone, fax, email) VALUES (27, 'Achour6', 'Nidhal1', 'Espèce', 'adresse', NULL, NULL, NULL);
INSERT INTO client (id, firstName, lastName, paymentMode, address, telephone, fax, email) VALUES (28, 'Achour', 'Nidhal', 'Espèce', NULL, NULL, NULL, NULL);

-- Table : devis
CREATE TABLE devis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
	totalPriceHt         INTEGER,
	totalPriceTtc         INTEGER,
	creationDate         INTEGER,
    clientId               BIGINT,
    FOREIGN KEY(clientId) REFERENCES client(id)
);

-- Table : entreeStock
CREATE TABLE entreeStock (
    id INTEGER  PRIMARY KEY AUTOINCREMENT,
	qte         INTEGER,
    unitFournisPrice DOUBLE,
	gainMarge         DOUBLE,
    entryDate               DATE,
    productId               BIGINT,

    FOREIGN KEY(productId) REFERENCES produit(id)
);

-- Table : facture
CREATE TABLE facture (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
	totalPriceHt         INTEGER,
	totalPriceTtc         INTEGER,
	creationDate         INTEGER,
    clientId               BIGINT,
   
    FOREIGN KEY(clientId) REFERENCES client(id)
);
INSERT INTO facture (id, totalPriceHt, totalPriceTtc, creationDate, clientId) VALUES (10, NULL, NULL, NULL, NULL);
INSERT INTO facture (id, totalPriceHt, totalPriceTtc, creationDate, clientId) VALUES (11, NULL, NULL, NULL, NULL);
INSERT INTO facture (id, totalPriceHt, totalPriceTtc, creationDate, clientId) VALUES (12, NULL, NULL, NULL, NULL);
INSERT INTO facture (id, totalPriceHt, totalPriceTtc, creationDate, clientId) VALUES (13, NULL, NULL, NULL, 3);
INSERT INTO facture (id, totalPriceHt, totalPriceTtc, creationDate, clientId) VALUES (14, NULL, NULL, NULL, NULL);
INSERT INTO facture (id, totalPriceHt, totalPriceTtc, creationDate, clientId) VALUES (15, NULL, NULL, NULL, NULL);
INSERT INTO facture (id, totalPriceHt, totalPriceTtc, creationDate, clientId) VALUES (16, NULL, NULL, NULL, NULL);
INSERT INTO facture (id, totalPriceHt, totalPriceTtc, creationDate, clientId) VALUES (17, 20, 21, NULL, NULL);
INSERT INTO facture (id, totalPriceHt, totalPriceTtc, creationDate, clientId) VALUES (18, 20, 22, NULL, NULL);
INSERT INTO facture (id, totalPriceHt, totalPriceTtc, creationDate, clientId) VALUES (19, 0, 2, NULL, 3);
INSERT INTO facture (id, totalPriceHt, totalPriceTtc, creationDate, clientId) VALUES (20, 44, 2, NULL, 4);
INSERT INTO facture (id, totalPriceHt, totalPriceTtc, creationDate, clientId) VALUES (21, 200, -2.64, NULL, NULL);
INSERT INTO facture (id, totalPriceHt, totalPriceTtc, creationDate, clientId) VALUES (22, 10, 2, NULL, NULL);

-- Table : fournisseur
CREATE TABLE fournisseur (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName                CHAR (255),
    lastName                CHAR (255),
      	address                CHAR (255),
      	telephone                CHAR (8),
		fax                CHAR (8),
      	email                CHAR (255)
);
INSERT INTO fournisseur (id, firstName, lastName, address, telephone, fax, email) VALUES (4, 'achour', 'Nidhal2', NULL, NULL, NULL, NULL);
INSERT INTO fournisseur (id, firstName, lastName, address, telephone, fax, email) VALUES (7, 'achour', 'nidhal', NULL, NULL, NULL, NULL);
INSERT INTO fournisseur (id, firstName, lastName, address, telephone, fax, email) VALUES (8, 'achour', 'sa', NULL, NULL, NULL, NULL);

-- Table : marque
CREATE TABLE marque (
    id                 INTEGER     PRIMARY KEY  AUTOINCREMENT,
    label                CHAR (255)
);
INSERT INTO marque (id, label) VALUES (11, '');
INSERT INTO marque (id, label) VALUES (42, 't""t');

-- Table : produit
CREATE TABLE produit (
	   id INTEGER PRIMARY KEY AUTOINCREMENT,

    ref                CHAR (255),
	description                TEXT,
    tva               DOUBLE,
    qte                INTEGER,
    unitSellPriceHt DOUBLE,
	categoryId         BIGINT,
	marqueId         BIGINT,
    FOREIGN KEY(categoryId) REFERENCES categorie(id)
	FOREIGN KEY(marqueId) REFERENCES marque(id)
);

-- Table : societe
CREATE TABLE societe (
    id  INTEGER  PRIMARY KEY AUTOINCREMENT,
    name                CHAR (255),
	matriculeFiscale          CHAR (255),
	logoName         CHAR (255),
	description   TEXT
   );

-- Table : utilisateur
CREATE TABLE utilisateur (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName                CHAR (255),
    lastName                CHAR (255),
      	password                CHAR (255),
      	telephone                CHAR (8),
		role                CHAR (8),
      	email                CHAR (255)
);
INSERT INTO utilisateur (id, firstName, lastName, password, telephone, role, email) VALUES (2, 'ACHOUR', 'nidhal', 'password', '55584920', 'admin', 'email@gmail.com');
INSERT INTO utilisateur (id, firstName, lastName, password, telephone, role, email) VALUES (3, 'ACHOUR', 'nidhal', 'password', '55584920', 'admin', 'email@gmail.com');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
