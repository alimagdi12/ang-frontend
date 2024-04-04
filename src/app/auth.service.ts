import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  setToken(token: any) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/login`,
      { email, password },
      { observe: 'response' }
    );
  }

  signup(userData: any) {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }
}
