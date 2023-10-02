import { Component, OnInit } from '@angular/core';
import { HelloService } from 'src/app/services/hello.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  errorMessage : string = '';
  loading : boolean = false;
  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
  });

  name : string = '';

  constructor(
    private helloService: HelloService,
    private formBuilder: FormBuilder,
    private router: Router,
  ){}
  ngOnInit() {
    
  }

  async saludar(){
    this.errorMessage = '';
    this.loading = true;
    await this.helloService.saludar(this.form.controls['name'].value)
    .subscribe(
      (data) => { 
      this.name = data;
      },
      err =>{
        console.log('Error en el componente Hello',err)
        if (err.status == 403){
          this.errorMessage = 'El token expiró. Vuelva a iniciar sesión'
        }
        this.loading = false;
      }
    ) 
    console.log(this.errorMessage);
  }


}
