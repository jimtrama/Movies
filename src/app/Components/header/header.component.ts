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

  isMobile = false;
  menuOpened = false;
  
  constructor(
    private accountService:AccountService,
    private movieService:MovieService,
  ){
    accountService.isAdmin$.subscribe(a=>this.isAdmin = a);
    window.addEventListener('resize',()=>this.isMobile = innerWidth < 600)
    this.isMobile = innerWidth < 600
  }

  logout(){
    this.accountService.logout();
  }
  actionClicked(){
    this.movieService.shuffleImages();
    this.menuOpened = false;
  }
  menuBtnClicked(){
    this.menuOpened = !this.menuOpened;
  }
}
