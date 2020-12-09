import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorServiceService {

  constructor(private http: HttpClient) { }

  submitCadastro(form) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url ='http://localhost:8080/colaboradors'
    return this.http.post(url, form ,{
      headers: headers
    });
  }
  testeApi():Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url ='http://localhost:8080/colaboradors'
    return this.http.get<any>(url);
  }

}
