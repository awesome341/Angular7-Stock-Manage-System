/* Load Categorie Data Access Object */
const CategorieDao = require('../dao/categorieDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Categorie entity */
const Categorie = require('../model/categorie');

/**
 * Categorie Controller
 */
class CategorieController {

    constructor() {
        this.categorieDao = new CategorieDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.categorieDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.categorieDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.categorieDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {

        let categorie = new Categorie();
        categorie.id = req.body.id;
        categorie.name = req.body.name;
        categorie.subCategoryId = req.body.subCategoryId;


        return this.categorieDao.update(categorie)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let categorie = new Categorie();
        if (req.body.id) {
            categorie.id = req.body.id;
        }

        categorie.name = req.body.name;
        categorie.subCategoryId = req.body.subCategoryId;

        if (req.body.id) {
            return this.categorieDao.createWithId(categorie)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.categorieDao.create(categorie)
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

        this.categorieDao.deleteById(id)
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

        this.categorieDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = CategorieController;