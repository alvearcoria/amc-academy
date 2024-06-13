import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import {
  NbLoginComponent,
  NbAuthService,
  NB_AUTH_OPTIONS,
  NbAuthResult,
} from '@nebular/auth';
import { Store } from '@ngrx/store';
import * as fromI18n from '../../@i18n/reducers';
import { Language } from '../../@i18n/models/language.model';
import { AuthService } from '../../@core/utils.ts/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {
  currentLanguage$: Observable<Language>;
  isLoggedIn: boolean = false;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
  ) {
    super(service, options, cd, router);
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.authService.login(this.user.email, this.user.password)
      .then(result => {
        this.submitted = false;
        this.messages = ['Login successful'];

        // Aquí especificamos la ruta de redirección después del login exitoso
        const redirect = 'pages/home'; // Cambia esto según tu ruta principal

        if (redirect) {
          //console.log('Redireccionando a:', redirect); // Verificar que la redirección se está intentando
          this.router.navigateByUrl(redirect)
            .then(nav => {
              //console.log('Navegación exitosa:', nav);
            })
            .catch(err => {
              console.error('Error de navegación:', err);
            });
        }
        this.cd.detectChanges();
      })
      .catch(error => {
        this.submitted = false;
        this.errors = [error.message];
        this.cd.detectChanges();
      });
  }

}
