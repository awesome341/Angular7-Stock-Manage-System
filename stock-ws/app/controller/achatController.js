/* Load Achat Data Access Object */
const AchatDao = require('../dao/achatDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Achat entity */
const Achat = require('../model/achat');

/**
 * Achat Controller
 */
class AchatController {

    constructor() {
        this.achatDao = new AchatDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.achatDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.achatDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.achatDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let achat = new Achat();

        achat.id = req.body.id;
        achat.productName = req.body.productName;
        achat.qte = req.body.qte;
        achat.sellPriceHt = req.body.sellPriceHt;
        achat.sellPriceTtc = req.body.sellPriceTtc;
        achat.tva = req.body.tva;
        achat.remise = req.body.remise;
        achat.disabled = req.body.disabled;
        achat.suppressionDate = req.body.suppressionDate;
        achat.modificationDate = req.body.modificationDate;
        achat.factureId = req.body.factureId;
        achat.produitId = req.body.produitId;

        return this.achatDao.update(achat)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let achat = new Achat();
        if (req.body.id) {
            achat.id = req.body.id;
        }

        achat.productName = req.body.productName;
        achat.qte = req.body.qte;
        achat.sellPriceHt = req.body.sellPriceHt;
        achat.sellPriceTtc = req.body.sellPriceTtc;
        achat.tva = req.body.tva;
        achat.remise = req.body.remise;
        achat.disabled = req.body.disabled;
        achat.suppressionDate = req.body.suppressionDate;
        achat.modificationDate = req.body.modificationDate;
        achat.factureId = req.body.factureId;
        achat.produitId = req.body.produitId;

        if (req.body.id) {
            return this.achatDao.createWithId(achat)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.achatDao.create(achat)
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

        this.achatDao.deleteById(id)
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

        this.achatDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = AchatController;