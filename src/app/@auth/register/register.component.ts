import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../@core/utils/auth.service';
import { NbToastrService } from '@nebular/theme';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles = ['alumno', 'master', 'admin']; // Definir roles
  genders = ['male', 'female', 'other']; // Definir géneros

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      gender: ['', Validators.required],
      role: ['alumno', Validators.required],
      profilePicture: [''],
      preferences: this.fb.group({
        notifications: [true],
      }),
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      this.authService.register(formValue.email, formValue.password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            this.authService.setUserData({
              uid: user.uid,
              ...formValue,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            });
            this.toastrService.success('Registration successful', 'Success');
            this.router.navigate(['/login']);
          }
        })
        .catch(error => {
          this.toastrService.danger(error.message, 'Registration error');
        });
    }
  }
}

