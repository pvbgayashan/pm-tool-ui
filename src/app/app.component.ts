import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { CommonService } from './service/common.service';
import { LoggedUser } from './dtd/logged-user-dtd';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public isLoginPage: boolean = false;
  public loggedUserName: string;

  private getLoggedUserSubscription: Subscription;

  constructor(private router: Router,
              private commonService: CommonService) {}

  ngOnInit() {

    // validate for login page
    this.router.events.subscribe(
      (event: RouterEvent) => {
        if (event.url !== undefined) {
          this.isLoginPage = event.url === '/';
        }
      }
    );

    // set logged user name
    this.getLoggedUserSubscription = this.commonService.getLoggedUser().subscribe(
      (response) => {
        if (response) {
          this.loggedUserName = (response as LoggedUser).userName;
        }
      },
      (error: Error) => {
        console.log(error);
      }
    );

  }

  public onLogout() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {

    if (this.getLoggedUserSubscription) {
      this.getLoggedUserSubscription.unsubscribe();
    }

  }

}
