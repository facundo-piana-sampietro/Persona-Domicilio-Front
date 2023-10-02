import { Component, OnInit} from '@angular/core';
import { PersonaDTO } from 'src/app/personaDTO';
import { AsociarPersonasService } from 'src/app/services/asociar-personas.service';
import { ResponsePersonaDTO } from 'src/app/responsePersonaDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseDTO } from 'src/app/responseDTO';

@Component({
  selector: 'app-asociar-domicilios',
  templateUrl: './asociar-personas.component.html',
  styleUrls: ['./asociar-personas.component.css']
})
export class AsociarPersonasComponent implements OnInit {
  public idDomicilio : number = 0;
  public message : string = '';
  orden : number = 1;
  errorMessage : string = '';
  loading : boolean = false;
  noContent : boolean = false;
  pages: number = 1;
  responsePersona= {} as ResponsePersonaDTO;
  personas: PersonaDTO[] = [];
  response = {} as ResponseDTO;



  constructor(
    private asociarPersonasService : AsociarPersonasService,
    private route: ActivatedRoute,
    private router: Router
    ){}


  ngOnInit() : void{
    this.idDomicilio = Number(this.route.snapshot.paramMap.get('id'));
    this.filtrarTodos(this.orden);
  }

  filtrarTodos(orden:number){
    this.orden = orden;
    this.loading = true;
    this.noContent = false;
    this.errorMessage='';
    this.asociarPersonasService.filtrarTodos(orden)
    .subscribe(
      data => { 
        console.log(this.responsePersona.personas);
        this.responsePersona = data;
        this.personas= this.responsePersona.personas;
      },
      err =>{
        console.log('Error en el componente AsociarPersonas| filtrarTodos()',err);
        this.noContent= true;
        if (err.status = 403) this.errorMessage = 'El token expiró. Vuelva a iniciar sesión.';
        else this.errorMessage = err.error.message;
      }
    ) 
  }
  
  asociacion(idPersona : number, idDomicilio : number){
    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    this.asociarPersonasService.asociacion(idPersona, idDomicilio)
    .subscribe(
      (data) =>{
        this.response = data;

        if (this.response.tipoError == 'OK'){
          this.message = this.response.message;
          
          console.log (this.response);
        }      
      },
      error=>{
        this.loading = false;
        if (error.status == 403){
          this.errorMessage = 'El token expiró. Vuelva a iniciar sesión';
          console.log ('Error en el componente AsociarPersonas | asociacion()', error);
         
        }
        else if (error.status == 400){
          console.log ('Error en el componente AsociarPersonas | asociacion()', error)
          this.errorMessage = error.error.message;
        }

      }

    )

  }
}
