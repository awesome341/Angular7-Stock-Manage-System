/* Load Fournisseur Data Access Object */
const FournisseurDao = require('../dao/fournisseurDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Fournisseur entity */
const Fournisseur = require('../model/fournisseur');

/**
 * Fournisseur Controller
 */
class FournisseurController {

    constructor() {
        this.fournisseurDao = new FournisseurDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.fournisseurDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.fournisseurDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.fournisseurDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let fournisseur = new Fournisseur();
        fournisseur.id = req.body.id;
        fournisseur.firstName = req.body.firstName;
        fournisseur.lastName = req.body.lastName;
        fournisseur.address = req.body.address;
        fournisseur.telephone = req.body.telephone;
        fournisseur.fax = req.body.fax;
        fournisseur.email = req.body.email;

        return this.fournisseurDao.update(fournisseur)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let fournisseur = new Fournisseur();
        if (req.body.id) {
            fournisseur.id = req.body.id;
        }

        fournisseur.firstName = req.body.firstName;
        fournisseur.lastName = req.body.lastName;
        fournisseur.address = req.body.address;
        fournisseur.telephone = req.body.telephone;
        fournisseur.fax = req.body.fax;
        fournisseur.email = req.body.email;

        if (req.body.id) {
            return this.fournisseurDao.createWithId(fournisseur)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.fournisseurDao.create(fournisseur)
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

        this.fournisseurDao.deleteById(id)
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

        this.fournisseurDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = FournisseurController;