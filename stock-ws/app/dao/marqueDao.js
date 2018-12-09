/* Load Marque entity */
const Marque = require('../model/marque');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Marque Data Access Object
 */
class MarqueDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, label FROM marque WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Marque(row.id, row.label));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM marque";
        return this.common.findAll(sqlRequest).then(rows => {
            let marques = [];
            for (const row of rows) {

                marques.push(new Marque(row.id, row.label));
            }
            return marques;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM marque";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Marque
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(marque) {
        let sqlRequest = "UPDATE marque SET " +
            "label=$label " +
            "WHERE id=$id";

        let sqlParams = {
            $label: marque.label,
            $id: marque.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Marque
     * returns database insertion status
     */
    create(Marque) {

        let sqlRequest = "INSERT into marque ( label ) " +
            "VALUES ($label )";
        let sqlParams = {
            $label: Marque.label
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Marque
     * returns database insertion status
     */
    createWithId(Marque) {
        let sqlRequest = "INSERT into marque (id, label) " +
            "VALUES ($id, $label )";
        let sqlParams = {
            $id: Marque.id,
            $label: Marque.label

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM marque WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM marque WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = MarqueDao;