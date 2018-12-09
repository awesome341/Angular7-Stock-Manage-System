/**
 * Facture Entity (ES6 Class)
 */

class Facture {
    constructor(id, totalPriceHt, totalPriceTtc, creationDate, clientId) {

        this.id = id;
        this.totalPriceHt = totalPriceHt;
        this.totalPriceTtc = totalPriceTtc;
        this.creationDate = creationDate;
        this.clientId = clientId;
    }
}

module.exports = Facture;