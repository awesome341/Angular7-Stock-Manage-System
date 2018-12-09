/* Load Societe Data Access Object */
const SocieteDao = require('../dao/societeDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Societe entity */
const Societe = require('../model/societe');

/**
 * Societe Controller
 */
class SocieteController {

    constructor() {
        this.societeDao = new SocieteDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.societeDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.societeDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.societeDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {

        let societe = new Societe();
        societe.id = req.body.id;
        societe.name = req.body.name;
        societe.matriculeFiscale = req.body.matriculeFiscale;
        societe.rib = req.body.rib;
        societe.description = req.body.description;

        return this.societeDao.update(societe)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let societe = new Societe();
        if (req.body.id) {
            societe.id = req.body.id;
        }

        societe.name = req.body.name;
        societe.matriculeFiscale = req.body.matriculeFiscale;
        societe.rib = req.body.rib;
        societe.logoName = req.body.logoName;
        societe.description = req.body.description;

        if (req.body.id) {
            return this.societeDao.createWithId(societe)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.societeDao.create(societe)
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

        this.societeDao.deleteById(id)
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

        this.societeDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = SocieteController;