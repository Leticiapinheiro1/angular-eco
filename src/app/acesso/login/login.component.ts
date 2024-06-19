import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcessosService } from '../acessos.service';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent  implements OnInit{
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/js/login.js';
    script.async = true;
    document.body.appendChild(script);
  }
}




