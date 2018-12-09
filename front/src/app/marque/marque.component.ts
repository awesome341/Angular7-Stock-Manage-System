import { Component, OnInit } from '@angular/core';
import { MarqueService } from './../services/marque.service';
import { Marque } from './../model/marque';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.css']
})
export class MarqueComponent implements OnInit {
  newMarqForm: FormGroup;

  marqs: Marque[] = [];
  searchText = '';
  newMarq = new Marque;


  constructor(private marqueService: MarqueService, private fb: FormBuilder) {
    this.newMarqForm = this.createFormGroup(fb);
  }

  createFormGroup(formBuilder: FormBuilder) {
    return this.fb.group({
      label_new_marq: ['', [Validators.required, Validators.maxLength(256)]]
    });
  }

  ngOnInit() {
    this.getMarqs();
    this.newMarq = new Marque;
  }

  getMarqs(): void {
    this.marqueService.getMarqs()
      .subscribe(marqs => this.marqs = marqs);
  }

  deleteMarq(id): void {
    this.marqueService.deleteMarque(id)
      .subscribe(marqs => this.marqs = this.marqs.filter(p => p.id !== id));
  }

  updateMarq(marq): void {
    if (this.marqs.filter(m => m.id!==marq.id && m.label.trim().toUpperCase() === marq.label.trim().toUpperCase()).length > 0) {
      this.newMarqForm.controls['label_new_marq'].setErrors({ 'uniq': true });
    } else {
    this.marqueService.updateMarque(marq)
      .subscribe(p => {
        let index = this.marqs.findIndex(p => p.id === marq.id);
        this.marqs[index] = marq;
        this.marqs = [...this.marqs];
        $('#close_btn_modalMarque').click()
      });
    }
  }

  addMarq(marq: Marque): void {
    if (this.marqs.filter(m => m.label.trim().toUpperCase() === marq.label.trim().toUpperCase()).length > 0) {
      this.newMarqForm.controls['label_new_marq'].setErrors({ 'uniq': true });
    } else {
      this.marqueService.addMarque(marq)
        .subscribe(p => {
          this.marqueService.getMarqs()
            .subscribe(marqs => this.marqs = marqs);
          $('#close_btn_modalMarque').click()
        })
    }
    ;
  }

  cleanForm() {
    this.newMarqForm.markAsPristine();
    this.newMarqForm.markAsUntouched();
    this.newMarqForm.updateValueAndValidity();
  }

  beforeUpdateMarq(marq): void {
    this.cleanForm();
    this.newMarq = Object.assign({}, marq);
  }

  beforeAddMarq(): void {
    this.cleanForm();
    this.newMarq = new Marque;
  }

  onSubmit() {
    if (this.newMarq.id) {
      this.updateMarq(this.newMarq);
    } else {
      this.addMarq(this.newMarq);
    }
  }
}