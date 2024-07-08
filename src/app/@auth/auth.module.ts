import { NgxLoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule,
  NbIconModule,
  NbSelectModule,
  NbOptionModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';
import { NgxAuthComponent } from './ngx-auth/ngx-auth.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    ReactiveFormsModule,
    NbLayoutModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAlertModule,
    TranslateModule,
    NgxAuthRoutingModule,
    TranslateModule,
    NbAuthModule,
    NbIconModule,
    NbSelectModule,
    NbOptionModule,
    NbDatepickerModule.forRoot(),

  ],
  declarations: [
    NgxAuthComponent,
    NgxLoginComponent,
    NgxResetPasswordComponent,
    LogoutComponent,
    RegisterComponent
  ],
})
export class NgxAuthModule {
}
