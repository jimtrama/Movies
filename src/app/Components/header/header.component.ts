import { Component } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { MovieService } from '../../Services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isAdmin = false;
  
  constructor(
    private accountService:AccountService,
    private movieService:MovieService
  ){
    accountService.isAdmin$.subscribe(a=>this.isAdmin = a);
  }

  logout(){
    this.accountService.logout();
  }
  actionClicked(){
    this.movieService.shuffleImages();
  }
}
