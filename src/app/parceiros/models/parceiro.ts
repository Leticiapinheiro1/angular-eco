export class Parceiro {
    private id: number = 0;
	private cnpj:string  = "";
	private nome:string = "";
    private senha:string = "";
    private data_nascimento = "";
	private endereco:string = "";
	private telefone:string = "";
	private email:string = "";

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getCnpj(): string {
        return this.cnpj;
    }

    public setCnpj(cnpj: string): void {
        this.cnpj = cnpj;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getSenha(): string {
        return this.senha;
    }

    public setSenha(senha: string): void {
        this.senha = senha;
    }

    public getDataNascimento(): string {
        return this.data_nascimento;
    }
    public setDataNascimento(data_nascimento: string): void {
        this.data_nascimento = data_nascimento;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }
}

