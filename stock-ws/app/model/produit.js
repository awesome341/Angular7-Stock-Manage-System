/**
 * Produit Entity (ES6 Class)
 */

class Produit {
    constructor(id, ref, description, tva, qte, unitSellPriceHt, categoryId) {
        this.id = id;
        this.ref = ref;
        this.description = description;
        this.tva = tva;
        this.qte = qte;
        this.unitSellPriceHt = unitSellPriceHt;
        this.categoryId = categoryId;
    }
}

module.exports = Produit;