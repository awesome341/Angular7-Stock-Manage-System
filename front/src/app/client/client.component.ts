import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { ClientService } from './../services/client.service';
import { Client } from './../model/client';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  newClientForm: FormGroup;

  clients: Client[] = [];
  paymentModes: any[] = [];
  searchText = '';
  newClient = new Client;


  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.newClientForm = this.createFormGroup(fb);
  }

  createFormGroup(formBuilder: FormBuilder) {
    return this.fb.group({
      firstName_new_client: [null, [Validators.required, Validators.maxLength(256)]],
      lastName_new_client: [null, [Validators.required, Validators.maxLength(256)]],
      address_new_client: [null, [Validators.maxLength(256)]],
      paymentMode_new_client: [null, [Validators.maxLength(256)]],
      telephone_new_client: [null, [Validators.maxLength(256)]],
      fax_new_client: [null, [Validators.maxLength(256)]],
      email_new_client: [null, [Validators.maxLength(256)]]
    });
  }

  ngOnInit() {
    this.getClients();
    this.newClient = new Client;
    this.initPaymentMode();
  }

  initPaymentMode() {
    this.paymentModes = [{ id: 'Espèce', ref: 'Espèce' }, { id: 'Chèque', ref: 'Chèque' }, { id: 'Carte', ref: 'Carte' }];
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(clients => this.clients = clients);
  }

  deleteClient(id): void {
    this.clientService.deleteClient(id)
      .subscribe(clients => this.clients = this.clients.filter(p => p.id !== id));
  }

  updateClient(client): void {
    const firstNameExist = client.firstName ? this.clients.filter(m => m.id !== client.id && m.firstName.trim()
      .toUpperCase() === client.firstName.trim().toUpperCase()).length > 0 : false;
    const lastNameExist = client.lastName ? this.clients.filter(m => m.id !== client.id && m.lastName.trim()
      .toUpperCase() === client.lastName.trim().toUpperCase()).length > 0 : false;
    const telephoneExist = client.telephone ? this.clients.filter(m => m.id !== client.id && m.telephone && m.telephone.trim()
      .toUpperCase() === client.telephone.trim().toUpperCase()).length > 0 : false;
    if ((firstNameExist && lastNameExist) || telephoneExist) {
      if (telephoneExist) {
        this.newClientForm.controls['telephone_new_client'].setErrors({ 'uniq': true });
      }
      if (firstNameExist) {
        this.newClientForm.controls['firstName_new_client'].setErrors({ 'uniq': true });
      }
      if (lastNameExist) {
        this.newClientForm.controls['lastName_new_client'].setErrors({ 'uniq': true });
      }
    } else {
      this.clientService.updateClient(client)
        .subscribe(p => {
          let index = this.clients.findIndex(c => c.id === client.id);
          this.clients[index] = client;
          this.clients = [...this.clients];
          $('#close_btn_modalClient').click()
        });
    }
  }

  addClient(client: Client): void {
    const firstNameExist = client.firstName ? this.clients.filter(m => m.id !== client.id && m.firstName.trim()
      .toUpperCase() === client.firstName.trim().toUpperCase()).length > 0 : false;
    const lastNameExist = client.lastName ? this.clients.filter(m => m.id !== client.id && m.lastName.trim()
      .toUpperCase() === client.lastName.trim().toUpperCase()).length > 0 : false;
    const telephoneExist = client.telephone ? this.clients.filter(m => m.id !== client.id && m.telephone && m.telephone.trim()
      .toUpperCase() === client.telephone.trim().toUpperCase()).length > 0 : false;
    if ((firstNameExist && lastNameExist) || telephoneExist) {
      if (telephoneExist) {
        this.newClientForm.controls['telephone_new_client'].setErrors({ 'uniq': true });
      }
      if (firstNameExist) {
        this.newClientForm.controls['firstName_new_client'].setErrors({ 'uniq': true });
      }
      if (lastNameExist) {
        this.newClientForm.controls['lastName_new_client'].setErrors({ 'uniq': true });
      }
    } else {
      this.clientService.addClient(client)
        .subscribe(p => {
          this.clientService.getClients()
            .subscribe(clients => this.clients = clients);
          $('#close_btn_modalClient').click()
        });
    }
  }

  cleanForm() {
    this.newClientForm.markAsPristine();
    this.newClientForm.markAsUntouched();
    this.newClientForm.updateValueAndValidity();
  }


  beforeUpdateClient(client): void {
    this.cleanForm();
    this.newClient = Object.assign({}, client);
  }

  beforeAddClient(): void {
    this.cleanForm();
    this.newClient = new Client;
    this.newClient.paymentMode = 'Espèce';
  }

  onSubmit() {
    if (this.newClient.id) {
      this.updateClient(this.newClient);
    } else {
      this.addClient(this.newClient);
    }
  }

  displayPhoneNumber(number: string) {
    if (number) {
      return number.substring(0, 2) + ' ' + number.substring(2, 5) + ' ' + number.substring(5, 8);
    }
  }
}