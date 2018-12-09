/**
 * Client Entity (ES6 Class)
 */

class Client {
    constructor(id, firstName, lastName, paymentMode, address, telephone, fax, email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.paymentMode = paymentMode;
        this.address = address;
        this.telephone = telephone;
        this.fax = fax;
        this.email = email;
    }
}

module.exports = Client;