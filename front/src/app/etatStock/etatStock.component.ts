import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { EntreeStockService } from './../services/entreeStock.service';
import { EntreeStock } from './../model/entreeStock';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { Produit } from '../model/produit';
import { ProduitService } from '../services/produit.service';
import { Fournisseur } from '../model/fournisseur';
import { FournisseurService } from '../services/fournisseur.service';

@Component({
  selector: 'etatStockue',
  templateUrl: './etatStock.component.html',
  styleUrls: ['./etatStock.component.css']
})
export class EtatStockComponent implements OnInit {
  newEntreeStockForm: FormGroup;

  products: Produit[] = [];
  entreesStock: EntreeStock[] = [];
  fournisseurs: Fournisseur[] = [];

  searchText = '';
  newEntreeStock = new EntreeStock;

  constructor(private entreeStockService: EntreeStockService,
    private produitService: ProduitService,
    private fournisseurService: FournisseurService,
    private fb: FormBuilder) {
    this.newEntreeStockForm = this.createFormGroup(fb);
  }

  createFormGroup(formBuilder: FormBuilder) {
    return this.fb.group({
      unitFournisPrice_new_entreeStock: ['', [Validators.required]],
      gainMarge_new_entreeStock: ['', [Validators.required]],
      fournisseurId_new_entreeStock: ['', [Validators.required]],
      qte_new_entreeStock: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getEntreesStocks();
    this.getProduitsStocks();
    this.getFournisseurs();

    this.newEntreeStock = new EntreeStock;
  }

  getEntreesStocks(): void {
    this.entreeStockService.getEntreesStock()
      .subscribe(entreesStock => this.entreesStock = entreesStock);
  }

  getProduitsStocks(): void {
    this.produitService.getProducts()
      .subscribe(products => this.products = products);
  }

  getFournisseurs(): void {
    this.fournisseurService.getFournisseurs()
      .subscribe(fournisseurs => this.fournisseurs = fournisseurs);
  }

  updateEntreeStock(etatStock): void {
    this.entreeStockService.updateEntreeStock(etatStock)
      .subscribe(p => {
        let prod = this.entreesStock.find(p => p.id === etatStock.id);
        prod = etatStock;
        $('#close_btn_modalEntreeStock').click()
      });
  }

  addEntreeStock(etatStock): void {
    this.entreeStockService.addEntreeStock(etatStock)
      .subscribe(p => {
        this.entreeStockService.getEntreesStock()
          .subscribe(etatStocks => this.entreesStock = etatStocks);
        $('#close_btn_modalEntreeStock').click()
      });
  }

  beforeAddProductStock(product) {
    this.newEntreeStock.productId=product.id;
  }

  updateProduct(product): void {
    this.produitService.updateProduit(product)
      .subscribe(p =>  {
        this.products.find(p => p.id === product.id).qte=product.qte;
      });
  }
  
  onSubmit() {
      const product= this.products.find(p => p.id===this.newEntreeStock.productId);
      product.qte=Number.parseInt(product.qte+'') + Number.parseInt(this.newEntreeStock.qte+'');
      this.products.find(p => p.id===this.newEntreeStock.productId).qte=product.qte;
      this.updateProduct(product);
      this.addEntreeStock(this.newEntreeStock);
  }
}