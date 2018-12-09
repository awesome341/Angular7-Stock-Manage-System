/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const CategorieController = require('../../controller/categorieController');
const categorieController = new CategorieController();

/**
 * Categorie Entity routes
 */
router.get('/count', function(req, res) {
    categorieController.countAll(res);
});

router.get('/exists/:id', function(req, res) {
    categorieController.exists(req, res);
});

router.get('/:id', function(req, res) {
    categorieController.findById(req, res);
});

router.get('/', function(req, res) {
    categorieController.findAll(res);
});

router.put('/:id', function(req, res) {
    categorieController.update(req, res);
});

router.post('/', function(req, res) {
    categorieController.create(req, res);
});

router.delete('/:id', function(req, res) {
    categorieController.deleteById(req, res);
});

module.exports = router;