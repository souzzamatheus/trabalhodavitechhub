import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(timeout(10000));
  }

  getProductById(id: number | string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(timeout(10000));
  }
}
