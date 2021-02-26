import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../domainclasses';
import { CommonService } from '../../../services/common.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.css']
})
export class LoginInfoComponent implements OnInit {

  constructor(private userService: UserService, private commonService: CommonService, private router: Router) {
      this.userService.userSetEvent.subscribe( (u: User) => this.user = u);
   }
  user!: User | null;
  errorMessage = '';
  params = {
      email: '',
      password: ''
  }

  ngOnInit(): void {
    this.user = this.userService.User;
  }

  login() {
    this.userService.login(this.params.email, this.params.password).subscribe(
        (data) =>  this.userService.saveLoginData(data),
        err => this.errorMessage = this.commonService.getError(err)
    )
  }

  logout() {
      this.userService.logout().subscribe(
          () => {
            this.userService.clearUser();
            this.router.navigate(['']);
          }
      );      
  }

}
