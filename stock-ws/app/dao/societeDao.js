/* Load Societe entity */
const Societe = require('../model/societe');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Societe Data Access Object
 */
class SocieteDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, name, matriculeFiscale, rib, logoName, description FROM societe WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Societe(row.id, row.name, row.matriculeFiscale, row.rib, row.logoName, row.description));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM societe";
        return this.common.findAll(sqlRequest).then(rows => {
            let societes = [];
            for (const row of rows) {

                societes.push(new Societe(row.id, row.name, row.matriculeFiscale, row.logoName, row.description));
            }
            return societes;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM societe";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Societe
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Societe) {
        let sqlRequest = "UPDATE societe SET " +
            "name=$name, " +
            "matriculeFiscale=$matriculeFiscale, " +
            "rib=$rib, " +
            "logoName=$logoName, " +
            "description=$description " +
            "WHERE id=$id";

        let sqlParams = {
            $name: Societe.name,
            $matriculeFiscale: Societe.matriculeFiscale,
            $rib:societe.rib,
            $logoName: Societe.logoName,
            $description: Societe.description,
            $id: Societe.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Societe
     * returns database insertion status
     */
    create(societe) {

        let sqlRequest = "INSERT into societe ( name, matriculeFiscale, rib, logoName, description) " +
            "VALUES ($name, $matriculeFiscale, $rib, $logoName, $description)";
        let sqlParams = {
            $name: societe.name,
            $matriculeFiscale: societe.matriculeFiscale,
            $rib:societe.rib,
            $logoName: societe.logoName,
            $description: societe.description
        };
        return this.common.run(sqlRequest, sqlParams);
    };
 
    /**
     * Creates the given entity with a provided id in the database
     * @params Societe
     * returns database insertion status
     */
    createWithId(societe) {

        let sqlRequest = "INSERT into societe (id, name, matriculeFiscale, rib,  logoName, description) " +
            "VALUES ($id, $name, $matriculeFiscale, $rib, $logoName, $description)";
        let sqlParams = {
            $id: societe.id,
            $name: societe.name,
            $matriculeFiscale: societe.matriculeFiscale,
            $rib: societe.rib,
            $logoName: societe.logoName,
            $description: societe.description
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM societe WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM societe WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = SocieteDao;