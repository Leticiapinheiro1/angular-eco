import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup = this.fb.group({});
  messageBox: string = '';

  // Usando ViewChild para acessar os elementos do DOM
  @ViewChild('senhaInput') senhaInput!: ElementRef;
  @ViewChild('confirmarSenhaInput') confirmarSenhaInput!: ElementRef;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      tipoCliente: ['usuario', Validators.required],
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      enderecoCompleto: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      nomeEmpresa: ['', this.validateParceiro('parceiro')],
      cnpj: ['', this.validateParceiro('parceiro')],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  validateParceiro(tipoCliente: string) {
    return (control: any) => {
      if (this.cadastroForm && this.cadastroForm.get('tipoCliente')?.value === tipoCliente) {
        return Validators.required(control);
      }
      return null;
    };
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const senha = formGroup.get('senha');
    const confirmarSenha = formGroup.get('confirmarSenha');
    if (senha && confirmarSenha && senha.value !== confirmarSenha.value) {
      confirmarSenha.setErrors({ mismatch: true });
    } else {
      // confirmarSenha.setErrors({mismatch: true});
    }
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      // Processamento do formulário
      console.log(this.cadastroForm.value);
      this.messageBox = 'Cadastro realizado com sucesso!';
    } else {
      this.messageBox = 'Por favor, preencha todos os campos obrigatórios.';
    }
  }

  toggleSenhaVisibility() {
    // Usando ViewChild para acessar os elementos do DOM
    if (this.senhaInput) {
      const input = this.senhaInput.nativeElement as HTMLInputElement;
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  }

  toggleConfirmarSenhaVisibility() {
    // Usando ViewChild para acessar os elementos do DOM
    if (this.confirmarSenhaInput) {
      const input = this.confirmarSenhaInput.nativeElement as HTMLInputElement;
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  }

  buscarEnderecoPorCEP() {
    // Função para buscar endereço pelo CEP
    const cep = this.cadastroForm.get('cep')?.value;
    if (cep) {
      // Simulação de busca de endereço
      this.cadastroForm.patchValue({
        enderecoCompleto: 'Rua Exemplo, 123, Bairro, Cidade, UF'
      });
    }
  }
}