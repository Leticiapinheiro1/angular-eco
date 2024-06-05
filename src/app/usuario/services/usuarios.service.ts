import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:9090/usuarios'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) { }

  listarTudo() {
    return this.http.get(this.apiUrl);
  }
  
  listarUm(id: number) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  criar(acesso: Usuario ) {
    return this.http.post(this.apiUrl, JSON.stringify(acesso));
  }

  deletar(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  alterarPontuacao(id: number, pontuacao: number): any {
    this.listarUm(id).subscribe((dados: any): any => {
      dados = {
        pontuacao: pontuacao
      };
      //dados.quantidade_login = dados.quantidade_login + 1;
      console.log(dados)
      
      console.log(this.apiUrl + '/' + id)
      return this.http.put(this.apiUrl + '/' + id, dados);
    });
  }
}
