/**
 * Fournisseur Entity (ES6 Class)
 */

class Fournisseur {
    constructor(id, firstName, lastName, address, telephone, fax, email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.telephone = telephone;
        this.fax = fax;
        this.email = email;
    }
}

module.exports = Fournisseur;