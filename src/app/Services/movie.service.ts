import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import Movie from '../Models/movie.model';
import { HttpClient } from '@angular/common/http';
import {
    CREATE_MOVIE_ENDPOINT,
    GET_MOVIE,
    GET_RENTALS_ENDPOINT,
    RENT_A_MOVIE_ENDPOINT,
    RETURN_RENTAL,
} from '../api/api.constants';
import { RentalInfo } from '../Models/rental.model';

@Injectable()
export class MovieService {
    private backgoundImages: BehaviorSubject<Set<string>> = new BehaviorSubject(
        new Set()
    );
    public backgoundImages$: Observable<Set<string>> =
        this.backgoundImages.asObservable();

    private rentalsInfo: BehaviorSubject<RentalInfo> = new BehaviorSubject(
        {} as RentalInfo
    );
    public rentalsInfo$: Observable<RentalInfo> =
        this.rentalsInfo.asObservable();

    constructor(private http: HttpClient) {}

    rent(movie: Movie, onSuccess: () => void, onError: () => void):Subscription {
        return this.http
            .post(RENT_A_MOVIE_ENDPOINT, { movie: movie.uuid })
            .subscribe((res: any) => {
                if (!!res.movie) {
                    onSuccess();
                }
            }, onError);
    }

    getRentals(url: string = GET_RENTALS_ENDPOINT):Subscription{
        return this.http
            .get<RentalInfo>(url + '?page_size=5')
            .subscribe((res: RentalInfo) => {
                this.rentalsInfo.next(res);
            });
    }

    giveItBack(uuid: string, onSuccess: () => void):Subscription {
        return this.http
            .patch( RETURN_RENTAL + uuid, { is_paid: true })
            .subscribe((res: any) => {
                if (res === 'Movie returned successfully.') {
                    onSuccess();
                }
            });
    }

    getMovie(id: string): Observable<Movie> {
        return this.http.get<Movie>(
            GET_MOVIE + encodeURIComponent(id)
        );
    }

    addImage(url: string) {
        let newSet: Set<string> = new Set();
        for (let a of this.backgoundImages.getValue().keys()) {
            newSet.add(a);
        }
        newSet.add(url);
        this.backgoundImages.next(newSet);
    }

    deleteImage(url: string) {
        let newSet: Set<string> = new Set();
        for (let a of this.backgoundImages.getValue().keys()) {
            if (a !== url) {
                newSet.add(a);
            }
        }
        this.backgoundImages.next(newSet);
    }

    shuffleImages() {
        let newSet: Set<string> = new Set();
        const array: string[] = [...this.backgoundImages.getValue().keys()];
        for (; array.length > 0; ) {
            const randomPickIndex = Math.floor(Math.random() * array.length);
            newSet.add(array[randomPickIndex]);
            array.splice(randomPickIndex, 1);
        }
        this.backgoundImages.next(newSet);
    }

    createAMovie(onSuccess:()=>void){
        
    }
}
