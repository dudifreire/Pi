import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  
  constructor(private http: HttpClient) { }

  submitCadastro(form) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url ='http://localhost:8080/alunoes'
    return this.http.post(url, form ,{
      headers: headers
    });
  }
  getAlunos():Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url ='http://localhost:8080/alunoes'
    return this.http.get<any>(url);
  }
}
