import { Component } from '@angular/core';
import { AccountService } from '../../../Services/account.service';
import Account from '../../../Models/account.model';

@Component({
  selector: 'app-account-content',
  templateUrl: './account-content.component.html',
  styleUrl: './account-content.component.scss'
})
export class AccountContentComponent {

  account:Account = new Account();

  constructor(private accountService:AccountService){
    this.accountService.account.subscribe(a=>{
      this.account = a;
    })
  }

}
