/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const FactureController = require('../../controller/factureController');
const factureController = new FactureController();

/**
 * Facture Entity routes
 */
router.get('/count', function(req, res) {
    factureController.countAll(res);
});

router.get('/exists/:id', function(req, res) {
    factureController.exists(req, res);
});

router.get('/:id', function(req, res) {
    factureController.findById(req, res);
});

router.get('/', function(req, res) {
    factureController.findAll(res);
});

router.put('/', function(req, res) {
    factureController.update(req, res);
});

router.post('/', function(req, res) {
    factureController.create(req, res);
});

router.delete('/:id', function(req, res) {
    factureController.deleteById(req, res);
});

module.exports = router;