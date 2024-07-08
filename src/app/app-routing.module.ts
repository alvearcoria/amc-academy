import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@core/utils/auth.guard';
import { AuthRedirectGuard } from './@core/utils/auth-redirect.guard';
import { RegisterComponent } from './@auth/register/register.component';

const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    canActivate: [AuthRedirectGuard],
    loadChildren: () => import('./@auth/auth.module')
    .then(m => m.NgxAuthModule),
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'prefix'},
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
