import { Component, OnInit } from '@angular/core';
import { LoginService } from './../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";

  constructor(private login: LoginService) { }

  ngOnInit() {
  }

  loginHandle(){
    // console.log(this.username);
    this.login.login(this.username, this.password).subscribe((res: any) => {
      console.log(res);
    })
  }

}
