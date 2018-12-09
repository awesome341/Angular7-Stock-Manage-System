/* Load EntreeStock entity */
const EntreeStock = require('../model/entreeStock');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * EntreeStock Data Access Object
 */
class EntreeStockDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {

        let sqlRequest = "SELECT id, qte, unitFournisPrice, gainMarge, entryDate, productId, fournisseurId FROM entreeStock WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new EntreeStock(row.id, row.qte, row.unitFournisPrice, row.gainMarge, row.entryDate, row.productId,row.fournisseurId));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM entreeStock";
        return this.common.findAll(sqlRequest).then(rows => {
            let entreeStocks = [];
            for (const row of rows) {

                entreeStocks.push(new EntreeStock(row.id, row.qte, row.unitFournisPrice, row.gainMarge, row.entryDate, row.productId, row.fournisseurId));
            }
            return entreeStocks;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM entreeStock";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params EntreeStock
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(EntreeStock) {
        let sqlRequest = "UPDATE entreeStock SET " +
            "qte=$qte, " +
            "unitFournisPrice=$unitFournisPrice, " +
            "gainMarge=$gainMarge, " +
            "entryDate=$entryDate " +
            "productId=$productId " +
            "fournisseurId=$fournisseurId " +
            
            "WHERE id=$id";

        let sqlParams = {
            $qte: EntreeStock.qte,
            $unitFournisPrice: EntreeStock.unitFournisPrice,
            $gainMarge: EntreeStock.gainMarge,
            $entryDate: EntreeStock.entryDate,
            $productId: EntreeStock.productId,
            $fournisseurId: EntreeStock.fournisseurId,

            $id: EntreeStock.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params EntreeStock
     * returns database insertion status
     */
    create(EntreeStock) {

        let sqlRequest = "INSERT into entreeStock (qte, unitFournisPrice, gainMarge, entryDate, productId, fournisseurId) " +
            "VALUES ($qte, $unitFournisPrice, $gainMarge, $entryDate, $productId, $fournisseurId)";
        let sqlParams = {
            $qte: EntreeStock.qte,
            $unitFournisPrice: EntreeStock.unitFournisPrice,
            $gainMarge: EntreeStock.gainMarge,
            $entryDate: EntreeStock.entryDate,
            $productId: EntreeStock.productId,
            $fournisseurId: EntreeStock.fournisseurId
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params EntreeStock
     * returns database insertion status
     */
    createWithId(EntreeStock) {
        let sqlRequest = "INSERT into entreeStock (id, qte, unitFournisPrice, gainMarge, entryDate, productId, fournisseurId) " +
            "VALUES ($id, $qte, $unitFournisPrice, $gainMarge, $entryDate, $productId, $fournisseurId)";
        let sqlParams = {
            $id: EntreeStock.id,
            $qte: EntreeStock.qte,
            $unitFournisPrice: EntreeStock.unitFournisPrice,
            $gainMarge: EntreeStock.gainMarge,
            $entryDate: EntreeStock.entryDate,
            $productId: EntreeStock.productId,
            $fournisseurId: EntreeStock.fournisseurId
            

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM entreeStock WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM entreeStock WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = EntreeStockDao;