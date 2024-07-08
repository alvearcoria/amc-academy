import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

export const AuthRedirectGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getAuthState().pipe(
    map(user => {
      if (user) {
        // Redirige a la página de inicio si el usuario está autenticado
        return router.createUrlTree(['/pages/home']);
      } else {
        // Permite el acceso a la ruta de login si el usuario no está autenticado
        return true;
      }
    })
  );
};
