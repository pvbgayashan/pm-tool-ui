import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isLoginPage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {

    this.router.events.subscribe(
      (event: RouterEvent) => {
        if (event.url !== undefined) {
          this.isLoginPage = event.url === '/';
        }
      }
    );

  }

  public onLogout() {
    this.router.navigate(['/']);
  }

}
