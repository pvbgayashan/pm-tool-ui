import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { LoginUser } from '../dtd/login-user-dtd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginEmail: string = '';
  public loginPassword: string = '';

  public isInvalidCredentials: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private commonService: CommonService) {}

  ngOnInit() {}

  public onLogin() {

    if (this.loginEmail && this.loginPassword) {

      let loginUser: LoginUser = new LoginUser();
      loginUser.email = this.loginEmail;
      loginUser.password = this.loginPassword;

      this.commonService.authenticateUser(loginUser).subscribe(
        (response) => {
          if (response) {
            localStorage.setItem('logged-user', JSON.stringify(response));
            this.commonService.setLoggedUser(response);
            this.isInvalidCredentials = false;
            this.router.navigate(['projects', {relativeTo: this.activatedRoute}]);
          } else {
            this.invalidate();
          }
        },
        (error: Error) => {
          console.log(error);
          this.invalidate();
        }
      );

    } else {
      this.invalidate();
    }

  }

  private invalidate() {
    this.loginEmail = '';
    this.loginPassword = '';
    this.isInvalidCredentials = true;
  }

}
