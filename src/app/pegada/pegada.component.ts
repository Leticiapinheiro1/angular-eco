import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Usuario } from '../usuario/models/usuario';
import { UsuariosService } from '../usuario/services/usuarios.service';

@Component({
  selector: 'app-pegada',
  templateUrl: './pegada.component.html',
  styleUrls: ['./pegada.component.css']
})
export class PegadaComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router,private UsuarioService: UsuariosService) { }
  private usuario: Usuario = new Usuario();
  ngOnInit(): void {
    this.usuario.setId(this.route.snapshot.params["id"]);
}
  public calcularSoma() {
    let soma = 0;
    for (let i = 1; i <= 18; i++) {
      let selectId = "select" + i;
      let select = document.getElementById(selectId) as HTMLSelectElement;
      let valorSelecionado = parseInt(select.value);
      if (!isNaN(valorSelecionado)) {
        soma += valorSelecionado;
      }
    }

    let resultadoElement = document.getElementById("resultado");
    if (resultadoElement) {
      resultadoElement.textContent = "Seu total de pontos é: " + soma;
    }

    let comparativo = "";
    if (soma <= 150) {
      comparativo = "É menor que 4 gha, equivalente à dos E.U.A.";
    } else if (soma <= 400) {
      comparativo = "Está entre 4 e 6 gha, equivalente à da França";
    } else if (soma <= 600) {
      comparativo = "Está entre 6 e 8 gha, equivalente à da Suécia";
    } else if (soma <= 800) {
      comparativo = "Está entre 8 e 10 gha, padrão Brasil";
    } else {
      comparativo = "É maior que 10 gha, dentro da média mundial";
    }

    alert("Seu total de pontos é: " + soma + "\nPegada ecológica: " + comparativo);

    this.usuario.setPontuacao(soma);
    this.UsuarioService.alterarPontuacao(this.usuario.getId(), soma).subscribe((dados: any) => {
      // Redirecionar para a página de login após o cadastro bem-sucedido
      console.log('ok')
      //this.router.navigate(['/login']);
    });
  } 
  
  public deletar() {
    this.UsuarioService.deletar(this.usuario.getId()).subscribe((dados: any) => {
    
      this.router.navigate(['/login']);
    });
  }
}
