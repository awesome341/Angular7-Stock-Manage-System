/**
 * Devis Entity (ES6 Class)
 */

class Devis {
    constructor(id, totalPriceHt, totalPriceTtc, creationDate, clientId) {

        this.id = id;
        this.totalPriceHt = totalPriceHt;
        this.totalPriceTtc = totalPriceTtc;
        this.creationDate = creationDate;
        this.clientId = clientId;
    }
}

module.exports = Devis;