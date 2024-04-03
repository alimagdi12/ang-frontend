import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product-list/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    return this.http.get(`${this.baseUrl}/products`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
  }

  deleteProduct(productId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-type': 'application/json; charset=UTF-8',
        jwt:token!,
      });

    return this.http.delete(`${this.baseUrl}/delete-product/${productId}`, { headers, withCredentials: true });
  }


  getProductById(productId: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-type': 'application/json; charset=UTF-8',
    jwt: token!,
  });

  return this.http.get(`${this.baseUrl}/product/${productId}`, { headers, withCredentials: true });
}
putEditProduct(productId: string, productData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token!,
    });

    return this.http.put(`${this.baseUrl}/edit-product/${productId}`, productData, { headers, withCredentials: true });
  }




  addProduct(product: Product): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token!,
    });
    return this.http.post(`${this.baseUrl}/add-product`, product,{ headers, withCredentials: true });
  }



}
