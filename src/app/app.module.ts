import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './api/auth.interceptor';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { AccountService } from './Services/account.service';
import { ErrorService } from './Services/error.service';
import { MovieComponent } from './Components/movie/movie.component';
import { HeaderComponent } from './Components/header/header.component';
import { MoviesPageComponent} from './Pages/home/movies-page/movies-page.component';
import { RentalsContentComponent } from './Pages/home/rentals-page/rentals-content.component';
import { AccountContentComponent } from './Pages/home/account-page/account-content.component';
import { MoviePageComponent } from './Pages/home/movie-page/movie-page.component';
import { MovieService } from './Services/movie.service';
import { CutIfNeed } from './Pipes/pipes';
import { GraphPageComponent } from './Pages/home/graph-page/graph-page.component';
import { CreateMoviePageComponent } from './Pages/home/create-movie-page/create-movie-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MovieComponent,
    HeaderComponent,
    MoviesPageComponent,
    RentalsContentComponent,
    AccountContentComponent,
    MoviePageComponent,
    CutIfNeed,
    GraphPageComponent,
    CreateMoviePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    AccountService,
    ErrorService,
    MovieService,
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
