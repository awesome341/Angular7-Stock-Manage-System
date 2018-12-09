import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { FactureService } from './../services/facture.service';
import { Facture } from './../model/facture';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { ClientService } from '../services/client.service';
import { Client } from '../model/client';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../model/produit';
import { Achat } from '../model/achat';
import { AchatService } from '../services/achat.service';

@Component({
  selector: 'facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  newFactureForm: FormGroup;

  factures: Facture[] = [];
  clients: Client[] = [];
  products: Produit[] = [];
  purchases: Achat[] = [];


  searchText = '';
  newFacture = new Facture;
  newPurchase = new Achat;
  newPurchases: Achat[] = [];


  constructor(private factureService: FactureService,
    private clientService: ClientService,
    private produitService: ProduitService,
    private achatService: AchatService,

    private fb: FormBuilder) {
    this.newFactureForm = this.createFormGroup(fb);
  }

  createFormGroup(formBuilder: FormBuilder) {
    return this.fb.group({
      productId_new_purchase: [null, [Validators.required]],
      qte_new_purchase: [0, [Validators.required]],
      tva_new_purchase: [0, [Validators.required]],
      remise_new_purchase: [0, [Validators.required]],
      totalPriceHt_new_facture: [0, [Validators.required]],
      totalPriceTtc_new_facture: [0, [Validators.required]],
      clientId_new_facture: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.getClients();
    this.getProduitsStocks();
    this.getPurchases();

    this.initFacture();
    this.initPurchase();
    this.newPurchases = [];
  }

  getProduitsStocks(): void {
    this.produitService.getProducts()
      .subscribe(products => this.products = products);
  }

  getFactures(): void {
    this.factureService.getFactures()
      .subscribe(factures => {
        factures = this.getFacturesClientName(factures);
        this.factures = factures
      });
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(clients => {
        this.clients = clients;
        this.getFactures();
      });
  }

  getPurchases(): void {
    this.achatService.getAchats()
      .subscribe(achats => this.purchases = achats);
  }


  initFacture() {
    this.newFacture = new Facture;
    this.newFacture.totalPriceHt = 0;
    this.newFacture.totalPriceTtc = 0;
    this.newFacture.finalTotalPriceAvecRemise = 0;
  }


  initPurchase() {
    this.newPurchase = new Achat;
    this.newPurchase.qte = 1;
    this.newPurchase.remise = 0;
    this.newPurchase.tva = 0;
    this.newPurchase.sellPriceHt = 0;
    this.newPurchase.sellPriceTtc = 0;
  }

  getProductPriceHt(productId) {
    if (productId) {
      const pr = this.products.find(p => p.id.toString() === productId);
      if (pr) {
        this.newPurchase.sellPriceHt = pr.unitSellPriceHt;
      }
      return pr ? pr.unitSellPriceHt : null;
    }
  }

  addPurchase() {

    const purchasePriceHt = Number.parseFloat(this.newPurchase.sellPriceHt.toString())
      * Number.parseInt(this.newPurchase.qte.toString());
    const purchaseTva = (Number.parseFloat(this.newPurchase.sellPriceHt.toString()) / 100)
      * Number.parseFloat(this.newPurchase.tva.toString());
    this.newPurchase.sellPriceTtc = Number.parseFloat(this.newPurchase.sellPriceHt.toString()) + purchaseTva;
    const remiseTotale = Number.parseFloat(this.newPurchase.remise.toString()) * Number.parseInt(this.newPurchase.qte.toString());
    const purchaseTotalPriceTtc = this.newPurchase.sellPriceTtc * Number.parseInt(this.newPurchase.qte.toString());

    this.newFacture.totalPriceHt = Number.parseFloat(this.newFacture.totalPriceHt.toString()) + purchasePriceHt;
    this.newFacture.totalPriceTtc = Number.parseFloat(this.newFacture.totalPriceTtc.toString()) + purchaseTotalPriceTtc;
    this.newFacture.finalTotalPriceAvecRemise = Number.parseFloat(this.newFacture.finalTotalPriceAvecRemise.toString())
      + purchaseTotalPriceTtc - remiseTotale;

    this.newPurchases.push(this.newPurchase);
    this.cleanForm();
    this.initPurchase();
  }

  deletePurchase(purchase) {

    this.newPurchases = this.newPurchases.filter(p => p !== purchase);
    this.newPurchases = [...this.newPurchases];

    let totalPriceHt = 0;
    let totalPriceTtc = 0;
    let finalTotalPriceAvecRemise = 0;

    const deletedPurchaseTva = (Number.parseFloat(purchase.sellPriceHt.toString()) / 100) * Number.parseFloat(purchase.tva.toString());
    this.newPurchase.sellPriceTtc = Number.parseFloat(purchase.sellPriceHt.toString()) + deletedPurchaseTva;

    this.newPurchases.forEach(purchaseItem => {
      const purchaseTotalePriceHt = Number.parseFloat(purchaseItem.sellPriceHt.toString())
        * Number.parseInt(purchaseItem.qte.toString());
      const remiseTotale = Number.parseFloat(purchaseItem.remise.toString()) * Number.parseInt(purchaseItem.qte.toString());
      const purchaseTotalPriceTtc = purchaseItem.sellPriceTtc * Number.parseInt(purchaseItem.qte.toString());

      totalPriceHt = Number.parseFloat(totalPriceHt.toString()) + purchaseTotalePriceHt;
      totalPriceTtc = Number.parseFloat(totalPriceTtc.toString()) + purchaseTotalPriceTtc;
      finalTotalPriceAvecRemise = Number.parseFloat(finalTotalPriceAvecRemise.toString())
        + purchaseTotalPriceTtc - remiseTotale;
    });

    this.newFacture.totalPriceHt = totalPriceHt;
    this.newFacture.totalPriceTtc = totalPriceTtc;
    this.newFacture.finalTotalPriceAvecRemise = finalTotalPriceAvecRemise;

    this.initPurchase();
    this.cleanForm();
  }


  deleteFacture(id): void {
    this.factureService.deleteFacture(id)
      .subscribe(factures => this.factures = this.factures.filter(p => p.id !== id));
  }

  cleanForm() {
    this.newFactureForm.markAsPristine();
    this.newFactureForm.markAsUntouched();
    this.newFactureForm.updateValueAndValidity();
  }

  updateFacture(facture): void {
    this.factureService.updateFacture(facture)
      .subscribe(p => {
        let prod = this.factures.find(p => p.id === facture.id);
        prod = facture;
        $('#close_btn_modalFacture').click()
      });
  }

  beforeUpdateFacture(facture): void {
    this.newFacture = facture;
  }

  beforeAddFacture(): void {
    this.initFacture();
  }

  getFacturesClientName(factures: Facture[]) {
    factures.forEach(f => {
      if(f.clientId !== undefined || f.clientId !== null){
        f.clientName = 'Passager';
      }
      const client = this.clients.find(c => c.id === f.clientId);
      if (client) {
        f.clientName = client.firstName + ' ' + client.lastName;
      }
    });
    return factures;
  }

  saveFacture() {
    this.factureService.addFacture(this.newFacture)
      .subscribe(f => {
        this.factureService.getFactures()
          .subscribe(_factures => {
            _factures=this.getFacturesClientName(_factures);
            this.factures = _factures;
            const factureId = this.factures[this.factures.length - 1].id;
            let persistedPurchases = 0;
            this.newPurchases.forEach(p => {
              p.factureId = factureId;
              this.achatService.addAchat(p)
                .subscribe(a => {
                  persistedPurchases++;
                  if (persistedPurchases === this.newPurchases.length) {
                    $('#close_btn_modalFacture').click()
                  }
                });
            });
          });
      });
  }
  onProductChange(productId) {
    this.newPurchase.productName = this.products.find(p => p.id = productId).ref;
  }

  generateFacture(facture) {
    const facturePurchases = this.purchases.filter(p => p.factureId === facture.id);
    console.log(facturePurchases);
  }
  onSubmit() {
    if (this.newFacture.id) {
      this.updateFacture(this.newFacture);
    }
  }
}