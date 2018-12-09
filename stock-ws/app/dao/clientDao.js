/* Load Client entity */
const Client = require('../model/client');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Client Data Access Object
 */
class ClientDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {

        let sqlRequest = "SELECT id, firstName, lastName, paymentMode, address, telephone, fax, email FROM client WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>

            new Client(row.id, row.firstName, row.lastName, row.paymentMode, row.address, row.telephone, row.fax, row.email));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM client";
        return this.common.findAll(sqlRequest).then(rows => {
            let clients = [];
            for (const row of rows) {
                clients.push(new Client(row.id, row.firstName, row.lastName, row.paymentMode, row.address, row.telephone, row.fax, row.email));
            }
            return clients;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM client";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Client
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Client) {
        let sqlRequest = "UPDATE client SET " +

            "firstName=$firstName, " +
            "lastName=$lastName, " +
            "paymentMode=$paymentMode, " +
            "address=$address, " +
            "telephone=$telephone, " +
            "fax=$fax, " +
            "email=$email " +

            "WHERE id=$id";

        let sqlParams = {
            $id: Client.id,
            $firstName: Client.firstName,
            $lastName: Client.lastName,
            $paymentMode: Client.paymentMode,
            $address: Client.address,
            $telephone: Client.telephone,
            $fax: Client.fax,
            $email: Client.email
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Client
     * returns database insertion status
     */
    create(Client) {

        let sqlRequest = "INSERT into client ( id, firstName, lastName, paymentMode, address, telephone, fax, email) " +
            "VALUES ($id, $firstName, $lastName, $paymentMode, $address, $telephone, $fax, $email)";
        let sqlParams = {
            $id: Client.id,
            $firstName: Client.firstName,
            $lastName: Client.lastName,
            $paymentMode: Client.paymentMode,
            $address: Client.address,
            $telephone: Client.telephone,
            $fax: Client.fax,
            $email: Client.email

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Client
     * returns database insertion status
     */
    createWithId(Client) {
        let sqlRequest = "INSERT into client (id, firstName, lastName, paymentMode, address, telephone, fax, email) " +
            "VALUES ($id, $firstName, $lastName, $paymentMode, $address, $telephone, $fax, $email)";
        let sqlParams = {
            $id: Client.id,
            $firstName: Client.firstName,
            $lastName: Client.lastName,
            $paymentMode: Client.paymentMode,
            $address: Client.address,
            $telephone: Client.telephone,
            $fax: Client.fax,
            $email: Client.email

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM client WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM client WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = ClientDao;