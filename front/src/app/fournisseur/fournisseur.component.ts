import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { FournisseurService } from './../services/fournisseur.service';
import { Fournisseur } from './../model/fournisseur';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { ProduitService } from '../services/produit.service';
import { EntreeStock } from '../model/entreeStock';
import { EntreeStockService } from '../services/entreeStock.service';
import { Produit } from '../model/produit';

@Component({
  selector: 'fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
  newFournisseurForm: FormGroup;

  fournisseurs: Fournisseur[] = [];
  entreesStock: EntreeStock[] = [];
  produits: Produit[] = [];

  searchText = '';
  newFournisseur = new Fournisseur;


  constructor(private fournisseurService: FournisseurService,
    private entreeStockService: EntreeStockService,
    private produitService: ProduitService,
    private fb: FormBuilder) {
    this.newFournisseurForm = this.createFormGroup(fb);
    this.getFournisseurs();
    this.getEntreesStock();
    this.getProduitsStocks();
  }

  createFormGroup(formBuilder: FormBuilder) {
    return this.fb.group({
      firstName_new_fournisseur: ['', [Validators.required, Validators.maxLength(256)]],
      lastName_new_fournisseur: ['', [Validators.required, Validators.maxLength(256)]],
      address_new_fournisseur: ['', [Validators.maxLength(256)]],
      telephone_new_fournisseur: ['', [Validators.maxLength(256)]],
      fax_new_fournisseur: ['', [Validators.maxLength(256)]],
      email_new_fournisseur: ['', [Validators.maxLength(256)]]
    });
  }

  ngOnInit() {
    this.newFournisseur = new Fournisseur;
  }

  getFournisseurs(): void {
    this.fournisseurService.getFournisseurs()
      .subscribe(fournisseurs => this.fournisseurs = fournisseurs);
  }

  getEntreesStock(): void {
    this.entreeStockService.getEntreesStock()
      .subscribe(entrees => {
        console.log(entrees);
        this.entreesStock = entrees;
      });
  }

  getProduitsStocks(): void {
    this.produitService.getProducts()
      .subscribe(products => this.produits = products);
  }

  deleteFournisseur(id): void {
    this.fournisseurService.deleteFournisseur(id)
      .subscribe(fournisseurs => this.fournisseurs = this.fournisseurs.filter(p => p.id !== id));
  }

  updateFournisseur(fournisseur): void {
    const firstNameExist = fournisseur.firstName ? this.fournisseurs.filter(m => m.id !== fournisseur.id && m.firstName.trim()
      .toUpperCase() === fournisseur.firstName.trim().toUpperCase()).length > 0 : false;
    const lastNameExist = fournisseur.lastName ? this.fournisseurs.filter(m => m.id !== fournisseur.id && m.lastName.trim()
      .toUpperCase() === fournisseur.lastName.trim().toUpperCase()).length > 0 : false;
    const telephoneExist = fournisseur.telephone ? this.fournisseurs.filter(m => m.id !== fournisseur.id && m.telephone && m.telephone.trim()
      .toUpperCase() === fournisseur.telephone.trim().toUpperCase()).length > 0 : false;
    if ((firstNameExist && lastNameExist) || telephoneExist) {
      if (telephoneExist) {
        this.newFournisseurForm.controls['telephone_new_fournisseur'].setErrors({ 'uniq': true });
      }
      if (firstNameExist) {
        this.newFournisseurForm.controls['firstName_new_fournisseur'].setErrors({ 'uniq': true });
      }
      if (lastNameExist) {
        this.newFournisseurForm.controls['lastName_new_fournisseur'].setErrors({ 'uniq': true });
      }
    } else {
      this.fournisseurService.updateFournisseur(fournisseur)
        .subscribe(p => {
          let index = this.fournisseurs.findIndex(c => c.id === fournisseur.id);
          this.fournisseurs[index] = fournisseur;
          this.fournisseurs = [...this.fournisseurs];
          $('#close_btn_modalFournisseur').click()
        });
    }
  }

  addFournisseur(fournisseur): void {
    const firstNameExist = fournisseur.firstName ? this.fournisseurs.filter(m => m.firstName.trim()
      .toUpperCase() === fournisseur.firstName.trim().toUpperCase()).length > 0 : false;
    const lastNameExist = fournisseur.lastName ? this.fournisseurs.filter(m => m.lastName.trim()
      .toUpperCase() === fournisseur.lastName.trim().toUpperCase()).length > 0 : false;
    const telephoneExist = fournisseur.telephone ? this.fournisseurs.filter(m => m.telephone && m.telephone.trim()
      .toUpperCase() === fournisseur.telephone.trim().toUpperCase()).length > 0 : false;
    if ((firstNameExist && lastNameExist) || telephoneExist) {
      if (telephoneExist) {
        this.newFournisseurForm.controls['telephone_new_fournisseur'].setErrors({ 'uniq': true });
      }
      if (firstNameExist) {
        this.newFournisseurForm.controls['firstName_new_fournisseur'].setErrors({ 'uniq': true });
      }
      if (lastNameExist) {
        this.newFournisseurForm.controls['lastName_new_fournisseur'].setErrors({ 'uniq': true });
      }
    } else {
      fournisseur.qte = 0;
      this.fournisseurService.addFournisseur(fournisseur)
        .subscribe(p => {
          this.fournisseurService.getFournisseurs()
            .subscribe(fournisseurs => this.fournisseurs = fournisseurs);
          $('#close_btn_modalFournisseur').click()
        });
    }
  }

  cleanForm() {
    this.newFournisseurForm.markAsPristine();
    this.newFournisseurForm.markAsUntouched();
    this.newFournisseurForm.updateValueAndValidity();
  }

  hasProducts(fournisseurId: number) {
    let hasProducts = false;
    this.produits.filter(p => p.qte > 0).forEach(
      p => {
        if (this.entreesStock.filter(e => e.productId === p.id && e.fournisseurId === fournisseurId).length > 0) {
          hasProducts = true;
        }
      }
    );
    return hasProducts;
  }

  beforeUpdateFournisseur(fournisseur): void {
    this.cleanForm();
    this.newFournisseur = Object.assign({}, fournisseur);
  }

  beforeAddFournisseur(): void {
    this.cleanForm();
    this.newFournisseur = new Fournisseur;
  }

  onSubmit() {
    if (this.newFournisseur.id) {
      this.updateFournisseur(this.newFournisseur);
    } else {
      this.addFournisseur(this.newFournisseur);
    }
  }

  displayPhoneNumber(number: string) {
    if (number) {
      return number.substring(0, 2) + ' ' + number.substring(2, 5) + ' ' + number.substring(5, 8);
    }
  }
}