/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const AchatController = require('../../controller/achatController');
const achatController = new AchatController();

/**
 * Achat Entity routes
 */
router.get('/count', function(req, res) {
    achatController.countAll(res);
});

router.get('/exists/:id', function(req, res) {
    achatController.exists(req, res);
});

router.get('/:id', function(req, res) {
    achatController.findById(req, res);
});

router.get('/', function(req, res) {
    achatController.findAll(res);
});

router.put('/:id', function(req, res) {
    achatController.update(req, res);
});

router.post('/', function(req, res) {
    achatController.create(req, res);
});

router.delete('/:id', function(req, res) {
    achatController.deleteById(req, res);
});

module.exports = router;