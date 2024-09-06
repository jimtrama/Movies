import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    CREATE_MOVIE_ENDPOINT,
    GET_PROFILE,
    LOGIN_ENDPOINT,
} from '../api/api.constants';
import { Router } from '@angular/router';
import Account from '../Models/account.model';
import { BehaviorSubject, noop, Observable } from 'rxjs';

const ID_KEY = 'id';
const ACCOUNT_KEY = 'account';
const ADMIN_KEY = 'account_type';

@Injectable()
export class AccountService {
    public loggedIn: boolean = false;
    public key: string = '';
    public refreshLink: string = '';
    public errorMessage = '';

    public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public isAdmin$: Observable<boolean> = this.isAdmin.asObservable();

    public account: BehaviorSubject<Account> = new BehaviorSubject(
        {} as Account
    );
    public account$: Observable<Account> = this.account.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        const creds = localStorage.getItem(ID_KEY);
        if (!!creds) {
            const creds_json = JSON.parse(creds);
            this.key = creds_json.access;
            this.refreshLink = creds_json.refresh;
        }

        const account = localStorage.getItem(ACCOUNT_KEY);
        if (!!account) {
            this.account.next(JSON.parse(account) as Account);
        }

        const accountType = localStorage.getItem(ADMIN_KEY);
        if (!!accountType) {
            this.isAdmin.next(accountType === "true");
        }
    }

    login(username: string, password: string) {
        this.http
            .post(LOGIN_ENDPOINT, { username, password })
            .subscribe((res: any) => {
                if (!!res.access) {
                    this.key = res.access;
                    this.fetchAccount();
                    localStorage.setItem(
                        ID_KEY,
                        JSON.stringify({
                            access: this.key,
                            refresh: res.refresh,
                        })
                    );
                    this.checkAccountType();
                    this.router.navigate(['home', 'main']);
                }
            });
    }

    logout() {
        this.key = '';
        this.refreshLink = '';
        localStorage.setItem(ID_KEY, this.key);
        localStorage.setItem(ACCOUNT_KEY, '');
        this.router.navigate(['login']);
    }

    refreshAccount() {
        this.fetchAccount();
    }

    updateKey(key: string) {
        this.key = key;
        localStorage.setItem(
            ID_KEY,
            JSON.stringify({ refresh: this.refreshLink, access: key })
        );
    }

    private fetchAccount() {
        this.http.get(GET_PROFILE).subscribe((res) => {
            this.account.next(res as Account);
            localStorage.setItem(ACCOUNT_KEY, JSON.stringify(res));
        });
    }

    private checkAccountType() {
        this.http.post(CREATE_MOVIE_ENDPOINT, {}).subscribe(noop, (err) => {
            if (
                err.error.detail ===
                'You do not have permission to perform this action.'
            ) {
                this.isAdmin.next(false);
                localStorage.setItem(ADMIN_KEY,"false");
            } else if (err.error.title[0] == 'This field is required.') {
                this.isAdmin.next(true);
                localStorage.setItem(ADMIN_KEY,"true");
            }
        });
    }
}
