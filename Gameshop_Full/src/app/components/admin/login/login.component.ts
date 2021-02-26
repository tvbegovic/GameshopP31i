import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../domainclasses';
import { LoginResult } from '../../../modelclasses';
import { CommonService } from '../../../services/common.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, 
    private commonService: CommonService,
    private router: Router) { }

  errorMessage = '';
  params = {
      username: '',
      password: ''
  }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.params.username, this.params.password)
      .subscribe( 
        (l: LoginResult) => {
          this.userService.saveLoginData(l);
          this.router.navigate(['admin']);
        } ,
        err => this.errorMessage = this.commonService.getError(err)
      );    
  }

  checkShowValidationError(c: NgModel, f: NgForm) {
    return c.invalid && (c.dirty || c.touched || f.submitted)
  }

}
