// import { Component } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { CanActivate, Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements CanActivate {
//   email: string = '';
//   password: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (true) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }

//   onSubmit() {
//     this.authService.login(this.email, this.password).subscribe(
//       (response) => {
//         const token = response.body.token;
//         localStorage.setItem('token', token);
//         console.log('Token:', token);
//         this.router.navigate(['/products']);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }
// }
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
// import { NgToastService } from 'ng-angular-popup';
// import { IUser } from '../signup/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // isLoading = false;
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) // private toast: NgToastService
  {}
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
  });
  userData = {
    email: '',
    password: '',
  };

  submitted = false;

  onSubmit() {
    if (!this.loginForm.value) {
      return;
    }
    this.submitted = true;

    this.userData.email = this.loginForm.get('email')!.value || '';

    this.userData.password = this.loginForm.get('password')!.value || '';

    // this.isLoading = true;
    this.authService
      .login(this.userData.email, this.userData.password)
      .subscribe({
        next: (response) => {
          console.log('next');

          const token = response.body.token;
          localStorage.setItem('token', token);
          console.log('Token:', token);
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.log('error');

          // this.toast.error({
          //   detail: 'wrong email or password!',
          //   summary: 'Error',
          //   duration: 5000,
          //   position: 'topRight',
          // });
          // this.isLoading = false;
        },
        // complete: () => (this.isLoading = false),
      });
    this.loginForm.reset();
  }

  create() {
    this.router.navigate(['./signup']);
  }
}
