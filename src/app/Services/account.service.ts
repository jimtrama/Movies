import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_ROUTE, GET_PROFILE, LOGIN_ENDPOINT } from '../api/api.constants';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import Account from '../Models/account.model';
import { BehaviorSubject, Observable } from 'rxjs';

const ID_KEY = "id";
const ACCOUNT_KEY = "account"

@Injectable()
export class AccountService {

    public loggedIn:boolean = false;
    public key:string = "";
    public refreshLink:string = ""
    public errorMessage = "";

    public account:BehaviorSubject<Account> = new BehaviorSubject({} as Account);
    public account$:Observable<Account> = this.account.asObservable();


    constructor(private http:HttpClient,private router:Router,private errorService:ErrorService) { 
        const creds = localStorage.getItem(ID_KEY);
        if(!!creds){
            const creds_json = JSON.parse(creds);
            this.key = creds_json.access;
            this.refreshLink = creds_json.refresh;
        }
        const account = localStorage.getItem(ACCOUNT_KEY);
        if(!!account){
            this.account.next(JSON.parse(account) as Account)
        }
    }


    login(username:string,password:string){
        this.http.post(API_BASE_ROUTE+LOGIN_ENDPOINT,{username,password})
        .subscribe((res:any)=>{
            if(!!res.access){
                this.key = res.access;
                this.fetchAccount();
                localStorage.setItem(ID_KEY,JSON.stringify({"access":this.key,"refresh":res.refresh}));
                this.router.navigate(["home/main"])
            }
            
        })
    }

    logout(){
        this.key = "";
        this.refreshLink = "";
        localStorage.setItem(ID_KEY,this.key);
        localStorage.setItem(ACCOUNT_KEY,"");
        this.router.navigate(["login"])
    }

    refreshAccount(){
        this.fetchAccount();
    }

    updateKey(key:string){
        this.key = key;
        localStorage.setItem(ID_KEY,JSON.stringify({refresh:this.refreshLink,access:key}))
    }

    private fetchAccount(){
        this.http.get(API_BASE_ROUTE+GET_PROFILE)
                .subscribe((res)=>{
                    this.account.next(res as Account)
                    localStorage.setItem(ACCOUNT_KEY,JSON.stringify(res));
                })
    }

    
}