import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { HelloComponent } from './components/hello/hello.component';
import { PersonaComponent } from './components/persona/persona.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CrearPersonaComponent } from './components/crear-persona/crear-persona.component';
import { ModificarPersonaComponent } from './components/modificar-persona/modificar-persona.component';
import { DomicilioComponent } from './components/domicilio/domicilio.component';
import { CrearDomicilioComponent } from './components/crear-domicilio/crear-domicilio.component';
import { ModificarDomicilioComponent } from './components/modificar-domicilio/modificar-domicilio.component';
import { CommonModule } from '@angular/common';
import { VerDomiciliosComponent } from './components/ver-domicilios/ver-domicilios.component';
import { VerPersonasComponent } from './components/ver-personas/ver-personas.component';
import { AsociarPersonasComponent } from './components/asociar-personas/asociar-personas.component';
import { AsociarDomiciliosComponent } from './components/asociar-domicilios/asociar-domicilios.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    HelloComponent,
    PersonaComponent,
    CrearPersonaComponent,
    ModificarPersonaComponent,
    DomicilioComponent,
    CrearDomicilioComponent,
    ModificarDomicilioComponent,
    VerDomiciliosComponent,
    VerPersonasComponent,
    AsociarPersonasComponent,
    AsociarDomiciliosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    CommonModule
  ],
  providers: [LoginService, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
