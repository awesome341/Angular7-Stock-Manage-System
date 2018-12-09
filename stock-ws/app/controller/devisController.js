/* Load Devis Data Access Object */
const DevisDao = require('../dao/devisDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Devis entity */
const Devis = require('../model/devis');

/**
 * Devis Controller
 */
class DevisController {

    constructor() {
        this.devisDao = new DevisDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.devisDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.devisDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.devisDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {

        let devis = new Devis();
        devis.id = req.body.id;
        devis.totalPriceHt = req.body.totalPriceHt;
        devis.totalPriceTtc = req.body.totalPriceTtc;
        devis.creationDate = req.body.creationDate;
        devis.clientId = req.body.clientId;

        return this.devisDao.update(devis)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let devis = new Devis();
        if (req.body.id) {
            devis.id = req.body.id;
        }

        devis.totalPriceHt = req.body.totalPriceHt;
        devis.totalPriceTtc = req.body.totalPriceTtc;
        devis.creationDate = req.body.creationDate;
        devis.clientId = req.body.clientId;

        if (req.body.id) {
            return this.devisDao.createWithId(devis)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.devisDao.create(devis)
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

        this.devisDao.deleteById(id)
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

        this.devisDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = DevisController;