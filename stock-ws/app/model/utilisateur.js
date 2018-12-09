/**
 * Societe Entity (ES6 Class)
 */

class Utilisateur {
    constructor(id, firstName, lastName, password, role, telephone, email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
        this.telephone = telephone;
        this.email = email;
    }

}

module.exports = Utilisateur;