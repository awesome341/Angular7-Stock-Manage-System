/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const MarqueController = require('../../controller/marqueController');
const marqueController = new MarqueController();

/**
 * Marque Entity routes
 */
router.get('/count', function(req, res) {
    marqueController.countAll(res);
});

router.get('/exists/:id', function(req, res) {
    marqueController.exists(req, res);
});

router.get('/:id', function(req, res) {
    marqueController.findById(req, res);
});

router.get('/', function(req, res) {
    marqueController.findAll(res);
});

router.put('/', function(req, res) {
    marqueController.update(req, res);
});

router.post('/', function(req, res) {
    marqueController.create(req, res);
});

router.delete('/:id', function(req, res) {
    marqueController.deleteById(req, res);
});

module.exports = router;