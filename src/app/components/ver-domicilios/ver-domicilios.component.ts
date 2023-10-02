import { Component, OnInit} from '@angular/core';
import { DomicilioDTO } from 'src/app/domicilioDTO';
import { VerDomiciliosService } from 'src/app/services/ver-domicilios.service';
import { ResponseDomicilioDTO } from 'src/app/responseDomicilioDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseDTO } from 'src/app/responseDTO';

@Component({
  selector: 'app-ver-domicilios',
  templateUrl: './ver-domicilios.component.html',
  styleUrls: ['./ver-domicilios.component.css']
})
export class VerDomiciliosComponent implements OnInit {
  public idPersona : number = 0;
  public message : string = '';
  orden : number = 1;
  errorMessage : string = '';
  loading : boolean = false;
  noContent : boolean = false;
  pages: number = 1;
  responseDomicilio= {} as ResponseDomicilioDTO;
  domicilios : DomicilioDTO[] = [];
  response = {} as ResponseDTO;



  constructor(
    private verDomiciliosService : VerDomiciliosService,
    private route: ActivatedRoute,
    private router: Router
    ){}


  ngOnInit() : void{
    this.idPersona = Number(this.route.snapshot.paramMap.get('id'));
    this.filtrarDomicilios(this.idPersona, this.orden);
  }

  filtrarDomicilios(idPersona : number, orden : number){
    this.orden = orden;
    this.loading = true;
    this.noContent = false;
    this.errorMessage='';
    this.verDomiciliosService.filtrarDomiciliosPorPersona(idPersona, orden)
    .subscribe(
      data => { 
        console.log(this.responseDomicilio.domicilios);
        this.responseDomicilio = data;
        this.domicilios = this.responseDomicilio.domicilios;
      },
      err =>{
        console.log('Error en el componente VerDomicilios | filtrarDomiciliosPorPersona()',err);
        this.noContent= true;
        
        if (err.status == 403){
          this.errorMessage = 'El token venció. Por favor vuelva a iniciar sesión';
        }
        else{
          this.errorMessage = err.error.message;
        }
      }
    ) 
  }
  
  desasociacion(idPersona : number, idDomicilio : number){
    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    this.verDomiciliosService.desasociacion(idPersona, idDomicilio)
    .subscribe(
      (data) =>{
        this.response = data;

        this.filtrarDomicilios(idPersona, this.orden);


        if (this.response.tipoError == 'OK'){
          this.message = this.response.message;
          console.log (this.response);
        }
        
        
      
      },
      error=>{
        this.loading = false;
        if (error.status == 403){
          this.errorMessage = 'El token expiró. Vuelva a iniciar sesión';
          console.log ('Error en el componente VerDomicilios  | desasociacion()', error);
         
        }
        else if (error.status == 400){
          console.log ('Error en el componente VerDomicilios  | desasociacion()', error)
          this.errorMessage = error.error.message;
        }

      }

    )

  }

  asociacion(){
    this.router.navigateByUrl('/asociarDomicilios/' + this.idPersona);
  }

}

