import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CrearPersonaService } from 'src/app/services/crear-persona.service'; 
import { ResponseDTO } from 'src/app/responseDTO';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

  response = {} as ResponseDTO;
  public loading = false;
  public submitted = false;
  public logFailed = false;
  public errorMessage : string = '';
  creado : string = '';

  form: FormGroup = this.formBuilder.group({
    dni: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required]

  });

  constructor(
    private formBuilder: FormBuilder,
    private crearPersonaService : CrearPersonaService,
    private route: ActivatedRoute,
    private router: Router,
    private app: AppComponent,
  ) { }

  ngOnInit() {
    
  }
  
  crearPersona(){
    this.submitted = true;
    this.errorMessage='';
    this.creado='';

    //Formulario invalido
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    
    this.crearPersonaService.crearPersona(this.form.controls['dni'].value, this.form.controls['nombre'].value, this.form.controls['apellido'].value)
    .subscribe(
      (data) =>{
        this.response = data;
        this.creado = this.response.message;
      },
      error=>{
        if (error.status == 403){
          this.errorMessage = 'El token expiró. Vuelva a iniciar sesión';
          console.log ('Error en el componente CrearPersona | crearPersona()', error);
          this.loading = false;
      }

      }

    )

  }

 

 
}
