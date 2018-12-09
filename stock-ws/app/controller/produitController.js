/* Load Produit Data Access Object */
const ProduitDao = require('../dao/produitDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Produit entity */
const Produit = require('../model/produit');

/**
 * Produit Controller
 */
class ProduitController {

    constructor() {
        this.produitDao = new ProduitDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.produitDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.produitDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.produitDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let produit = new Produit();
        produit.id = req.body.id;
        produit.ref = req.body.ref;
        produit.description = req.body.description;
        produit.tva = req.body.tva;
        produit.qte = req.body.qte;
        produit.unitSellPriceHt = req.body.unitSellPriceHt;
        produit.categoryId = req.body.categoryId;

        return this.produitDao.update(produit)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let produit = new Produit();
        if (req.body.id) {
            produit.id = req.body.id;
        }

        produit.ref = req.body.ref;
        produit.description = req.body.description;
        produit.tva = req.body.tva;
        produit.qte = req.body.qte;
        produit.unitSellPriceHt = req.body.unitSellPriceHt;
        produit.categoryId = req.body.categoryId;

        if (req.body.id) {
            return this.produitDao.createWithId(produit)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.produitDao.create(produit)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }

    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.id;

        this.produitDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        this.produitDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = ProduitController;