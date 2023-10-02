import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/services/login.service';
import {User} from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  user : User = {
    username: "",
    password: "",
    token: ""
  }
 

  public loading = false;
  public submitted = false;
  public logFailed = false;

  constructor(
    private loginService : LoginService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private app: AppComponent,
  ) { }

  ngOnInit() {
    
  }

  onSubmit() {
      this.submitted = true;

      //Formulario invalido
      if (this.form.invalid) {
          return;
      }
      this.loading = true;
      this.login(this.form.controls['username'].value, this.form.controls['password'].value);  
  }
  
  //Llamada al LoginService
  login(username: string, password:string){
   this.loginService.login(username, password)
   .subscribe(
    (data : any) : void => {
    this.user.username = data.user;
    this.user.password = data.password;
    this.user.token = data.token;
    sessionStorage.setItem('username', this.user.username);
    sessionStorage.setItem('password', this.user.password);
    sessionStorage.setItem('token', this.user.token);
    this.router.navigateByUrl('/home');

  },
   err => {
      if (err.status >= 400) {
        this.logFailed=true;
      }
    });

  this.loading = false;
  }
}
