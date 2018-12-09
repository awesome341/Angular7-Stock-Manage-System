/* Load Utilisateur entity */
const Utilisateur = require('../model/utilisateur');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Utilisateur Data Access Object
 */
class UtilisateurDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {

        let sqlRequest = "SELECT id, firstName, lastName, password, role, telephone, email FROM utilisateur WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>

            new Utilisateur(row.id, row.firstName, row.lastName, row.password, row.role, row.telephone, row.email));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM utilisateur";
        return this.common.findAll(sqlRequest).then(rows => {
            let utilisateurs = [];
            for (const row of rows) {
                utilisateurs.push(new Utilisateur(row.id, row.firstName, row.lastName, row.password, row.role, row.telephone, row.email));
            }
            return utilisateurs;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM utilisateur";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Utilisateur
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Utilisateur) {
        let sqlRequest = "UPDATE utilisateur SET " +
            "id=$id, " +
            "firstName=$firstName, " +
            "lastName=$lastName, " +
            "password=$password " +
            "role=$role " +
            "telephone=$telephone " +
            "email=$email " +

            "WHERE id=$id";

        let sqlParams = {
            $id: Utilisateur.id,
            $firstName: Utilisateur.firstName,
            $lastName: Utilisateur.lastName,
            $password: Utilisateur.password,
            $role: Utilisateur.role,
            $telephone: Utilisateur.telephone,
            $email: Utilisateur.email
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Utilisateur
     * returns database insertion status
     */
    create(Utilisateur) {

        let sqlRequest = "INSERT into utilisateur ( firstName, lastName, password, role, telephone, email ) " +
            "VALUES ($firstName, $lastName, $password, $role, $telephone, $email)";
        let sqlParams = {
            $id: Utilisateur.id,
            $firstName: Utilisateur.firstName,
            $lastName: Utilisateur.lastName,
            $password: Utilisateur.password,
            $role: Utilisateur.role,
            $telephone: Utilisateur.telephone,
            $email: Utilisateur.email

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Utilisateur
     * returns database insertion status
     */
    createWithId(Utilisateur) {
        let sqlRequest = "INSERT into utilisateur ( id, firstName, lastName, password, role, telephone, email ) " +
            "VALUES ($id, $firstName, $lastName, $password, $role, $telephone, $email)";
        let sqlParams = {
            $id: Utilisateur.id,
            $firstName: Utilisateur.firstName,
            $lastName: Utilisateur.lastName,
            $password: Utilisateur.password,
            $role: Utilisateur.role,
            $telephone: Utilisateur.telephone,
            $email: Utilisateur.email

        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM utilisateur WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM utilisateur WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = UtilisateurDao;