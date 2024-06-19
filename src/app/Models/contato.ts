enum Tipo {
  PessoaFisica = 1,
  Empresa = 2,
  Outros = 3
}

export class Contato {
  private name: string;
  private email: string;
  private telefone: string;
  private tipo: Tipo;
  private mensagem: string;

  // Construtor opcional para inicializar as propriedades, se necessário
  constructor(name: string, email: string, telefone: string, tipo: Tipo, mensagem: string) {
    this.name = name;
    this.email = email;
    this.telefone = telefone;
    this.tipo = tipo;
    this.mensagem = mensagem;
  }

  // Getter e Setter para 'name'
  public get Name(): string {
    return this.name;
  }

  public set Name(name: string) {
    this.name = name;
  }

  // Getter e Setter para 'Email'
  public get Email(): string {
    return this.email;
  }

  public set Email(email: string) {
    this.email = email;
  }

  // Getter e Setter para 'Telefone'
  public get Telefone(): string {
    return this.telefone;
  }

  public set Telefone(telefone: string) {
    this.telefone = telefone;
  }

  // Getter e Setter para 'Tipo'
  public get Tipo(): Tipo {
    return this.tipo;
  }

  public set Tipo(tipo: Tipo) {
    this.tipo = tipo;
  }

  // Getter e Setter para 'Mensagem'
  public get Mensagem(): string {
    return this.mensagem;
  }

  public set Mensagem(mensagem: string) {
    this.mensagem = mensagem;
  }
}