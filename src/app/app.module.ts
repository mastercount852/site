import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { Painel01Component } from './components/painel01/painel01.component';
import { Painel02Component } from './components/painel02/painel02.component';
import { Painel03Component } from './components/painel03/painel03.component';
import { Painel04Component } from './components/painel04/painel04.component';
import { Painel00Component } from './components/painel00/painel00.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Painel05Component } from './components/painel05/painel05.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Painel01Component,
    Painel02Component,
    Painel03Component,
    Painel04Component,
    Painel00Component,
    NavbarComponent,
    Painel05Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
