import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import {HomeComponent} from './acesso/home/home.component'
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { PegadaComponent } from './pegada/pegada.component';
import { ContatoComponent } from './contato/contato.component';
import { LegislacaoComponent } from './legislacao/legislacao.component';
import { EcoVoucherSobreComponent } from './eco-voucher-sobre/eco-voucher-sobre.component';
import { PontuacaoComponent } from './pontuacao/pontuacao.component';
import { OdsComponent } from './ods/ods.component';
import { PontosColetaComponent } from './pontos-coleta/pontos-coleta.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'pegada', component: PegadaComponent, canActivate: [AuthGuard] },
  { path: 'contato', component: ContatoComponent },
  { path: 'legislacao', component: LegislacaoComponent },
  { path: 'ecoVoucher-sobre', component: EcoVoucherSobreComponent },
  { path: 'pontuacao', component: PontuacaoComponent, canActivate: [AuthGuard] },
  { path: 'ods', component: OdsComponent  },
  { path: 'pontos-coleta', component: PontosColetaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
