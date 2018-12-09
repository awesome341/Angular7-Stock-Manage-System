/* Load Facture entity */
const Facture = require('../model/facture');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Facture Data Access Object
 */
class FactureDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {

        let sqlRequest = "SELECT id, totalPriceHt, totalPriceTtc, creationDate, clientId FROM facture WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Facture(row.id, row.totalPriceHt, row.totalPriceTtc, row.creationDate, row.clientId));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM facture";
        return this.common.findAll(sqlRequest).then(rows => {
            let factures = [];
            for (const row of rows) {

                factures.push(new Facture(row.id, row.totalPriceHt, row.totalPriceTtc, row.creationDate, row.clientId));
            }
            return factures;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM facture";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Facture
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Facture) {
        let sqlRequest = "UPDATE facture SET " +
            "totalPriceHt=$totalPriceHt, " +
            "totalPriceTtc=$totalPriceTtc, " +
            "creationDate=$creationDate, " +
            "clientId=$clientId " +
            "WHERE id=$id";

        let sqlParams = {
            $totalPriceHt: Facture.totalPriceHt,
            $totalPriceTtc: Facture.totalPriceTtc,
            $creationDate: Facture.creationDate,
            $clientId: Facture.clientId,
            $id: Facture.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Facture
     * returns database insertion status
     */
    create(Facture) {

        let sqlRequest = "INSERT into facture ( totalPriceHt, totalPriceTtc, creationDate, clientId) " +
            "VALUES ($totalPriceHt, $totalPriceTtc, $creationDate, $clientId)";
        let sqlParams = {
            $totalPriceHt: Facture.totalPriceHt,
            $totalPriceTtc: Facture.totalPriceTtc,
            $creationDate: Facture.creationDate,
            $clientId: Facture.clientId
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Facture
     * returns database insertion status
     */
    createWithId(Facture) {
        let sqlRequest = "INSERT into facture (id,totalPriceHt, totalPriceTtc, creationDate, clientId) " +
            "VALUES ($id, $totalPriceHt, $totalPriceTtc, $creationDate, $clientId)";
        let sqlParams = {
            $id: Facture.id,
            $totalPriceHt: Facture.totalPriceHt,
            $totalPriceTtc: Facture.totalPriceTtc,
            $creationDate: Facture.creationDate,
            $clientId: Facture.clientId

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM facture WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM facture WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = FactureDao;