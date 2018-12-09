/* Load EntreeStock Data Access Object */
const EntreeStockDao = require('../dao/entreeStockDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load EntreeStock entity */
const EntreeStock = require('../model/entreeStock');

/**
 * EntreeStock Controller
 */
class EntreeStockController {

    constructor() {
        this.entreeStockDao = new EntreeStockDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.entreeStockDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.entreeStockDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.entreeStockDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {

        let entreeStock = new EntreeStock();
        entreeStock.id = req.body.id;
        entreeStock.qte = req.body.qte;
        entreeStock.unitFournisPrice = req.body.unitFournisPrice;
        entreeStock.gainMarge = req.body.gainMarge;
        entreeStock.entryDate = req.body.entryDate;
        entreeStock.productId = req.body.productId;
        entreeStock.fournisseurId = req.body.fournisseurId;

        return this.entreeStockDao.update(entreeStock)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let entreeStock = new EntreeStock();
        if (req.body.id) {
            entreeStock.id = req.body.id;
        }
        entreeStock.qte = req.body.qte;
        entreeStock.unitFournisPrice = req.body.unitFournisPrice;
        entreeStock.gainMarge = req.body.gainMarge;
        entreeStock.entryDate = req.body.entryDate;
        entreeStock.productId = req.body.productId;
        entreeStock.fournisseurId = req.body.fournisseurId;


        if (req.body.id) {
            return this.entreeStockDao.createWithId(entreeStock)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.entreeStockDao.create(entreeStock)
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

        this.entreeStockDao.deleteById(id)
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

        this.entreeStockDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = EntreeStockController;