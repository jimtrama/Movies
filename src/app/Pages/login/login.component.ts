import { Component } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { ErrorService } from '../../Services/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  errorMessage:string = "";

  constructor(
    private accountService: AccountService,
    private errorService: ErrorService
  ) {
    this.errorService.listen.subscribe((error) => {
      if (["detail","username","password"].includes(error.key)) {
        this.errorMessage = error.desc[0];
      }
    });
  }

  loadingSub:Subscription = { } as Subscription;

  login() {
    const username = (<HTMLInputElement>document.getElementById('username'))
      .value;
    const password = (<HTMLInputElement>document.getElementById('password'))
      .value;
    this.loadingSub = this.accountService.login(username, password);
  }
}
