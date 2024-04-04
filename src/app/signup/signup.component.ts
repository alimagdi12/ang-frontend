// signup.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  birthday: string = '';
  gender: string = '';
  email: string = '';
  mobile: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) {}

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailRegex),
    ]),

    birthday: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/),
    ]),

    agreement: new FormControl<boolean>(false, [Validators.requiredTrue]),
    gender: new FormControl('male', [Validators.required]),
  });

  onSubmit() {
    console.log(this.registerForm.value.username);
    this.authService
      .signup({
        userName: this.registerForm.value.username,
        fName: this.registerForm.value.firstName,
        lName: this.registerForm.value.lastName,
        birthday: this.registerForm.value.birthday,
        gender: this.registerForm.value.gender,
        email: this.registerForm.value.email,
        mobile: this.registerForm.value.mobile,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword,
      })
      .subscribe(
        (response) => {
          console.log('Signup successful:', response);
          // Redirect to login page or other page
          this.registerForm.reset(this.registerForm.value);
        },
        (error) => {
          console.error('Signup error:', error);
          // Handle signup error
        }
      );
  }
  getFormControl(controlName: String) {
    // @ts-ignore
    return this.registerForm.controls[controlName];
  }
}
