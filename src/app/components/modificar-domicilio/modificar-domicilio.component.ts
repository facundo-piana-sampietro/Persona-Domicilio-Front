import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DomicilioDTO } from 'src/app/domicilioDTO';
import { ResponseDomicilioDTO } from 'src/app/responseDomicilioDTO';
import { ModificarDomicilioService } from 'src/app/services/modificar-domicilio.service';

@Component({
  selector: 'app-modificar-domicilio',
  templateUrl: './modificar-domicilio.component.html',
  styleUrls: ['./modificar-domicilio.component.css']
})
export class ModificarDomicilioComponent implements OnInit {

  domicilio = {} as DomicilioDTO;
  responseDomicilio= {} as ResponseDomicilioDTO;
  public loading = false;
  public submitted = false;
  public logFailed = false;
  public errorMessage : string = '';
  public id : number = 0;
  modificado : string = '';


  form: FormGroup = this.formBuilder.group({
    calle: ['', Validators.required],
    altura: ['', Validators.required]
  });


  constructor(
    private formBuilder: FormBuilder,
    private modificarDomicilioService : ModificarDomicilioService,
    private route: ActivatedRoute,
    private router: Router,
    private app: AppComponent,
  ) { }



  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.buscarPorId(this.id);
  }

  buscarPorId (id : number) : void {
    this.loading = true; 
    this.errorMessage='';
    this.submitted = true;

    this.modificarDomicilioService.filtrarPorId(id)
    .subscribe(
      (data) => { 
        this.responseDomicilio = data;
        console.log(this.responseDomicilio.domicilios);
        this.domicilio = this.responseDomicilio.domicilios[0];

        this.form.patchValue({
          calle: this.domicilio.calle,
          altura: this.domicilio.altura
          
        });

      },
      err =>{ 
        console.log('Error en el componente Domicilio | buscarPorId',err);
        this.loading = false;
        if (err.status = 403) this.errorMessage = 'El token expiró. Vuelva a iniciar sesión.';
        else this.errorMessage = 'Error a la hora de filtrar por id.'; 
      }
      
    );
  }

  modificarDomicilio(){
    this.submitted = true;
    this.errorMessage='';
    this.modificado='';

    //Formulario invalido
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    
    this.modificarDomicilioService.modificarDomicilio(this.id, this.form.controls['calle'].value, this.form.controls['altura'].value)
    .subscribe(
      (data) =>{
        this.responseDomicilio = data;
        this.modificado = this.responseDomicilio.message;
      },
      error=>{
        if (error.status == 403){
          this.errorMessage = 'El token expiró. Vuelva a iniciar sesión';
          console.log ('Error en el componente ModificarDomicilio | modificarDomicilio()', error);
          this.loading = false;
      }

      }

    )
  }
}
