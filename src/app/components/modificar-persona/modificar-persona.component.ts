import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { PersonaDTO } from '../../personaDTO';
import { ResponsePersonaDTO} from '../../responsePersonaDTO';
import { ModificarPersonaService } from '../../services/modificar-persona.service';

@Component({
  selector: 'app-modificar-persona',
  templateUrl: './modificar-persona.component.html',
  styleUrls: ['./modificar-persona.component.css']
})
export class ModificarPersonaComponent implements OnInit {

  persona = {} as PersonaDTO;
  responsePersona = {} as ResponsePersonaDTO;
  public loading = false;
  public submitted = false;
  public logFailed = false;
  public errorMessage : string = '';
  public id : number = 0;
  modificado : string = '';


  form: FormGroup = this.formBuilder.group({
    dni: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required]

  });


  constructor(
    private formBuilder: FormBuilder,
    private modificarPersonaService : ModificarPersonaService,
    private route: ActivatedRoute,
    private router: Router,
    private app: AppComponent,
  ) { }



  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.buscarPorId(this.id);
  }

  buscarPorId (id : number) : void {

 
    this.errorMessage='';

    this.loading = true; 
    this.submitted = true;
    console.log('entre');
    this.modificarPersonaService.filtrarPorId(id)
    .subscribe(
      (data) => { 
        this.responsePersona = data;
        console.log(this.responsePersona.personas);
        this.persona = this.responsePersona.personas[0];
        this.form.patchValue({
          dni: this.persona.dni,
          nombre: this.persona.nombre,
          apellido: this.persona.apellido
      });
        

        if (this.responsePersona.personas == null){
          this.errorMessage = this.responsePersona.message;
        } 

      },
      err =>{ 
        console.log('Error en el componente ModificarPersona | buscarPorId',err);
        this.loading = false;
        if (err.status = 403) this.errorMessage = 'El token expiró. Vuelva a iniciar sesión.';
        else this.errorMessage = 'Error a la hora de filtrar por id.'; 
        
      }
      
    );
  }

  modificarPersona(){
    this.submitted = true;
    this.errorMessage='';
    this.modificado='';

    //Formulario invalido
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    
    this.modificarPersonaService.modificarPersona(this.id, this.form.controls['dni'].value, this.form.controls['nombre'].value, this.form.controls['apellido'].value)
    .subscribe(
      (data) =>{
        this.responsePersona = data;
        this.modificado = this.responsePersona.message;
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