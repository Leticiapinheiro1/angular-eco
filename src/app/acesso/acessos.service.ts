import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../usuario/models/usuario';
import { Parceiro } from '../parceiros/models/parceiro';


@Injectable({
  providedIn: 'root'
})
export class AcessosService {
  private apiUrl = 'http://localhost:9090/'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) {} // Inject the HttpClient here

  criar(acesso: Usuario | Parceiro): any {
    if (acesso instanceof Usuario) {
      return this.http.post<Usuario>(this.apiUrl + 'usuarios', acesso);
    } else if (acesso instanceof Parceiro) {
      return this.http.post<Parceiro>(this.apiUrl + 'parceiros', acesso);
    } else {
      throw new Error('Tipo de acesso inválido');
    }
  }

  login(/* essa variavel esta como string vazia '' */cpfOuCnpj: string, senha: string): any {
    let endpoint: string = "";
    let dados: any;

    console.log(cpfOuCnpj);

    if (this.isCpf(cpfOuCnpj)) {
      // Se for CPF
      endpoint = 'usuarios';
      dados = {
        cpf: cpfOuCnpj,
        senha: senha
      };
    } else if (this.isCnpj(cpfOuCnpj)) {
      // Se for CNPJ
      endpoint = 'parceiros';
      dados = {
        cnpj: cpfOuCnpj,
        senha: senha
      };
    } else {
      alert('Formato de CPF ou CNPJ inválido');
    }

    return this.http.post(this.apiUrl + endpoint + '/login', dados);
  }

  isCpf(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '' || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
      return false;
    }
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
      return false;
    }
    return true;
  }

  isCnpj(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj === '' || cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
      return false;
    }
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) {
      return false;
    }
    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) {
      return false;
    }
    return true;
  }
}
