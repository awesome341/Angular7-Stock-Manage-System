import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.css']
})
export class ParametrageComponent implements OnInit {

  marqs: any[] = [];


  constructor() { }

  ngOnInit() {
    this.marqs = [{ 'name': 'fefe' }];


  }
}