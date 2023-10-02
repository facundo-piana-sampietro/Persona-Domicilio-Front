import { Component , OnInit, Input} from '@angular/core';
import { User } from 'src/app/user';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private loginComponent:LoginComponent,
    private router:Router){}
  
  title = 'Bienvenido ' + sessionStorage.getItem('username');
  
  saludar(){
    this.router.navigateByUrl('/hello');
  }
  
  ngOnInit() {
  }

}
