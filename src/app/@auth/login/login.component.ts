import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  NbLoginComponent,
  NbAuthService,
  NB_AUTH_OPTIONS,
} from '@nebular/auth';
import { AuthService } from '../../@core/utils/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {
  showMessages = { error: false, success: false };

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private authService: AuthService
  ) {
    super(service, options, cd, router);
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.authService.login(this.user.email, this.user.password)
      .then(() => {
        this.submitted = false;
        this.showMessages.success = true;
        this.messages = ['Login successful'];
        this.router.navigate(['/pages/home']);
        this.cd.detectChanges();
      })
      .catch(error => {
        this.submitted = false;
        this.showMessages.error = true;
        this.errors = [error.message];
        this.cd.detectChanges();
      });
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle()
      .then((message) => {
        if (message) {
          this.showMessages.error = true;
          this.errors = [message];
        } else {
          this.showMessages.success = true;
          this.messages = ['Login with Google successful'];
          this.router.navigate(['/pages/home']);
        }
        this.cd.detectChanges();
      })
      .catch(error => {
        this.showMessages.error = true;
        this.errors = [error];
        this.cd.detectChanges();
      });
  }

  loginWithFacebook(): void {
    this.authService.loginWithFacebook()
      .then((message) => {
        if (message) {
          this.showMessages.error = true;
          this.errors = [message];
        } else {
          this.showMessages.success = true;
          this.messages = ['Login with Facebook successful'];
          this.router.navigate(['/pages/home']);
        }
        this.cd.detectChanges();
      })
      .catch(error => {
        this.showMessages.error = true;
        this.errors = [error];
        this.cd.detectChanges();
      });
  }
}

