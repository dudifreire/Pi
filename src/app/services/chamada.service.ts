import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChamadaService {

  constructor(private http: HttpClient) { }

  submitChamada(form) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url ='http://localhost:8080/chamadas'
    return this.http.post(url, form ,{
      headers: headers
    });
  }
  getChamadas():Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url ='http://localhost:8080/chamadas'
    return this.http.get<any>(url);
  }
}
