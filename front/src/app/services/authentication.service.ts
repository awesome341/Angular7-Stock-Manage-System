import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from './user.service';

@Injectable()
export class AuthenticationService {
  user = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UtilisateurService
  ) { }

  logout() {
    this.user = null;
    if(localStorage.getItem('currentUserLogin')){
      localStorage.clear();
      }
    this.router.navigateByUrl('/logout');
  }

  login(login, password) {
    this.user = null;
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    if (returnUrl) {
      localStorage.setItem('returnUrl', returnUrl);
    }

    this.userService.getUtilisateurs()
      .subscribe(data => {
        const users = data.filter(u => u.telephone === login && u.password === password);
        if (users.length != 0) {
          this.user = users[0];

            localStorage.setItem('currentUserLogin', this.user.telephone);

          let url = localStorage.getItem('returnUrl');
          if (url) {
            this.router.navigateByUrl(url);
            localStorage.removeItem('returnUrl');
          } else {
            this.router.navigateByUrl('private');
          }
        }
      });
  }
}
