/**
 * Achat Entity (ES6 Class)
 */

class Achat {

    constructor(id, productName, qte, sellPriceHt, sellPriceTtc, tva, remise, disabled, suppressionDate, modificationDate, factureId, produitId) {
        this.id = id;
        this.productName = productName;
        this.qte = qte;
        this.sellPriceHt = sellPriceHt;
        this.sellPriceTtc = sellPriceTtc;
        this.tva = tva;
        this.remise = remise;
        this.suppressionDate = suppressionDate;
        this.modificationDate = modificationDate;
        this.factureId = factureId;
        this.produitId = produitId;
    }
}

module.exports = Achat;