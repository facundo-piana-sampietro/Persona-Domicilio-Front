import { Component, OnInit} from '@angular/core';
import { PersonaDTO } from 'src/app/personaDTO';
import { VerPersonasService } from 'src/app/services/ver-personas.service';
import { ResponsePersonaDTO } from 'src/app/responsePersonaDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseDTO } from 'src/app/responseDTO';

@Component({
  selector: 'app-ver-domicilios',
  templateUrl: './ver-personas.component.html',
  styleUrls: ['./ver-personas.component.css']
})
export class VerPersonasComponent implements OnInit {
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
    private verPersonasService : VerPersonasService,
    private route: ActivatedRoute,
    private router: Router
    ){}


  ngOnInit() : void{
    this.idDomicilio = Number(this.route.snapshot.paramMap.get('id'));
    this.filtrarPersonas(this.idDomicilio, this.orden);
  }

  filtrarPersonas(idDomicilio : number, orden : number){
    this.orden = orden;
    this.loading = true;
    this.noContent = false;
    this.errorMessage='';
    this.verPersonasService.filtrarPersonasPorDomicilio(idDomicilio, orden)
    .subscribe(
      data => { 
        console.log(this.responsePersona.personas);
        this.responsePersona = data;
        this.personas= this.responsePersona.personas;
      },
      err =>{
        console.log('Error en el componente VerPersonas| filtrarPersonasPorDomicilio()',err);
        this.noContent= true;
        if (err.status == 403) this.errorMessage = 'El token expiró. Vuelva a iniciar sesión.';
        else this.errorMessage = err.error.message;
      }
    ) 
  }
  
  desasociacion(idPersona : number, idDomicilio : number){
    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    this.verPersonasService.desasociacion(idPersona, idDomicilio)
    .subscribe(
      (data) =>{
        this.response = data;

        if (this.response.tipoError == 'OK'){
          this.message = this.response.message;
          
          console.log (this.response);
        }
        
        this.filtrarPersonas(this.idDomicilio, this.orden);
        
      
      },
      error=>{
        this.loading = false;
        if (error.status == 403){
          this.errorMessage = 'El token expiró. Vuelva a iniciar sesión';
          console.log ('Error en el componente VerPersonas  | desasociacion()', error);
         
        }
        else if (error.status == 400){
          console.log ('Error en el componente VerPersonas | desasociacion()', error)
          this.errorMessage = error.error.message;
        }

      }

    )

  }

  asociacion(){
    this.router.navigateByUrl('/asociarPersonas/' + this.idDomicilio);
  }
}


