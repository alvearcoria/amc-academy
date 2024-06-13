import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        //console.log('Esta logeado')
        this.router.navigate(['pages/home']);
      }else{
        //console.log('No esta logeado')
      }
    });
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

   logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }

 /*  getAuthState() {
    return this.afAuth.authState;
  } */

  getAuthState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }
}
