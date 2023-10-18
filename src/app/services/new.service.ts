/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewService {
  baseUrl = 'https://localhost:7113/api/Pharma';

  constructor(private http: HttpClient) { }

  Get() : Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewService {
  private apiUrl = 'https://localhost:7228/api/Pharma'; 

  constructor(private http: HttpClient) { }

  Get(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteSale(saleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${saleId}`);
  }
  searchSales(query: string): Observable<any> {
    const url = `${this.apiUrl}/search?query=${query}`;
    return this.http.get(url);
  }
  //addSale(item: any): Observable<any> {
   // return this.http.post<any>(`${this.apiUrl}/AddSale`, item);
  //}
}
