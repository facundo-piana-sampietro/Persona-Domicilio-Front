import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CrearDomicilioService } from 'src/app/services/crear-domicilio.service'; 
import { ResponseDTO } from 'src/app/responseDTO';


@Component({
  selector: 'app-crear-domicilio',
  templateUrl: './crear-domicilio.component.html',
  styleUrls: ['./crear-domicilio.component.css']
})


export class CrearDomicilioComponent implements OnInit {

  response = {} as ResponseDTO;
  public loading = false;
  public submitted = false;
  public logFailed = false;
  public errorMessage : string = '';
  creado : string = '';

  form: FormGroup = this.formBuilder.group({
    calle: ['', Validators.required],
    altura: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private crearDomicilioService : CrearDomicilioService,
    private route: ActivatedRoute,
    private router: Router,
    private app: AppComponent,
  ) { }

  ngOnInit() {
    
  }
  
  crearDomicilio(){
    this.submitted = true;
    this.errorMessage='';
    this.creado='';

    //Formulario invalido
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    
    this.crearDomicilioService.crearDomicilio(this.form.controls['calle'].value, this.form.controls['altura'].value)
    .subscribe(
      (data) =>{
        this.response = data;
        this.creado = this.response.message;
      },
      error=>{
        if (error.status == 403){
          this.errorMessage = 'El token expiró. Vuelva a iniciar sesión';
          console.log ('Error en el componente CrearDomicilio | crearDomicilio()', error);
          this.loading = false;
      }
      }
    )
  }
}
