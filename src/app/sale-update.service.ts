import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SaleUpdateService {
  private apiBaseUrl = 'https://localhost:7228/api/UpdateSale';
  constructor(private http:HttpClient) { }
  updateSale( updatedSale: any): Observable<any> {
    //return this.http.put(`${this.apiUrl}/${saleId}`, updatedSale,{ responseType: 'text' });
    //const apiUrl = `${this.apiBaseUrl}/api/UpdateSale/${saleId}`;
    return this.http.put(`${this.apiBaseUrl}/${updatedSale.saleId}`,updatedSale);
}
}
