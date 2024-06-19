import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Contato } from '../Models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:4000/api/contato'; // URL da API

  constructor(private http: HttpClient) {}

  enviarContato(dados: Contato): Observable<any> {
    // Simulação: retornando um ID fixo e os dados enviados
      return this.http.post<Contato>(this.apiUrl, dados);

    
    return of({ id_contato: Math.floor(Math.random() * 1000), ...dados });
  }

  editarContato(id: number, dados: any): Observable<any> {
    // Simulação: retornando o ID e os dados atualizados
    return of({ id_contato: id, ...dados });
  }

  obterContatos(): Observable<any[]> {
    // Simulação: retornando uma lista fixa de contatos
    return of([
      { id: 1, nome: 'João Silva', email: 'joao@exemplo.com', telefone: '(11) 1234-5678', mensagem: 'Mensagem 1' },
      { id: 2, nome: 'Maria Souza', email: 'maria@exemplo.com', telefone: '(22) 8765-4321', mensagem: 'Mensagem 2' }
    ]);
  }

  /* cadastrarContato(): Contato {
    
  }
   */
  
}