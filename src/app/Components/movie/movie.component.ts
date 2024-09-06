import { AfterContentInit, Component, Input } from '@angular/core';
import Movie from '../../Models/movie.model';
import { Router } from '@angular/router';
import { MovieService } from '../../Services/movie.service';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrl: './movie.component.scss',
})
export class MovieComponent implements AfterContentInit {
    posterUrl: string = '/assets/defaultImage.jpg';
    @Input({ required: true }) movie: Movie = new Movie();


    constructor(private router: Router,private movieService:MovieService) {}

    ngAfterContentInit(): void {
      let d = new Set();
      if (!!this.movie.poster_url) {
        this.movieService.addImage(this.movie.poster_url);
        this.posterUrl = this.movie.poster_url;
      }  
    }

    clicked() {
      this.router.navigate(["home","movie",this.movie.uuid])
    }

    err(e: any) {
      this.movieService.deleteImage(this.movie.poster_url);
        this.posterUrl = '/assets/defaultImage.jpg';
    }
}
