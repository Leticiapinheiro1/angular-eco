import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AcessosService } from '../acessos.service';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css'] // Caminho ajustado
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  cpf:string='';
  showPassword: boolean = false;
  cpfOuCnpj: string = '';
  
  togglePasswordVisibility1() {
    this.showPassword = !this.showPassword;
  }

  constructor(   private acessosService: AcessosService, private router: Router) { }

  login() {
    
    /*/this.acessosService.login(this.cpf, this.senha).subscribe((dados: any) => {
      if(dados.quantidade_login === 0) {
        console.log('test')
        this.router.navigate(['/pegada', dados.id]);
      }
    })

      }
  }/*/
  
    try {
      this.acessosService.login(this.cpfOuCnpj, this.senha).subscribe((dados: any) => {
          // Lógica de sucesso no login aqui
          window.alert('Usuário autenticado com sucesso:');

          // Verifica se a quantidade de login é igual a zero
          if (this.acessosService.isCpf(this.cpfOuCnpj)) {
            // Verifica se a quantidade de login é igual a zero
            if (dados.quantidade_login === 0) {
              // Redirecionar para a página 'pegada' se a quantidade de login for igual a zero
              // Substitua '/pegada' pelo caminho correto da página
              this.router.navigate(['/pegada', dados.id]);
              // Exibe um alerta após o redirecionamento
              window.alert('Bem-vindo! Este é o seu primeiro login.');
            } else {
              // Redirecionar para a página 'home' se não for o primeiro login
              // Substitua '/home' pelo caminho correto da página
              this.router.navigate(['/home']);
            }
          } else {
            // Se não for um CPF, redirecionar para a página 'home'
            // Substitua '/home' pelo caminho correto da página
            this.router.navigate(['/home']);
          }
        },
      );
    } catch (error) {
      // Lidar com exceções lançadas pela lógica de login
      console.error('Erro:', error);
      // Exibir mensagem de erro, limpar campos, etc.
    }

  }
}




