import { Component, OnInit} from '@angular/core';
import { PersonaDTO } from 'src/app/personaDTO';
import { PersonaService } from 'src/app/services/persona.service';
import { ResponsePersonaDTO } from 'src/app/responsePersonaDTO';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  id ='';
  orden : number = 1;
  errorMessage : string = '';
  loading : boolean = false;
  found: boolean = true;
  pages: number = 1;
  responsePersona = {} as ResponsePersonaDTO;
  personas : PersonaDTO[] = [];
  public submitted = false;
  deleteMessage:string = '';
  deleted : boolean = false;

  formId: FormGroup = this.formBuilder.group({
    id: ['', Validators.required]
  });

  formNombre: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required]
  });


  constructor(
    private personaService : PersonaService,
    private formBuilder: FormBuilder,
    private router: Router
    ){}


  ngOnInit() : void{
    this.filtrarTodos(this.orden);
  }

  filtrarTodos(orden : number){
    this.found = true;
    this.orden = orden;
    this.loading = true;
    this.errorMessage='';
    this.personaService.filtrarTodos(this.orden)
    .subscribe(
      data => { 
        this.responsePersona = data;
        this.personas = this.responsePersona.personas;
      },
      err =>{
        console.log('Error en el componente Persona | filtrarTodos',err);
        if (err.status == 403){
            this.errorMessage = 'El token expiró. Vuelva a iniciar sesión';
        }
        if (err.status == 400){
          this.errorMessage = 'No existen personas en la base de datos!';
        }
        this.loading = false;
      }
    ) 
  }
  
  buscarPorId () : void {
    this.deleted = false;
    this.loading = true; 
    this.errorMessage='';
    this.submitted = true;

    if (this.formId.invalid) {
      return;
    }

    this.personaService.filtrarPorId(this.formId.value['id'])
    .subscribe(
      (data) => { 
        this.found = true;
        this.responsePersona = data;
        console.log(this.responsePersona.personas);
        this.personas = this.responsePersona.personas;

        if (this.responsePersona.personas == null){
          this.errorMessage = this.responsePersona.message;
          this.found=false;
        } 

      },
      err =>{ 
        console.log('Error en el componente Persona | buscarPorId',err);
        this.errorMessage = 'Error a la hora de filtrar por id.';
        this.loading = false;
      }
      
    );
  }

  buscarPorNombre () : void {
    this.deleted = false;
    this.loading = true; 
    this.errorMessage='';
    this.submitted = true;

    if (this.formNombre.invalid) {
      return;
    }
    this.personaService.filtrarPorNombre(this.formNombre.value['nombre'])
    .subscribe(
      (data) => { 
        this.found = true;
        this.responsePersona = data;
        this.personas = this.responsePersona.personas;

        if (this.responsePersona.personas == null){
          this.errorMessage = this.responsePersona.message;
          this.found=false;
        } 

      },
      err =>{
        console.log('Error en el componente Persona | buscarPorNombre',err);
        this.errorMessage = 'Error a la hora de filtrar por nombre.';
        this.loading = false;
      }
      
    );
  }


  eliminarPersona(id : number) : void {
    this.loading = true; 
    this.errorMessage='';
    this.deleted = false;
    this.personaService.eliminarPersona(id).subscribe(
    (data) =>{ 
        this.found = true;
        this.responsePersona = data;
        this.deleteMessage = this.responsePersona.message;
        this.deleted=true;
        this.filtrarTodos(this.orden);

    },
      error => {
        console.log('Error en el componente Persona | eliminarPersona',error);
        this.errorMessage = 'Error a la hora de eliminar la persona.';
        this.loading = false;
      }
    ); 
  }

  personasSinDomicilio() : void {
    this.loading = true; 
    this.errorMessage='';
    this.deleted = false;

    this.personaService.personasSinDomicilio().subscribe(
      (data) =>{ 
          this.responsePersona = data;
          this.personas = this.responsePersona.personas;
      },
        error => {
          console.log('Error en el componente Persona | PersonasSinDomicilio',error);
          if (error.status == 400){
            this.errorMessage = 'No existen personas sin domicilio!';
          }
          this.loading = false;

        }
      ); 
  }

  modificarPersona(id : number){
    this.router.navigateByUrl('/modificarPersona/' + id);
  }

  verDomicilios(id : number){
    this.router.navigateByUrl('/verDomicilios/' + id);
  }

 
}
