/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const DevisController = require('../../controller/devisController');
const devisController = new DevisController();

/**
 * Devis Entity routes
 */
router.get('/count', function(req, res) {
    devisController.countAll(res);
});

router.get('/exists/:id', function(req, res) {
    devisController.exists(req, res);
});

router.get('/:id', function(req, res) {
    devisController.findById(req, res);
});

router.get('/', function(req, res) {
    devisController.findAll(res);
});

router.put('/:id', function(req, res) {
    devisController.update(req, res);
});

router.post('/', function(req, res) {
    devisController.create(req, res);
});

router.delete('/:id', function(req, res) {
    devisController.deleteById(req, res);
});

module.exports = router;