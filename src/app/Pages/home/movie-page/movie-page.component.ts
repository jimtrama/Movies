import { Component } from '@angular/core';
import { MovieService } from '../../../Services/movie.service';
import Movie from '../../../Models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-movie-page',
    templateUrl: './movie-page.component.html',
    styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent {
    movie: Movie = new Movie();
    errorText:string = "";

    constructor(
        private movieService: MovieService,
        private router:Router,
        private route: ActivatedRoute
    ) {
        const uuid = this.route.snapshot.paramMap.get('id');
        this.movieService.getMovie(uuid as string).subscribe(m=>this.movie = m)
    }

    loadingSub:Subscription = {} as Subscription;

    rent() {
        this.loadingSub = this.movieService.rent(this.movie,this.onSuccess.bind(this),this.onError.bind(this));
    }

    onSuccess(){
        this.router.navigate(["home","movies"])
    }

    onError(){
        this.errorText = "Something went wrong";
    }
}
