import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { ProduitService } from './../services/produit.service';
import { Produit } from './../model/produit';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  newProductForm: FormGroup;

  products: Produit[] = [];
  searchText = '';
  newProduct = new Produit;


  constructor(private produitService: ProduitService, private fb: FormBuilder) {
    this.newProductForm = this.createFormGroup(fb);
  }

  createFormGroup(formBuilder: FormBuilder) {
    return this.fb.group({
      ref_new_product: ['', [Validators.required, Validators.maxLength(256)]],
      description_new_product: ['', [Validators.maxLength(1000)]],
      tva_new_product: ['', [Validators.required]],
      unitSellPriceHt_new_product: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getProducts();
    this.newProduct = new Produit;
  }

  getProducts(): void {
    this.produitService.getProducts()
      .subscribe(products => this.products = products);
  }

  deleteProduct(id): void {
    this.produitService.deleteProduit(id)
      .subscribe(products => this.products = this.products.filter(p => p.id !== id));
  }

  updateProduct(product): void {
    if (this.products.filter(m => m.id !== product.id && m.ref.trim().toUpperCase() === product.ref.trim().toUpperCase()).length > 0) {
      this.newProductForm.controls['ref_new_product'].setErrors({ 'uniq': true });
    } else {
    this.produitService.updateProduit(product)
      .subscribe(p => {
        let index = this.products.findIndex(p => p.id === product.id);
        this.products[index] = product;
        this.products = [...this.products];
        $('#close_btn_modalProduit').click()
      });
    }
  }

  cleanForm() {
    this.newProductForm.markAsPristine();
    this.newProductForm.markAsUntouched();
    this.newProductForm.updateValueAndValidity();
  }

  addProduct(product): void {
    if (this.products.filter(m => m.ref.trim().toUpperCase() === product.ref.trim().toUpperCase()).length > 0) {
      this.newProductForm.controls['ref_new_product'].setErrors({ 'uniq': true });
    } else {
    product.qte = 0;
    this.produitService.addProduit(product)
      .subscribe(p => {
        this.produitService.getProducts()
          .subscribe(products => this.products = products);
        $('#close_btn_modalProduit').click()
      });
    }
  }

  beforeUpdateProduct(product): void {
    this.cleanForm();
    this.newProduct = Object.assign({}, product);
  }

  beforeAddProduct(): void {
    this.cleanForm();
    this.newProduct = new Produit;
  }

  onSubmit() {
    if (this.newProduct.id) {
      this.updateProduct(this.newProduct);
    } else {
      this.addProduct(this.newProduct);
    }
  }
}