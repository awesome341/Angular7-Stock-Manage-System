/* Load Categorie entity */
const Categorie = require('../model/categorie');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Categorie Data Access Object
 */
class CategorieDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {

        let sqlRequest = "SELECT id, name, subCategoryId FROM categorie WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Categorie(row.id, row.name, row.subCategoryId));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {

        let sqlRequest = "SELECT * FROM categorie";
        return this.common.findAll(sqlRequest).then(rows => {
            let categories = [];
            for (const row of rows) {

                categories.push(new Categorie(row.id, row.name, row.subCategoryId));
            }
            return categories;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM categorie";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Categorie
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Categorie) {
        let sqlRequest = "UPDATE categorie SET " +

            "name=$name, " +
            "subCategoryId=$subCategoryId, " +
            "WHERE id=$id";

        let sqlParams = {
            $name: Categorie.name,
            $subCategoryId: Categorie.subCategoryId,
            $id: Categorie.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Categorie
     * returns database insertion status
     */
    create(Categorie) {
        let sqlRequest = "INSERT into categorie ( name, subCategoryId) " +
            "VALUES ($name, $subCategoryId)";
        let sqlParams = {
            $name: Categorie.name,
            $subCategoryId: Categorie.subCategoryId
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Categorie
     * returns database insertion status
     */
    createWithId(Categorie) {

        let sqlRequest = "INSERT into categorie (id, name, subCategoryId) " +
            "VALUES ($id, $name, $subCategoryId)";
        let sqlParams = {
            $id: Categorie.id,
            $name: Categorie.name,
            $subCategoryId: Categorie.subCategoryId

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM categorie WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM categorie WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = CategorieDao;