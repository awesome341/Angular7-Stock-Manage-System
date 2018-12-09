/* Load Marque Data Access Object */
const MarqueDao = require('../dao/marqueDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Marque entity */
const Marque = require('../model/marque');

/**
 * Marque Controller
 */
class MarqueController {

    constructor() {
        this.marqueDao = new MarqueDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.marqueDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.marqueDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.marqueDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let marque = new Marque();

        marque.id = req.body.id;
        marque.label = req.body.label;

        return this.marqueDao.update(marque)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let marque = new Marque();
        if (req.body.id) {
            marque.id = req.body.id;
        }

        marque.label = req.body.label;

        if (req.body.id) {
            return this.marqueDao.createWithId(marque)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.marqueDao.create(marque)
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

        this.marqueDao.deleteById(id)
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

        this.marqueDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = MarqueController;