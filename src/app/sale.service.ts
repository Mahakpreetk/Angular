import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private Url= 'https://localhost:7228/api/SaleAdd/api/sales';
  constructor(private http: HttpClient) { }

  addSale(addSaleData: any): Observable<any> {
    return this.http.post(this.Url, addSaleData,{ responseType: 'text' });
  }
}
