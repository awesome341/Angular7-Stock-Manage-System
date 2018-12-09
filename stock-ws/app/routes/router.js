/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/produit', require('./api/produitRoutes'));
router.use('/categorie', require('./api/categorieRoutes'));
router.use('/achat', require('./api/achatRoutes'));
router.use('/client', require('./api/clientRoutes'));
router.use('/devis', require('./api/devisRoutes'));
router.use('/entreeStock', require('./api/entreeStockRoutes'));
router.use('/facture', require('./api/factureRoutes'));
router.use('/fournisseur', require('./api/fournisseurRoutes'));
router.use('/societe', require('./api/societeRoutes'));
router.use('/report', require('./api/reportRoutes'));
router.use('/marque', require('./api/marqueRoutes'));
router.use('/utilisateur', require('./api/utilisateurRoutes'));

module.exports = router;