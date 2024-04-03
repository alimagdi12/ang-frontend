import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {}

  getUserProfile() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token!,
    });
    return this.http.get(`${this.baseUrl}/profile`, {
      headers,
      withCredentials: true,
    });
  }

  updateUser(userData: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token!,
    });

    return this.http.put(`${this.baseUrl}/updateUser`, userData, {
      headers,
      withCredentials: true,
    });
  }

  getCart(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token!,
    });

    return this.http.get(`${this.baseUrl}/cart`, {
      headers,
      withCredentials: true,
    });
  }

  addToCart(productId: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);

    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token!,
    });
    const body = {
      productId: productId,
    };

    return this.http.post(`${this.baseUrl}/cart`, body, { headers });
  }

  removeFromCart(productId: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token!,
    });

    const body = {
      productId: productId,
    };

    return this.http.post(`${this.baseUrl}/cart-delete`, body, { headers });
  }

  increaseQuantity(productId: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token!,
    });

    return this.http.post<any>(
      `${this.baseUrl}/cart-add-quantity`,
      { productId },
      { headers }
    );
  }

  decreaseQuantity(productId: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token!,
    });

    return this.http.post<any>(
      `${this.baseUrl}/cart-decrease-quantity`,
      { productId },
      { headers }
    );
  }
  getStripePaymentLink(totalPrice: number) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token!,
    });

    return this.http.post(
      `${this.baseUrl}/payment`,
      { totalPrice },
      { headers }
    );
  }
}
