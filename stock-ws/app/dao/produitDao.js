/* Load Produit entity */
const Produit = require('../model/produit');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Produit Data Access Object
 */
class ProduitDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {

        let sqlRequest = "SELECT id, ref, description, tva, qte, unitSellPriceHt, categoryId FROM produit WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Produit(row.id, row.ref, row.description, row.tva, row.qte, row.unitSellPriceHt, row.categoryId));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM produit";
        return this.common.findAll(sqlRequest).then(rows => {
            let produits = [];
            for (const row of rows) {

                produits.push(new Produit(row.id, row.ref, row.description, row.tva, row.qte, row.unitSellPriceHt, row.categoryId));
            }
            return produits;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM produit";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Produit
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(produit) {
        let sqlRequest = "UPDATE produit SET " +

            "ref=$ref, " +
            "description=$description, " +
            "tva=$tva, " +
            "qte=$qte, " +
            "unitSellPriceHt=$unitSellPriceHt, " +
            "categoryId=$categoryId " +
            "WHERE id=$id";

        let sqlParams = {
            $ref: produit.ref,
            $description: produit.description,
            $tva: produit.tva,
            $qte: produit.qte,
            $unitSellPriceHt: produit.unitSellPriceHt,
            $categoryId: produit.categoryId,
            $id: produit.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Produit
     * returns database insertion status
     */
    create(Produit) {

        let sqlRequest = "INSERT into produit ( ref, description, tva, qte, unitSellPriceHt, categoryId) " +
            "VALUES ($ref, $description, $tva, $qte, $unitSellPriceHt, $categoryId)";
        let sqlParams = {
            $ref: Produit.ref,
            $description: Produit.description,
            $tva: Produit.tva,
            $qte: Produit.qte,
            $unitSellPriceHt: Produit.unitSellPriceHt,
            $categoryId: Produit.categoryId

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Produit
     * returns database insertion status
     */
    createWithId(Produit) {
        let sqlRequest = "INSERT into produit (id, ref, description, tva, qte, unitSellPriceHt, categoryId) " +
            "VALUES ($id, $ref, $description, $tva, $qte, $unitSellPriceHt, $categoryId)";
        let sqlParams = {
            $id: Produit.id,
            $ref: Produit.ref,
            $description: Produit.description,
            $tva: Produit.tva,
            $qte: Produit.qte,
            $unitSellPriceHt: Produit.unitSellPriceHt,
            $categoryId: Produit.categoryId

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM produit WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM produit WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = ProduitDao;