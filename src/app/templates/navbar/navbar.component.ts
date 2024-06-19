import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  ngOnInit() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleKeyPress(event: KeyboardEvent) {
    // Verifica se a tecla pressionada é "F1"
    if (event.key === "F1" || event.keyCode === 112) {
      event.preventDefault(); // Impede a ação padrão do navegador para "F1"
      console.log("Tecla F1 foi pressionada!");
      // Adicione aqui a lógica que deseja executar
    }
  }

  // Não se esqueça de remover o listener para evitar memory leaks
  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeyPress.bind(this));
  }
}