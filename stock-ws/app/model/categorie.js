/**
 * Produit Entity (ES6 Class)
 */

class Categorie {
    constructor(id, name, subCategoryId) {
        this.id = id;
        this.name = name;
        this.subCategoryId = subCategoryId;
    }
}

module.exports = Categorie;