/**
 * Societe Entity (ES6 Class)
 */

class Societe {
    constructor(id, name, matriculeFiscale, rib, logoName, description) {
        this.id = id;
        this.name = name;
        this.matriculeFiscale = matriculeFiscale;
        this.rib = rib;
        this.logoName = logoName;
        this.description = description;
    }

}

module.exports = Societe;