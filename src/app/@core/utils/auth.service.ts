import { routes } from './../../@auth/auth-routing.module';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Observable } from 'rxjs';

interface FirebaseAuthError extends firebase.FirebaseError {
  email?: string;
  credential?: firebase.auth.AuthCredential;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

  /* async register(email: string, password: string, displayName: string, role: string): Promise<void> {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    await userCredential.user?.updateProfile({ displayName });
    await this.setUserData(userCredential.user, role);
  } */

  async register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async login(email: string, password: string): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async loginWithGoogle(): Promise<void | string> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      if (result.user) {
        await this.setUserData(result.user);
      }
    } catch (error) {
      return this.handleCredentialError(error as FirebaseAuthError);
    }
  }

  async loginWithFacebook(): Promise<void | string> {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      if (result.user) {
        await this.setUserData(result.user);
      }
    } catch (error) {
      return this.handleCredentialError(error as FirebaseAuthError);
    }
  }

  private async handleCredentialError(error: FirebaseAuthError): Promise<string> {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const email = error.email;
      const pendingCred = error.credential;
      const methods = await this.afAuth.fetchSignInMethodsForEmail(email || '');

      if (methods.length > 0) {
        if (methods.includes('password')) {
          return 'Ya existe una cuenta con este correo usando el método de contraseña. Por favor, inicia sesión usando tu correo y contraseña.';
        } else if (methods.includes('google.com')) {
          return 'Ya existe una cuenta con este correo usando Google. Por favor, inicia sesión usando Google.';
        } else if (methods.includes('facebook.com')) {
          return 'Ya existe una cuenta con este correo usando Facebook. Por favor, inicia sesión usando Facebook.';
        }
      } else {
        console.error('No se encontraron métodos de inicio de sesión para este correo electrónico.');
        return 'No se encontraron métodos de inicio de sesión para este correo electrónico.';
      }
    } else {
      console.log('Hubo un error, es: ', error);
      throw error;
    }
  }

  getAuthState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  async setUserData(user: any): Promise<void> {
    const userRef = this.firestore.collection('users').doc(user.uid);
    const data = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      gender: user.gender,
      role: user.role,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      profilePicture: user.profilePicture,
      preferences: user.preferences,
    };
    await userRef.set(data, { merge: true });
  }

  async emailExists(email: string): Promise<boolean> {
    const signInMethods = await this.afAuth.fetchSignInMethodsForEmail(email);
    return signInMethods.length > 0;
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
