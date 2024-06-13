import { Component } from '@angular/core';
import { AuthService } from '../../@core/utils.ts/auth.service';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent {
  constructor(public auth: AuthService){
    this.auth.logout();
  }
}
