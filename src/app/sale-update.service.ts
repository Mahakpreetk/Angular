import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SaleUpdateService {
  private apiUrl = 'https://localhost:7228/api/UpdateSale';
  constructor(private http:HttpClient) { }
  updateSale(saleId: number, updatedSale: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${saleId}`, updatedSale,{ responseType: 'text' });
}
}
