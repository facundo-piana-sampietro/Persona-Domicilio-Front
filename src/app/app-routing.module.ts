import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HelloComponent } from './components/hello/hello.component';
import { PersonaComponent } from './components/persona/persona.component';
import { CrearPersonaComponent } from './components/crear-persona/crear-persona.component';
import { ModificarPersonaComponent } from './components/modificar-persona/modificar-persona.component';
import { DomicilioComponent } from './components/domicilio/domicilio.component';
import { CrearDomicilioComponent } from './components/crear-domicilio/crear-domicilio.component';
import { ModificarDomicilioComponent } from './components/modificar-domicilio/modificar-domicilio.component';
import { VerDomiciliosComponent } from './components/ver-domicilios/ver-domicilios.component';
import { VerPersonasComponent } from './components/ver-personas/ver-personas.component';
import { AsociarPersonasComponent } from './components/asociar-personas/asociar-personas.component';
import { AsociarDomiciliosComponent } from './components/asociar-domicilios/asociar-domicilios.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home' , component: HomeComponent},
  { path: 'hello' , component: HelloComponent},
  { path: 'persona' , component: PersonaComponent},
  { path: 'crearPersona' , component: CrearPersonaComponent},
  { path: 'modificarPersona/:id' , component: ModificarPersonaComponent},
  {path: 'domicilios' , component: DomicilioComponent},
  {path: 'crearDomicilio' , component: CrearDomicilioComponent},
  {path: 'modificarDomicilio/:id' , component: ModificarDomicilioComponent},
  {path: 'verDomicilios/:id' , component: VerDomiciliosComponent},
  {path: 'verPersonas/:id' , component: VerPersonasComponent},
  {path: 'asociarPersonas/:id' , component: AsociarPersonasComponent},
  {path: 'asociarDomicilios/:id' , component: AsociarDomiciliosComponent}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
