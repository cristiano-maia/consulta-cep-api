import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ConsultaCepComponent } from './consulta-cep/consulta-cep.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    ConsultaCepComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // modulo para requisicao http
    FormsModule, 
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent, ConsultaCepComponent]
})
export class AppModule { }
