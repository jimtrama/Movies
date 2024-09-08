import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { MOVIES_ENDPOINT } from '../../../api/api.constants';
import { CategoriesResponse } from '../../../api/responses.types';
import Movie from '../../../Models/movie.model';
import { MovieService } from '../../../Services/movie.service';

@Component({
    selector: 'app-movies-page',
    templateUrl: './movies-page.component.html',
    styleUrl: './movies-page.component.scss',
})
export class MoviesPageComponent implements AfterViewInit {
    movies: Movie[] = [];
    imagesForBg:string[] = [];
    fetchingNext: { fetching: boolean; nextUrl: string };

    constructor(private http: HttpClient,private movieService:MovieService) {
        this.fetchingNext = { fetching: false, nextUrl: '' };
        this.fetchMovies(MOVIES_ENDPOINT + '?page=1&page_size=31');

        
    }

    fetchMovies(url: string) {
        this.http.get<CategoriesResponse>(url).subscribe((response) => {
            this.fetchingNext.nextUrl = response.next;
            this.fetchingNext.fetching = false;
            response.results.forEach((movie) => {
                if (!!movie.pub_date && movie.duration >= 1)
                {
                    this.movies.push(movie);
                }
            });
        });
    }

    ngAfterViewInit(): void {
        document
            .getElementById('movies-wrapper-cont')
            ?.addEventListener('scroll', this.onMoviesScrolled.bind(this));
    }

    onMoviesScrolled(e: Event): any {
        const el = <HTMLElement>e.target;
        if (
            el.scrollHeight - el.scrollTop < window.innerHeight &&
            !this.fetchingNext.fetching
        ) {
            this.fetchingNext.fetching = true;
            this.fetchMovies(this.fetchingNext.nextUrl);
        }
    }
}
