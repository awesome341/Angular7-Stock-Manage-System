/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const EntreeStockController = require('../../controller/entreeStockController');
const entreeStockController = new EntreeStockController();

/**
 * EntreeStock Entity routes
 */
router.get('/count', function(req, res) {
    entreeStockController.countAll(res);
});

router.get('/exists/:id', function(req, res) {
    entreeStockController.exists(req, res);
});

router.get('/:id', function(req, res) {
    entreeStockController.findById(req, res);
});

router.get('/', function(req, res) {
    entreeStockController.findAll(res);
});

router.put('/:id', function(req, res) {
    entreeStockController.update(req, res);
});

router.post('/', function(req, res) {
    entreeStockController.create(req, res);
});

router.delete('/:id', function(req, res) {
    entreeStockController.deleteById(req, res);
});

module.exports = router;