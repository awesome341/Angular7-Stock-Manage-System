import { Client } from "./client";
import { Produit } from "./produit";
import { Societe } from "./societe";

// "ref": "12566",
//     "creationDate": "12/25/2018",
//         "society": {
//     "name": "Societe techno nidhal",
//         "address": "Rue Habib Bourguiba Tunis 55",
//             "tel": "55584920",
//                 "fax": "55584920",
//                     "mail": "info.techni@com"
// },
// "client": {
//     "name": "Societe techno informatique",
//         "address": "Rue Habib Bourguiba Tunis 55",
//             "tel": "55584920",
//                 "fax": "55584920",
//                     "mail": "info.techni@com"
// },
// "products": [{
//     "product": "Produit 1",
//     "qte": 2,
//     "sellPriceHt": 20.2,
//     "sellPriceTtc": 22,
//     "tva": 2,
//     "remise": 2
// }],

//     "totalSellPriceHt": 200.2,
//         "totalSellPriceTtc": 2222
// }

export class Report {
    ref: number;
    creationDate: string;
    society: Societe;
    client: Client;
    products: Produit[];
    totalSellPriceHt: number;
    totalSellPriceTtc: number;
  }
  
  