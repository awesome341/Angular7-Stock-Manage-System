import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { Utilisateur } from '../model/utilisateur';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private user= new Utilisateur;

  constructor(private authService:AuthenticationService) { 
  }

  
login() { 
  this.authService.login(this.user.telephone, this.user.password);
  }
}
