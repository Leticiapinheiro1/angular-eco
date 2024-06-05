import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parceiro } from '../models/parceiro';

@Injectable({
  providedIn: 'root'
})
export class ParceirosService {

  private apiUrl = 'http://localhost:9090/parceiros'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) { }

  listarTudo() {
    return this.http.get(this.apiUrl);
  }
  
  listarUm(id: number) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  criar(acesso: Parceiro) {
    return this.http.post(this.apiUrl, acesso);
  }
}
