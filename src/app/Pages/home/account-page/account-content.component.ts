import { Component } from '@angular/core';
import { AccountService } from '../../../Services/account.service';
import Account from '../../../Models/account.model';


type AccountRes = "email" | "wallet" | "first_name" | "last_name";
@Component({
  selector: 'app-account-content',
  templateUrl: './account-content.component.html',
  styleUrl: './account-content.component.scss'
})
export class AccountContentComponent {

  account:Account = new Account();

  accountPros:{key:AccountRes,title:string,icon:string}[] = [
    {
      title:"Email",
      key:"email",
      icon:"money.png"
    },
    {
      title:"Email",
      key:"first_name",
      icon:"money.png"
    },
    {
      title:"Email",
      key:"last_name",
      icon:"money.png"
    },
    {
      title:"Email",
      key:"wallet",
      icon:"money.png"
    },

  ];

  constructor(private accountService:AccountService){
    this.accountService.account.subscribe(a=>{
      this.account = a;
    })
  }

}
