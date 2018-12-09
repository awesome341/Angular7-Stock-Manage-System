/* Load Client Data Access Object */
const ClientDao = require('../dao/clientDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Client entity */
const Client = require('../model/client');

/**
 * Client Controller
 */
class ClientController {

    constructor() {
        this.clientDao = new ClientDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.clientDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.clientDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.clientDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let client = new Client();
        client.id = req.body.id;
        client.firstName = req.body.firstName;
        client.lastName = req.body.lastName;
        client.paymentMode = req.body.paymentMode;
        client.address = req.body.address;
        client.telephone = req.body.telephone;
        client.fax = req.body.fax;
        client.email = req.body.email;

        return this.clientDao.update(client)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let client = new Client();
        if (req.body.id) {
            client.id = req.body.id;
        }

        client.firstName = req.body.firstName;
        client.lastName = req.body.lastName;
        client.paymentMode = req.body.paymentMode;
        client.address = req.body.address;
        client.telephone = req.body.telephone;
        client.fax = req.body.fax;
        client.email = req.body.email;

        if (req.body.id) {
            return this.clientDao.createWithId(client)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.clientDao.create(client)
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

        this.clientDao.deleteById(id)
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

        this.clientDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = ClientController;