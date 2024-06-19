import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { HomeComponent } from './acesso/home/home.component';
import { PegadaComponent } from './pegada/pegada.component';
import { FooterComponent } from './templates/footer/footer.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { ContatoComponent } from './contato/contato.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LegislacaoComponent } from './legislacao/legislacao.component';
import { EcoVoucherSobreComponent } from './eco-voucher-sobre/eco-voucher-sobre.component';
import { OdsComponent } from './ods/ods.component';
import { PontosColetaComponent } from './pontos-coleta/pontos-coleta.component';
import { PontuacaoComponent } from './pontuacao/pontuacao.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PegadaComponent,
    FooterComponent,
    NavbarComponent,
    ContatoComponent,
    LegislacaoComponent,
    EcoVoucherSobreComponent,
    OdsComponent,
    PontosColetaComponent,
    PontuacaoComponent,
    OdsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule, // Adicione esta linha // Certifique-se de que isso está incluído
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

