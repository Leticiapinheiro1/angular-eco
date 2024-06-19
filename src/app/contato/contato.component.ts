import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ContatoService } from '../services/contato.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { setCookie, getCookie, deleteCookie } from '../utils/cookie-utils'; // Importar as funções utilitárias
import { Contato } from '../Models/contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  contatoForm: FormGroup;
  editForm: FormGroup;
  contatos: any[] = []; // Array para armazenar os contatos
  selectedContato: any; // Contato selecionado para edição

@ViewChild('modalEditarContato', { static: true }) modalEditarContato!: ElementRef;

  constructor(private fb: FormBuilder, private contatoService: ContatoService, private modalService: NgbModal) {
    this.contatoForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, this.telefoneValidator]],
      tipo: ['', Validators.required],
      mensagem: ['', [Validators.required, Validators.maxLength(300)]]
    });

    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, this.telefoneValidator]],
      mensagem: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  ngOnInit(): void {
    this.loadContatosFromCookies();
  }

  telefoneValidator(control: FormControl): { [key: string]: any } | null {
    var telefone = control.value;
    if (!telefone) {
      return { telefoneInvalido: true };
    }
    telefone = telefone.replace(" ", '');
    const regex = /^\(\d{2}\)\d{4,5}-\d{4}$/;
    return regex.test(telefone) ? null : { telefoneInvalido: true };
  }

  onSubmit() {
    if (this.contatoForm.valid) {
      const dados = this.contatoForm.value;
      var contato: Contato = new Contato(dados.name, dados.email, dados.telefone, dados.tipo, dados.mensagem);
      this.contatoService.enviarContato(contato).subscribe(
        response => {
          alert('Mensagem enviada com sucesso!');
          this.contatoForm.reset();
          this.saveContatoToCookies(response.id_contato, dados); // Salvar no cookie
          this.loadContatosFromCookies(); // Recarregar contatos do cookie
        },
        error => {
          console.error('Erro ao enviar a mensagem:', error);
          alert('Erro ao enviar a mensagem. Por favor, tente novamente mais tarde.');
        }
      );
    }
  }

  loadContatosFromCookies() {
    this.contatos = [];
    const cookiePrefix = 'contato_';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(cookiePrefix)) {
        const id_contato = cookie.split('=')[0].split('_')[1];
        const contatoData = getCookie(`${cookiePrefix}${id_contato}`);
        if (contatoData) {
          this.contatos.push(JSON.parse(contatoData));
        }
      }
    }
  }

  saveContatoToCookies(id: number, dados: any) {
    setCookie(`contato_${id}`, JSON.stringify(dados), 1); // Salvar por 1 hora
  }

  deleteContatoFromCookies(id: number) {
    deleteCookie(`contato_${id}`);
  }

  openEditModal(contato: any): String {
    
    console.log(this.modalService);
    this.modalService.open(this.modalEditarContato);
    return '1';
    this.selectedContato = contato;
    this.editForm.patchValue(contato); // Preencher o formulário com os dados do contato selecionado
    this.modalService.open(this.modalEditarContato, { centered: true });
  }

  onEditSubmit() {
    if (this.editForm.valid) {
      const updatedContato = { ...this.selectedContato, ...this.editForm.value };
      this.contatoService.editarContato(updatedContato.id, updatedContato).subscribe(
        response => {
          alert('Contato atualizado com sucesso!');
          this.saveContatoToCookies(updatedContato.id, updatedContato); // Atualizar no cookie
          this.loadContatosFromCookies(); // Recarregar a lista de contatos do cookie
          this.modalService.dismissAll(); // Fechar o modal
        },
        error => {
          console.error('Erro ao atualizar o contato:', error);
          alert('Erro ao atualizar o contato. Por favor, tente novamente mais tarde.');
        }
      );
    }
  }
}