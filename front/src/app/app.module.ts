import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { DataTableModule } from 'primeng/datatable';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';

import { AppComponent } from './app.component';
import { MarqueComponent } from './marque/marque.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { FactureComponent } from './facture/facture.component';
import { ParametrageComponent } from './parametrage/parametrage.component';
import { ProduitComponent } from './produit/produit.component';
import { EtatStockComponent } from './etatStock/etatStock.component';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';
import { SearchProductByNamePipe } from './common/SearchProductByNamePipe';
import { SearchMarqByNamePipe } from './common/SearchMarqByNamePipe';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';

import { UtilisateurService } from './services/user.service';
import { ProduitService } from './services/produit.service';
import { MarqueService } from './services/marque.service';
import { FournisseurService } from './services/fournisseur.service';
import { MessageService } from './services/message.service';

import { LogoutPageComponent } from './logout/logout-page.component';
import { PrivatePageComponent } from './private/private-page/private-page.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { EntreeStockService } from './services/entreeStock.service';
import { SearchFournisseurByNamePipe } from './common/SearchFournisseurByNamePipe';
import { FooterComponent } from './footer/footer.component';
import { SearchClientByNamePipe } from './common/SearchclientByNamePipe';
import { ClientService } from './services/client.service';
import { FactureService } from './services/facture.service';
import { SearchFactureByNamePipe } from './common/SearchFactureByNamePipe';
import { AchatService } from './services/achat.service';

const routes: Routes = [
  { path: '', component: LogoutPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutPageComponent },

  {
    path: 'private', component: PrivatePageComponent, canActivate: [AuthGuardService],
    children: [
      { path: "", redirectTo: "marque", pathMatch: "full" },
      { path: "marque", component: MarqueComponent },
      { path: "fournisseur", component: FournisseurComponent },
      { path: "facture", component: FactureComponent },
      { path: "parametrage", component: ParametrageComponent },
      { path: "produit", component: ProduitComponent },
      { path: "etatStock", component: EtatStockComponent },
      { path: "client", component: ClientComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    PrivatePageComponent,
    MarqueComponent,
    FournisseurComponent,
    ParametrageComponent,
    ProduitComponent,
    LogoutPageComponent,
    FactureComponent,
    EtatStockComponent,
    ClientComponent,
    SidebarComponent,
    SearchProductByNamePipe,
    SearchMarqByNamePipe,
    SearchFournisseurByNamePipe,
    SearchClientByNamePipe,
    SearchFactureByNamePipe
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    DataTableModule,
    TooltipModule,
    TableModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    UtilisateurService,
    ProduitService,
    MarqueService,
    FournisseurService,
    EntreeStockService,
    ClientService,
    FactureService,
    AchatService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
