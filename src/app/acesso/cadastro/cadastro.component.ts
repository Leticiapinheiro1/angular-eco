import { Component } from '@angular/core';
import { Usuario } from 'src/app/usuario/models/usuario';
import { AcessosService } from '../acessos.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Parceiro } from 'src/app/parceiros/models/parceiro';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  constructor(
    private acessosService: AcessosService,
    private router: Router,
    private http: HttpClient,
  ) {}
  tipoCliente: string = 'usuario'
  nome: string='';
  dataNascimento!: Date;
  cpf: string = '';
  telefone: string = '';
  enderecoCompleto: string = '';
  cep: string = '';
  cepInvalido: boolean = false;
  logradouro: string = '';
  numero: string = '';
  complemento?: string = '';
  bairro: string = '';
  cidade: string = '';
  uf:string = ''
  estado: string = '';
  partesEndereco: string = '';
  nomeEmpresa: string = '';
  cnpj: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  showPassword: boolean = false;
  showPasswordSenha: boolean = false;
  showPasswordConfirmarSenha: boolean = false;
  senhasDiferentes: boolean = false;

  tipoClienteSelecionado() {
    if (this.tipoCliente === 'usuario') {
        // Caso o tipo de cliente seja "Usuário", limpa os campos relacionados a parceiros
        this.nomeEmpresa = '';
        this.cnpj = '';
    } else if (this.tipoCliente === 'parceiro') {
        // Caso o tipo de cliente seja "Parceiro", pode executar alguma lógica específica, se necessário
        // Por exemplo, inicializar os campos de empresa e CNPJ
       
    }
  }
  converterParaMaiusculas(campo: string) {
    if (campo === 'nome') {
        this.nome = this.nome.toUpperCase();
    } else if (campo === 'email') {
        this.email = this.email.toLowerCase();
    }
      else if (campo === 'nomeEmpresa') {
    this.nomeEmpresa = this.nomeEmpresa.toUpperCase();
}
}
  
  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  
    if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
      return false; // CPF deve ter 11 dígitos e não pode ser uma sequência de números repetidos
    }
  
    let soma = 0;
    let resto: number;
  
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
  
    resto = (soma * 10) % 11;
  
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
  
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }
  
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
  
    resto = (soma * 10) % 11;
  
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
  
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
  
    return true; // Se passou por todas as validações, o CPF é válido
  }
  cpfInvalido: boolean = false; 

  validaCpfOnChange() {
    if (this.cpf.length === 14) { // Verifica se o CPF possui 14 caracteres (incluindo pontos e hífen)
      this.cpfInvalido = !this.validarCPF(this.cpf);
    } else {
      this.cpfInvalido = false; // Se o CPF não tiver 14 caracteres, não é considerado inválido
    }
  }
  telefoneInvalido: boolean = false;
  validaTelefoneOnInput() {
    const telefoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;
  
    // Verifica se o telefone corresponde ao padrão de telefone do Brasil (DDD + número)
    if (!telefoneRegex.test(this.telefone)) {
      this.telefoneInvalido = true;
    } else {
      this.telefoneInvalido = false;
    }
  }
  validarCEP(): boolean {
    const regexCEP = /^[0-9]{5}-?[0-9]{3}$/;
    return regexCEP.test(this.cep);
  }

  buscarEnderecoPorCEP() {
    if (this.validarCEP()) {
        this.http.get(`https://viacep.com.br/ws/${this.cep}/json/`).subscribe({
            next: (data: any) => {
                this.logradouro = data.logradouro;
                this.bairro = data.bairro;
                this.cidade = data.localidade;
                this.estado = data.uf;

                this.atualizarEnderecoCompleto();
                this.cepInvalido = false;
                 
            },
            error: (error) => {
                console.error('Erro ao buscar CEP:', error);
                this.cepInvalido = true;
            }
        });
    } else {
        this.cepInvalido = true;
    }
}
atualizarEnderecoCompleto() {
    this.enderecoCompleto = `${this.logradouro}, ${this.bairro}, ${this.cidade} - ${this.estado} - ${this.cep}`;
    if (this.numero) {
        this.enderecoCompleto = `${this.enderecoCompleto}, ${this.numero}`;
        if (this.complemento) {
            this.enderecoCompleto = `${this.enderecoCompleto}, ${this.complemento}`;
        }
    }
}
setNumero(numero: string) {
  if (!numero) {
      console.error('Número é obrigatório.');
      return;
  }

  this.numero = numero;
}

cnpjInvalido: boolean = false;

validaCnpjOnChange() {
  if (this.cnpj.length === 18) {
    this.cnpjInvalido = !this.validarCNPJ();
  } else {
    this.cnpjInvalido = false;
  }
}

validarCNPJ(): boolean {
  this.cnpj = this.cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  if (this.cnpj.length !== 14 || /^(.)\1+$/.test(this.cnpj)) {
    this.cnpjInvalido = true; // CNPJ deve ter 14 dígitos e não pode ser uma sequência de números repetidos
    return false;
  }

  // Verificação dos dígitos verificadores
  let tamanho = this.cnpj.length - 2;
  let numeros = this.cnpj.substring(0, tamanho);
  const digitos = this.cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado.toString() !== digitos.charAt(0)) {
    this.cnpjInvalido = true;
    return false;
  }

  tamanho = tamanho + 1;
  numeros = this.cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado.toString() !== digitos.charAt(1)) {
    this.cnpjInvalido = true;
    return false;
  }

  this.cnpjInvalido = false; // Se passou por todas as validações, o CNPJ é válido
  return true;
}


togglePasswordVisibility(field: string) {
    if (field === 'senha') {
        this.showPasswordSenha = !this.showPasswordSenha;
    } else if (field === 'confirmarSenha') {
        this.showPasswordConfirmarSenha = !this.showPasswordConfirmarSenha;
    }
}

validarSenhas() {
  this.senhasDiferentes = this.senha !== this.confirmarSenha;
}

finalizarCadastro() {
  var minhaDiv = document.querySelector('[name="minhaDiv"]');
  var existe = minhaDiv !== null;

  console.log(existe ? 'A div existe no HTML.' : 'A div não foi encontrada no HTML.');
    
  if (this.tipoCliente === 'usuario') {

    let usuario: Usuario = new Usuario();

    usuario.setNome(this.nome);
    usuario.setDataNascimento(this.dataNascimento.toString());
    usuario.setCpf(this.cpf);
    usuario.setTelefone(this.telefone);
    // Atribuindo o endereço completo diretamente ao usuário
    usuario.setEndereco(this.enderecoCompleto);
    usuario.setEmail(this.email);
    usuario.setSenha(this.senha);

  
    this.acessosService.criar(usuario).subscribe((dados: any) => {
        // Redirecionar para a página de login após o cadastro bem-sucedido
        this.router.navigate(['/login']);
    });


  } else if (this.tipoCliente === 'parceiro') {

    let parceiro: Parceiro = new Parceiro();
    parceiro.setNome(this.nome);
    parceiro.setDataNascimento(this.dataNascimento.toString());
    parceiro.setTelefone(this.telefone);
    parceiro.setEndereco(this.enderecoCompleto); // Incluindo o endereço
    parceiro.setEmail(this.email);
    parceiro.setSenha(this.senha);
    parceiro.setCnpj(this.cnpj);

    this.acessosService.criar(parceiro).subscribe((dados: any) => {
      // Redirecionar para a página de login após o cadastro bem-sucedido
      this.router.navigate(['/login']);
    });
  }
}

}
