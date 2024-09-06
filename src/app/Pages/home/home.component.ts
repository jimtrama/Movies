import { Component } from '@angular/core';
import { MovieService } from '../../Services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  imagesForBg:string[] = [];

  constructor(private movieService:MovieService){
    this.movieService.backgoundImages$.subscribe((images)=>{
          this.imagesForBg = [...images.keys()]
    })
  }

  
}
