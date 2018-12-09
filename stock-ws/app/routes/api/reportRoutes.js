/* Load Modules */
const express = require('express');
const router = express.Router();
const request = require("request");

/* Load controller */

/**
 * Report Entity routes
 */
router.get('/', function(req, res, next) {

    var data = {
        template: {
            'shortid': 'SkkNHKuCM'
        },
        options: {
            preview: true
        },
        data: {
            "ref": "12566",
            "creationDate": "12/25/2018",
            "society": {
                "name": "Societe techno nidhal",
                "address": "Rue Habib Bourguiba Tunis 55",
                "tel": "55584920",
                "fax": "55584920",
                "mail": "info.techni@com"
            },
            "client": {
                "name": "Societe techno informatique",
                "address": "Rue Habib Bourguiba Tunis 55",
                "tel": "55584920",
                "fax": "55584920",
                "mail": "info.techni@com"
            },
            "products": [{
                "product": "Produit 1",
                "qte": 2,
                "sellPriceHt": 20.2,
                "sellPriceTtc": 22,
                "tva": 2,
                "remise": 2
            }, {
                "product": "Produit 2",
                "qte": 21,
                "sellPriceHt": 110.2,
                "sellPriceTtc": 22,
                "tva": 2,
                "remise": 2
            }, {
                "product": "Produit 1",
                "qte": 2,
                "sellPriceHt": 20.2,
                "sellPriceTtc": 22,
                "tva": 2,
                "remise": 2
            }, {
                "product": "Produit 2",
                "qte": 21,
                "sellPriceHt": 110.2,
                "sellPriceTtc": 22,
                "tva": 2,
                "remise": 2
            }, {
                "product": "Produit 1",
                "qte": 2,
                "sellPriceHt": 20.2,
                "sellPriceTtc": 22,
                "tva": 2,
                "remise": 2
            }, {
                "product": "Produit 2",
                "qte": 21,
                "sellPriceHt": 110.2,
                "sellPriceTtc": 22,
                "tva": 2,
                "remise": 2
            }, {
                "product": "Produit 1",
                "qte": 2,
                "sellPriceHt": 20.2,
                "sellPriceTtc": 22,
                "tva": 2,
                "remise": 2
            }, {
                "product": "Produit 2",
                "qte": 21,
                "sellPriceHt": 110.2,
                "sellPriceTtc": 22,
                "tva": 2,
                "remise": 2
            }, {
                "product": "Produit 1",
                "qte": 2,
                "sellPriceHt": 20.2,
                "sellPriceTtc": 22,
                "tva": 2,
                "remise": 2
            }, {
                "product": "Produit 2",
                "qte": 21,
                "sellPriceHt": 110.2,
                "sellPriceTtc": 22,
                "tva": 2,
                "remise": 2
            }, {
                "product": "Produit 1",
                "qte": 2,
                "sellPriceHt": 20.2,
                "sellPriceTtc": 22,
                "tva": 2,
                "remise": 2
            }, {
                "product": "Produit 2",
                "qte": 21,
                "sellPriceHt": 110.2,
                "sellPriceTtc": 22,
                "tva": 2,
                "remise": 2
            }],

            "totalSellPriceHt": 200.2,
            "totalSellPriceTtc": 2222
        }
    }
    var options = {
        uri: 'http://localhost:5488/api/report',
        method: 'POST',
        json: data
    }
    request(options).pipe(res);

});


module.exports = router;