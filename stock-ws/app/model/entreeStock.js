/**
 * EntreeStock Entity (ES6 Class)
 */

class EntreeStock {
    constructor(id, qte, unitFournisPrice, gainMarge, entryDate, productId, fournisseurId) {
        this.id = id;
        this.qte = qte;
        this.unitFournisPrice = unitFournisPrice;
        this.gainMarge = gainMarge;
        this.entryDate = entryDate;
        this.productId = productId;
        this.fournisseurId= fournisseurId;

    }
}

module.exports = EntreeStock;