import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authenticationService :AuthenticationService) {
   }
   logout(){
     this.authenticationService.logout();
   }
}