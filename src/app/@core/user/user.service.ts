import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';  // Asegúrate de importar auth de firebase/compat

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

  setUserData(user: firebase.User) {
    const userRef = this.firestore.collection('users').doc(user.uid);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerId: user.providerData[0]?.providerId,  // Proveedor de autenticación
      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    };

    return userRef.set(data, { merge: true });
  }
}
