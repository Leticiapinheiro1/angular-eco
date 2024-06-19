import { Component } from '@angular/core';

@Component({
  selector: 'app-pontuacao',
  templateUrl: './pontuacao.component.html',
  styleUrls: ['./pontuacao.component.css']
})
export class PontuacaoComponent {
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
  } else {
    this.pontosTotais = null;
  }
}
}
