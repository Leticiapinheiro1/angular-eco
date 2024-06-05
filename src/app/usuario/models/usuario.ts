export class Usuario {
    private id: number;
    private pontuacao: number;
    private nome: string;
    private cpf: string;
    private data_nascimento: string;
    private email: string;
    private endereco: string;
    private senha: string;
    private quantidade_login: number;
    private telefone: string;

    constructor() {
        this.id = 0;
        this.pontuacao = 0;
        this.nome = "";
        this.cpf = "";
        this.data_nascimento = "";
        this.email = "";
        this.endereco = "";
        this.senha = "";
        this.quantidade_login = 0;
        this.telefone = "";
    }

    // Getters
    public getId(): number {
        return this.id;
    }

    public getPontuacao(): number {
        return this.pontuacao;
    }

    public getNome(): string {
        return this.nome;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public getDataNascimento(): string {
        return this.data_nascimento;
    }

    public getEmail(): string {
        return this.email;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public getSenha(): string {
        return this.senha;
    }

    public getQuantidadeLogin(): number {
        return this.quantidade_login;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    // Setters
    public setId(id: number): void {
        this.id = id;
    }

    public setPontuacao(pontuacao: number): void {
        this.pontuacao = pontuacao;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    public setDataNascimento(dataNascimento: string): void {
        this.data_nascimento = dataNascimento;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    public setSenha(senha: string): void {
        this.senha = senha;
    }

    public setQuantidadeLogin(quantidadeLogin: number): void {
        this.quantidade_login = quantidadeLogin;
    }

    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }
}
