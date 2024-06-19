import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pontuacao',
  templateUrl: './pontuacao.component.html',
  styleUrls: ['./pontuacao.component.css']
})
export class PontuacaoComponent {
  constructor(private http: HttpClient) {}



enviarParaAPI() {
  let token = localStorage.getItem('authToken') || ''; // Provide an empty string as the default value for token
  this.http.post('http://localhost:4000/api/pontuacao_pegada', { pontosTotais: this.pontosTotais }, { headers: { 'access-token': token } })
    .subscribe(
      response => {
        console.log('Data sent successfully:', response);
        // Handle the response from the API
      },
      error => {
        console.error('Error sending data:', error);
        // Handle the error
      }
    );
  }



 // Lista de materiais recicláveis
 materiais = [
  { nome: 'Plástico', pontos: 10 },
  { nome: 'Papel', pontos: 8 },
  { nome: 'Vidro', pontos: 5 },
  { nome: 'Metal', pontos: 15 },
];

materialSelecionado: number | null = null;
peso: number | null = null;
pontosTotais: number | null = null;

// Função para calcular os pontos
calcularPontos() {
  if (this.materialSelecionado !== null && this.peso !== null) {
    this.pontosTotais = (this.materialSelecionado / 100) * this.peso;
    this.enviarParaAPI();
  } else {
    this.pontosTotais = null;
  }
}
}
