/* Load Achat entity */
const Achat = require('../model/achat');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Achat Data Access Object
 */
class AchatDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId,produitId FROM achat WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Achat(row.id, row.productName, row.qte, row.sellPriceHt, row.sellPriceTtc, row.tva, row.remise, row.disabled, row.suppressionDate, row.modificationDate, row.factureId, row.produitId));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM achat";
        return this.common.findAll(sqlRequest).then(rows => {
            let achats = [];
            for (const row of rows) {

                achats.push(new Achat(row.id, row.productName, row.qte, row.sellPriceHt, row.sellPriceTtc, row.tva, row.remise, row.disabled, row.suppressionDate, row.modificationDate, row.factureId, row.produitId));
            }
            return achats;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM achat";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Achat
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Achat) {
        let sqlRequest = "UPDATE achat SET " +
            "productName=$productName, " +
            "qte=$qte, " +
            "sellPriceHt=$sellPriceHt, " +
            "sellPriceTtc=$sellPriceTtc, " +
            "remise=$remise, " +
            "disabled=$disabled, " +
            "suppressionDate=$suppressionDate, " +
            "modificationDate=$modificationDate, " +
            "factureId=$factureId, " +
            "produitId=$produitId " +

            "WHERE id=$id";

        let sqlParams = {
            $productName: Achat.productName,
            $qte: Achat.qte,
            $sellPriceHt: Achat.sellPriceHt,
            $sellPriceTtc: Achat.sellPriceTtc,
            $remise: Achat.remise,
            $disabled: Achat.disabled,
            $suppressionDate: Achat.suppressionDate,
            $modificationDate: Achat.modificationDate,
            $factureId: Achat.factureId,
            $produitId: Achat.produitId
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Achat
     * returns database insertion status
     */
    create(Achat) {

        let sqlRequest = "INSERT into achat ( productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId, produitId ) " +
            "VALUES ($productName, $qte, $sellPriceHt, $sellPriceTtc, $tva, $remise, $disabled, $suppressionDate, $modificationDate, $factureId, $produitId )";
        let sqlParams = {
            $productName: Achat.productName,
            $qte: Achat.qte,
            $sellPriceHt: Achat.sellPriceHt,
            $sellPriceTtc: Achat.sellPriceTtc,
            $tva: Achat.tva,
            $remise: Achat.remise,
            $disabled: Achat.disabled,
            $suppressionDate: Achat.suppressionDate,
            $modificationDate: Achat.modificationDate,
            $factureId: Achat.factureId,
            $produitId: Achat.produitId
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Achat
     * returns database insertion status
     */
    createWithId(Achat) {
        let sqlRequest = "INSERT into achat (id, productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId, produitId ) " +
            "VALUES ($id, $productName, $qte, $sellPriceHt, $sellPriceTtc, $tva, $remise, $disabled, $suppressionDate, $modificationDate, $factureId, $produitId )";
        let sqlParams = {
            $id: Achat.id,
            $productName: Achat.productName,
            $qte: Achat.qte,
            $sellPriceHt: Achat.sellPriceHt,
            $sellPriceTtc: Achat.sellPriceTtc,
            $tva: Achat.tva,
            $remise: Achat.remise,
            $disabled: Achat.disabled,
            $suppressionDate: Achat.suppressionDate,
            $modificationDate: Achat.modificationDate,
            $factureId: Achat.factureId,
            $produitId: Achat.produitId

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM achat WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM achat WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = AchatDao;