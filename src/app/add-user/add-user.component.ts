import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  birthday: string = '';
  gender: string = '';
  email: string = '';
  mobile: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }

  onSubmit() {
    this.authService.signup({
      userName: this.username,
      fName: this.firstName,
      lName: this.lastName,
      birthday: this.birthday,
      gender: this.gender,
      email: this.email,
      mobile: this.mobile,
      password: this.password,
      confirmPassword: this.confirmPassword,
    }).subscribe(
      response => {
        this.openToast('User added successfully');
        console.log('Signup successful:', response);
        // Redirect to login page or other page
        this.router.navigate(['/']);
      },
      error => {
        console.error('Signup error:', error);
        // Handle signup error
        this.openToast('Signup error');
      }
    );
  }

  openToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
