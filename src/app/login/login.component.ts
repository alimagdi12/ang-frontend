import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password)
      .subscribe(
        response => {
          const token = response.body.token;
          localStorage.setItem('token', token);
          console.log('Token:', token);
          this.router.navigate(['/products']);        },
        error => {
          console.log(error);
        }
      );
  }
}