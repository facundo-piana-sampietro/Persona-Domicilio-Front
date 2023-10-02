import { Component, OnInit} from '@angular/core';
import { DomicilioDTO } from 'src/app/domicilioDTO';
import { AsociarDomiciliosService } from 'src/app/services/asociar-domicilios.service';
import { ResponseDomicilioDTO } from 'src/app/responseDomicilioDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseDTO } from 'src/app/responseDTO';

@Component({
  selector: 'app-asociar-domicilios',
  templateUrl: './asociar-domicilios.component.html',
  styleUrls: ['./asociar-domicilios.component.css']
})
export class AsociarDomiciliosComponent implements OnInit {
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
    private asociarDomiciliosService : AsociarDomiciliosService,
    private route: ActivatedRoute,
    private router: Router
    ){}


  ngOnInit() : void{
    this.idPersona = Number(this.route.snapshot.paramMap.get('id'));
    this.filtrarTodos(this.orden);
  }

  filtrarTodos(orden : number){
    this.orden = orden;
    this.loading = true;
    this.noContent = false;
    this.errorMessage='';
    this.asociarDomiciliosService.filtrarTodos(orden)
    .subscribe(
      data => { 
        console.log(this.responseDomicilio.domicilios);
        this.responseDomicilio = data;
        this.domicilios = this.responseDomicilio.domicilios;
      },
      err =>{
        console.log('Error en el componente AsociarDomicilios | filtrarTodos()',err);
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
  
  asociacion(idPersona : number, idDomicilio : number){
    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    this.asociarDomiciliosService.asociacion(idPersona, idDomicilio)
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
          console.log ('Error en el componente AsociarDomicilios  | asociacion()', error);
         
        }
        else if (error.status == 400){
          console.log ('Error en el componente AsociarDomicilios  | asociacion()', error)
          this.errorMessage = error.error.message;
        }

      }

    )

  }

}
