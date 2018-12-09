/* Load Facture Data Access Object */
const FactureDao = require('../dao/factureDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Facture entity */
const Facture = require('../model/facture');

/**
 * Facture Controller
 */
class FactureController {

    constructor() {
        this.factureDao = new FactureDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.factureDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.factureDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.factureDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {

        let facture = new Facture();
        facture.id = req.body.id;
        facture.totalPriceHt = req.body.totalPriceHt;
        facture.totalPriceTtc = req.body.totalPriceTtc;
        facture.creationDate = req.body.creationDate;
        facture.clientId = req.body.clientId;

        return this.factureDao.update(facture)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let facture = new Facture();
        if (req.body.id) {
            facture.id = req.body.id;
        }

        facture.totalPriceHt = req.body.totalPriceHt;
        facture.totalPriceTtc = req.body.totalPriceTtc;
        facture.creationDate = req.body.creationDate;
        facture.clientId = req.body.clientId;

        if (req.body.id) {
            return this.factureDao.createWithId(facture)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.factureDao.create(facture)
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

        this.factureDao.deleteById(id)
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

        this.factureDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = FactureController;