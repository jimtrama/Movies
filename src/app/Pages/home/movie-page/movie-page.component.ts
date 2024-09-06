import { Component } from '@angular/core';
import { MovieService } from '../../../Services/movie.service';
import Movie from '../../../Models/movie.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-movie-page',
    templateUrl: './movie-page.component.html',
    styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent {
    movie: Movie = new Movie();

    constructor(
        private movieService: MovieService,
        private route: ActivatedRoute
    ) {
        const uuid = this.route.snapshot.paramMap.get('id');
        this.movieService.getMovie(uuid as string).subscribe(m=>this.movie = m)
    }

    rent() {
        this.movieService.rent(this.movie);
    }
}
