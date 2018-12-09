/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const ProduitController = require('../../controller/produitController');
const produitController = new ProduitController();

/**
 * Produit Entity routes
 */
router.get('/count', function(req, res) {
    produitController.countAll(res);
});

router.get('/exists/:id', function(req, res) {
    produitController.exists(req, res);
});

router.get('/:id', function(req, res) {
    produitController.findById(req, res);
});

router.get('/', function(req, res) {
    produitController.findAll(res);
});

router.put('/', function(req, res) {
    produitController.update(req, res);
});

router.post('/', function(req, res) {
    produitController.create(req, res);
});

router.delete('/:id', function(req, res) {
    produitController.deleteById(req, res);
});

module.exports = router;