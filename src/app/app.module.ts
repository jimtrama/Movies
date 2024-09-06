import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './api/auth.interceptor';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { AccountService } from './Services/account.service';
import { ErrorService } from './Services/error.service';
import { MovieComponent } from './Components/movie/movie.component';
import { HeaderComponent } from './Components/header/header.component';
import { MainHomeContentComponent } from './Pages/home/movies-page/movies-page.component';
import { RentalsContentComponent } from './Pages/home/rentals-page/rentals-content.component';
import { AccountContentComponent } from './Pages/home/account-page/account-content.component';
import { MoviePageComponent } from './Pages/home/movie-page/movie-page.component';
import { MovieService } from './Services/movie.service';
import { CutIfNeed } from './Pipes/pipes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MovieComponent,
    HeaderComponent,
    MainHomeContentComponent,
    RentalsContentComponent,
    AccountContentComponent,
    MoviePageComponent,
    CutIfNeed
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
