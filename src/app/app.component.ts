import { Component,OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeaderTemplates: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Ouvimos eventos de navegação para atualizar a visibilidade do header/footer
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Verificamos a URL atual e decidimos se devemos mostrar o header/footer
      this.showHeaderTemplates = !['/login', '/cadastro'].includes(this.router.url);
    });
  }
}