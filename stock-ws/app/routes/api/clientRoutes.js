/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const ClientController = require('../../controller/clientController');
const clientController = new ClientController();

/**
 * Client Entity routes
 */
router.get('/count', function(req, res) {
    clientController.countAll(res);
});

router.get('/exists/:id', function(req, res) {
    clientController.exists(req, res);
});

router.get('/:id', function(req, res) {
    clientController.findById(req, res);
});

router.get('/', function(req, res) {
    clientController.findAll(res);
});

router.put('/', function(req, res) {
    clientController.update(req, res);
});

router.post('/', function(req, res) {
    clientController.create(req, res);
});

router.delete('/:id', function(req, res) {
    clientController.deleteById(req, res);
});

module.exports = router;