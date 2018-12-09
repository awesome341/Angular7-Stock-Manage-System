/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const FournisseurController = require('../../controller/fournisseurController');
const fournisseurController = new FournisseurController();

/**
 * Fournisseur Entity routes
 */
router.get('/count', function(req, res) {
    fournisseurController.countAll(res);
});

router.get('/exists/:id', function(req, res) {
    fournisseurController.exists(req, res);
});

router.get('/:id', function(req, res) {
    fournisseurController.findById(req, res);
});

router.get('/', function(req, res) {
    fournisseurController.findAll(res);
});

router.put('/', function(req, res) {
    fournisseurController.update(req, res);
});

router.post('/', function(req, res) {
    fournisseurController.create(req, res);
});

router.delete('/:id', function(req, res) {
    fournisseurController.deleteById(req, res);
});

module.exports = router;