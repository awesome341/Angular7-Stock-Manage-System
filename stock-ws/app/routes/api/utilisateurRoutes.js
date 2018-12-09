/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const UtilisateurController = require('../../controller/utilisateurController');
const utilisateurController = new UtilisateurController();

/**
 * utilisateur Entity routes
 */
router.get('/count', function(req, res) {
    utilisateurController.countAll(res);
});

router.get('/exists/:id', function(req, res) {
    utilisateurController.exists(req, res);
});

router.get('/:id', function(req, res) {
    utilisateurController.findById(req, res);
});

router.get('/', function(req, res) {
    utilisateurController.findAll(res);
});

router.put('/:id', function(req, res) {
    utilisateurController.update(req, res);
});

router.post('/', function(req, res) {
    utilisateurController.create(req, res);
});

router.delete('/:id', function(req, res) {
    utilisateurController.deleteById(req, res);
});

module.exports = router;