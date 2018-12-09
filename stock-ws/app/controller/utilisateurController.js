/* Load Utilisateur Data Access Object */
const UtilisateurDao = require('../dao/utilisateurDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Utilisateur entity */
const Utilisateur = require('../model/utilisateur');

/**
 * Utilisateur Controller
 */
class UtilisateurController {

    constructor() {
        this.utilisateurDao = new UtilisateurDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.utilisateurDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.utilisateurDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.utilisateurDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let utilisateur = new Utilisateur();
        utilisateur.id = req.body.id;
        utilisateur.firstName = req.body.firstName;
        utilisateur.lastName = req.body.lastName;
        utilisateur.password = req.body.password;
        utilisateur.role = req.body.role;
        utilisateur.telephone = req.body.telephone;
        utilisateur.email = req.body.email;

        return this.utilisateurDao.update(utilisateur)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let utilisateur = new Utilisateur();
        if (req.body.id) {
            utilisateur.id = req.body.id;
        }

        utilisateur.firstName = req.body.firstName;
        utilisateur.lastName = req.body.lastName;
        utilisateur.password = req.body.password;
        utilisateur.role = req.body.role;
        utilisateur.telephone = req.body.telephone;
        utilisateur.email = req.body.email;

        if (req.body.id) {
            return this.utilisateurDao.createWithId(utilisateur)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.utilisateurDao.create(utilisateur)
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

        this.utilisateurDao.deleteById(id)
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

        this.utilisateurDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = UtilisateurController;