/* Load Devis entity */
const Devis = require('../model/devis');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Devis Data Access Object
 */
class DevisDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {

        let sqlRequest = "SELECT id, totalPriceHt, totalPriceTtc, creationDate, clientId FROM devis WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Devis(row.id, row.totalPriceHt, row.totalPriceTtc, row.creationDate, row.clientId));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM devis";
        return this.common.findAll(sqlRequest).then(rows => {
            let deviss = [];
            for (const row of rows) {

                deviss.push(new Devis(row.id, row.totalPriceHt, row.totalPriceTtc, row.creationDate, row.clientId));
            }
            return deviss;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM devis";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Devis
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Devis) {
        let sqlRequest = "UPDATE devis SET " +
            "totalPriceHt=$totalPriceHt, " +
            "totalPriceTtc=$totalPriceTtc, " +
            "creationDate=$creationDate, " +
            "clientId=$clientId " +
            "WHERE id=$id";

        let sqlParams = {
            $totalPriceHt: Devis.totalPriceHt,
            $totalPriceTtc: Devis.totalPriceTtc,
            $creationDate: Devis.creationDate,
            $clientId: Devis.clientId,
            $id: Devis.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Devis
     * returns database insertion status
     */
    create(Devis) {

        let sqlRequest = "INSERT into devis ( totalPriceHt, totalPriceTtc, creationDate, clientId) " +
            "VALUES ($totalPriceHt, $totalPriceTtc, $creationDate, $clientId)";
        let sqlParams = {
            $totalPriceHt: Devis.totalPriceHt,
            $totalPriceTtc: Devis.totalPriceTtc,
            $creationDate: Devis.creationDate,
            $clientId: Devis.clientId
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Devis
     * returns database insertion status
     */
    createWithId(Devis) {
        let sqlRequest = "INSERT into devis (id,totalPriceHt, totalPriceTtc, creationDate, clientId) " +
            "VALUES ($id, $totalPriceHt, $totalPriceTtc, $creationDate, $clientId)";
        let sqlParams = {
            $id: Devis.id,
            $totalPriceHt: Devis.totalPriceHt,
            $totalPriceTtc: Devis.totalPriceTtc,
            $creationDate: Devis.creationDate,
            $clientId: Devis.clientId

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM devis WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM devis WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = DevisDao;