import { Component } from '@angular/core';
import { AuthService } from '../../@core/utils/auth.service';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent {
  authService: any;
  router: any;
  constructor(public auth: AuthService) {
    this.auth.logout()
  }
}
