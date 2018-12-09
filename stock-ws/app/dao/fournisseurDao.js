/* Load Fournisseur entity */
const Fournisseur = require('../model/fournisseur');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Fournisseur Data Access Object
 */
class FournisseurDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {

        let sqlRequest = "SELECT id, firstName, lastName, address, telephone, fax, email FROM fournisseur WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>

            new Fournisseur(row.id, row.firstName, row.lastName, row.address, row.telephone, row.fax, row.email));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM fournisseur";
        return this.common.findAll(sqlRequest).then(rows => {
            let fournisseurs = [];
            for (const row of rows) {
                fournisseurs.push(new Fournisseur(row.id, row.firstName, row.lastName, row.address, row.telephone, row.fax, row.email));
            }
            return fournisseurs;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM fournisseur";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Fournisseur
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Fournisseur) {
        let sqlRequest = "UPDATE fournisseur SET " +

           "firstName=$firstName, " +
            "lastName=$lastName, " +
            "address=$address, " +
            "telephone=$telephone, " +
            "fax=$fax, " +
            "email=$email " +

            "WHERE id=$id";

        let sqlParams = {
            $id: Fournisseur.id,
            $firstName: Fournisseur.firstName,
            $lastName: Fournisseur.lastName,
            $address: Fournisseur.address,
            $telephone: Fournisseur.telephone,
            $fax: Fournisseur.fax,
            $email: Fournisseur.email
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Fournisseur
     * returns database insertion status
     */
    create(Fournisseur) {

        let sqlRequest = "INSERT into fournisseur ( firstName, lastName, address, telephone, fax, email) " +
            "VALUES ($firstName, $lastName, $address, $telephone, $fax, $email)";
        let sqlParams = {
            $id: Fournisseur.id,
            $firstName: Fournisseur.firstName,
            $lastName: Fournisseur.lastName,
            $address: Fournisseur.address,
            $telephone: Fournisseur.telephone,
            $fax: Fournisseur.fax,
            $email: Fournisseur.email

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Fournisseur
     * returns database insertion status
     */
    createWithId(Fournisseur) {
        let sqlRequest = "INSERT into fournisseur (id, firstName, lastName, address, telephone, fax, email) " +
            "VALUES ($id, $firstName, $lastName, $address, $telephone, $fax, $email)";
        let sqlParams = {
            $id: Fournisseur.id,
            $firstName: Fournisseur.firstName,
            $lastName: Fournisseur.lastName,
            $address: Fournisseur.address,
            $telephone: Fournisseur.telephone,
            $fax: Fournisseur.fax,
            $email: Fournisseur.email

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM fournisseur WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM fournisseur WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = FournisseurDao;