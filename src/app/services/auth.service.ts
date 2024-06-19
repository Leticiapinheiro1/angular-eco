import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Método que verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    // Aqui você deve implementar a lógica para verificar se o usuário está autenticado
    // Pode ser checar um token armazenado ou algum estado de sessão.
    return !!localStorage.getItem('authToken'); // Exemplo simples
  }

  // Método para fazer login
  login(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Método para fazer logout
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
