import { Component, OnInit} from '@angular/core';
import { DomicilioDTO } from 'src/app/domicilioDTO';
import { DomicilioService } from 'src/app/services/domicilio.service';
import { ResponseDomicilioDTO } from 'src/app/responseDomicilioDTO';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.css']
})
export class DomicilioComponent implements OnInit {
  id ='';
  orden : number = 1;
  errorMessage : string = '';
  loading : boolean = false;
  found: boolean = true;
  pages: number = 1;
  responseDomicilio= {} as ResponseDomicilioDTO;
  domicilios : DomicilioDTO[] = [];
  public submitted = false;
  deleteMessage:string = '';
  deleted : boolean = false;

  formId: FormGroup = this.formBuilder.group({
    id: ['', Validators.required]
  });

  formCalleYAltura: FormGroup = this.formBuilder.group({
    calle: ['', Validators.required],
    altura: ['', Validators.required]
  });




  constructor(
    private domicilioService : DomicilioService,
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
    this.domicilioService.filtrarTodos(this.orden)
    .subscribe(
      data => { 
        console.log(this.responseDomicilio.domicilios);
        this.responseDomicilio = data;
        this.domicilios = this.responseDomicilio.domicilios;
      },
      err =>{
        console.log('Error en el componente Domicilio | filtrarTodos',err);
        if (err.status == 403){
            this.errorMessage = 'El token expiró. Vuelva a iniciar sesión';
        }
        if (err.status == 400){
          this.errorMessage = 'No existen domicilios en la base de datos!';
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

    this.domicilioService.filtrarPorId(this.formId.value['id'])
    .subscribe(
      (data) => { 
        this.found = true;
        this.responseDomicilio = data;
        console.log(this.responseDomicilio.domicilios);
        this.domicilios = this.responseDomicilio.domicilios;

        if (this.responseDomicilio.domicilios== null){
          this.errorMessage = this.responseDomicilio.message;
          this.found=false;
        } 

      },
      err =>{ 
        console.log('Error en el componente Domicilio | buscarPorId',err);
        this.errorMessage = 'Error a la hora de filtrar por id.';
        this.loading = false;
      }
      
    );
  }

  buscarPorCalleYAltura () : void {
    this.deleted = false;
    this.loading = true; 
    this.errorMessage='';
    this.submitted = true;

    if (this.formCalleYAltura.invalid) {
      return;
    }
    this.domicilioService.filtrarPorCalleYAltura(this.formCalleYAltura.value['calle'],this.formCalleYAltura.value['altura'])
    .subscribe(
      (data) => { 
        this.found = true;
        this.responseDomicilio= data;
        this.domicilios = this.responseDomicilio.domicilios;

        if (this.responseDomicilio.domicilios== null){
          this.errorMessage = this.responseDomicilio.message;
          this.found=false;
        } 

      },
      err =>{
        console.log('Error en el componente Domicilio | buscarPorCalleYAltura',err);
        this.errorMessage = 'Error a la hora de filtrar por calle y altura.';
        this.loading = false;
      }
      
    );
  }


  eliminarDomicilio(id : number) : void {
    this.loading = true; 
    this.errorMessage='';
    this.deleted = false;
    this.domicilioService.eliminarDomicilio(id).subscribe(
    (data) =>{ 
        this.found = true;
        this.responseDomicilio= data;
        this.deleteMessage = this.responseDomicilio.message;
        this.deleted=true;
        this.filtrarTodos(this.orden);

    },
      error => {
        console.log('Error en el componente Domicilio | eliminarDomicilio',error);
        this.errorMessage = 'Error a la hora de eliminar la domicilio.';
        this.loading = false;
      }
    ); 
  }

  domiciliosSinPersonas() : void {
    this.loading = true; 
    this.errorMessage='';
    this.deleted = false;

    this.domicilioService.domiciliosSinPersonas().subscribe(
      (data) =>{ 
          this.responseDomicilio= data;
          this.domicilios = this.responseDomicilio.domicilios;
      },
        error => {
          console.log('Error en el componente Domicilios | domiciliosSinPersona',error);
          if (error.status == 400){
            this.errorMessage = 'No existen domicilios sin personas!';
          }
          this.loading = false;

        }
      ); 
  }

  modificarDomicilio(id : number){
    this.router.navigateByUrl('/modificarDomicilio/' + id);
  }

  verPersonas(id : number){
    this.router.navigateByUrl('/verPersonas/' + id);
  }

 
}
