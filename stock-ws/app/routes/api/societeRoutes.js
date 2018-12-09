/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const SocieteController = require('../../controller/societeController');
const societeController = new SocieteController();

/**
 * Societe Entity routes
 */
router.get('/count', function(req, res) {
    societeController.countAll(res);
});

router.get('/exists/:id', function(req, res) {
    societeController.exists(req, res);
});

router.get('/:id', function(req, res) {
    societeController.findById(req, res);
});

router.get('/', function(req, res) {
    societeController.findAll(res);
});

router.put('/', function(req, res) {
    societeController.update(req, res);
});

router.post('/', function(req, res) {
    societeController.create(req, res);
});

router.delete('/:id', function(req, res) {
    societeController.deleteById(req, res);
});

module.exports = router;