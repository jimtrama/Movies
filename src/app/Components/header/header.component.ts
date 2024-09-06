import { Component } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { MovieService } from '../../Services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  constructor(
    private accountService:AccountService,
    private movieService:MovieService
  ){}

  logout(){
    this.accountService.logout();
  }
  actionClicked(){
    this.movieService.shuffleImages();
  }
}
