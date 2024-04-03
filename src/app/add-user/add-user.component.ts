import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

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
  confirmPassword:string='';

  constructor(private authService: AuthService) {}

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
      confirmPassword:this.confirmPassword,
    }).subscribe(
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