import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary forms modules
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup; // Declare the form group

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    // Initialize the form group with form controls and validators
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^(011|012|010)\d{8}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.matchPassword });
  }

  // Custom validator for password complexity
  passwordValidator(control: any) {
    if (!control.value) {
      return null;
    }

    const containsLowercase = /[a-z]/.test(control.value);
    const containsUppercase = /[A-Z]/.test(control.value);
    const containsNumber = /\d/.test(control.value);

    const valid = containsLowercase && containsUppercase && containsNumber;
    return valid ? null : { invalidPassword: true };
  }

  // Custom validator for confirm password matching
  matchPassword(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    return password && confirmPassword && password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return; // Form is invalid, do not submit
    }

    // Proceed with signup
    this.authService.signup(this.signupForm.value).subscribe(
      response => {
        console.log('Signup successful:', response);
        // Redirect to login page or other page
      },
      error => {
        console.error('Signup error:', error);
        // Handle signup error
      }
    );
  }
}
