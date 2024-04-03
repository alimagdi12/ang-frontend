import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements CanActivate {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        const token = response.body.token;
        localStorage.setItem('token', token);
        console.log('Token:', token);
        this.router.navigate(['/products']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
