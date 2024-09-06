import { Component } from '@angular/core';
import { MovieService } from '../../../Services/movie.service';
import {
    RentalInfo,
    Rental,
    Order,
    RentalOrderByKeys,
} from '../../../Models/rental.model';
import { AccountService } from '../../../Services/account.service';
import Account from '../../../Models/account.model';

@Component({
    selector: 'app-rentals-content',
    templateUrl: './rentals-content.component.html',
    styleUrl: './rentals-content.component.scss',
})
export class RentalsContentComponent {
    rentals: Rental[] = [];
    page: number = 1;
    totalPages: number = 1;
    rentalsInfo: RentalInfo = {} as RentalInfo;
    account: Account = {} as Account;
    isAdmin:boolean = false;

    headers:{title:string,keyToSort:RentalOrderByKeys}[] = 
    [
        {
            title:"Title",
            keyToSort:"movie"
        },
        {
            title:"Rentla Date",
            keyToSort:"rental_date"
        },
        {
            title:"Keap for (days)",
            keyToSort:"no_sort"
        },
        {
            title:"Return Action",
            keyToSort:"no_sort"
        },
        {
            title:"Active Rental",
            keyToSort:"is_paid"
        },
    ]

    constructor(
        private movieService: MovieService,
        private accountService: AccountService
    ) {
        this.movieService.getRentals();
        this.movieService.rentalsInfo$.subscribe((r) => {
            this.rentalsInfo = r;
            this.totalPages = Math.ceil(r.count / 5);
            this.rentals = [];
            for (let rental of this.rentalsInfo.results) {
                this.rentals.push(Object.assign(new Rental(), rental));
            }
        });
        this.accountService.account$.subscribe((a) => {
            this.account = a;
        });
        this.accountService.isAdmin$.subscribe((isAdmin) => {
            this.isAdmin = isAdmin;
            if(isAdmin){
                this.headers[3].title = "User";
                this.headers[3].keyToSort = "user";

            }
        });
    }

    giveItBack(i: number) {
        this.page = 1;
        this.movieService.giveItBack(
            this.rentals[i].uuid,
            this.onOk.bind(this)
        );
    }

    onOk() {
        this.movieService.getRentals();
        this.accountService.refreshAccount();
    }

    next() {
        if (this.rentalsInfo.next != '' && this.page < this.totalPages) {
            this.page++;
            this.movieService.getRentals(this.rentalsInfo.next);
        }
    }

    prev() {
        if (this.rentalsInfo.previous != '' && this.page >= 2) {
            this.page--;
            this.movieService.getRentals(this.rentalsInfo.previous);
        }
    }

    sort(by: RentalOrderByKeys, order: Order) {
        this.rentals = [...this.rentals.sort((a, b) => a.sort(b, order, by))];
    }
}
