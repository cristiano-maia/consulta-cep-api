import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from './endereco.interface';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private apiUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscarCep(cep: string): Observable<Endereco> {
    const url = `${this.apiUrl}/${cep}/json/`;
    return this.http.get<Endereco>(url);
  }
}
