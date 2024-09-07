import { inject, NgModule } from '@angular/core';
import { CanActivateFn, Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { AccountService } from './Services/account.service';
import { MoviesPageComponent } from './Pages/home/movies-page/movies-page.component';
import { AccountContentComponent } from './Pages/home/account-page/account-content.component';
import { RentalsContentComponent } from './Pages/home/rentals-page/rentals-content.component';
import { MoviePageComponent } from './Pages/home/movie-page/movie-page.component';
import { GraphPageComponent } from './Pages/home/graph-page/graph-page.component';
import { CreateMoviePageComponent } from './Pages/home/create-movie-page/create-movie-page.component';

const isLoggedInGuard: CanActivateFn = (route, state) => {
    const key = inject(AccountService).key;
    if (!key) {
        return inject(Router).createUrlTree(['login']);
    }
    return !!key;
};

const simpleUser: CanActivateFn = (route, state) => {
    const isAdmin = inject(AccountService).isAdmin.getValue();
    if(isAdmin){
        return inject(Router).createUrlTree(['home','graph']);
    }
    return true;
};

const adminUser: CanActivateFn = (route, state) => {
    const isAdmin = inject(AccountService).isAdmin.getValue();
    if(!isAdmin){
        return inject(Router).createUrlTree(['home','movies']);
    }
    return true;
};

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [isLoggedInGuard],
        title: 'Home',
        children: [
            {
                path: 'movies',
                canActivate:[simpleUser],
                component: MoviesPageComponent,
            },
            {
                path: 'graph',
                canActivate:[adminUser],
                component: GraphPageComponent,
            },
            {
                path: 'account',
                canActivate:[simpleUser],
                component: AccountContentComponent,
            },
            {
                path: 'create',
                canActivate:[adminUser],
                component: CreateMoviePageComponent,
            },
            {
                path: 'movie/:id',
                canActivate:[simpleUser],
                component: MoviePageComponent,
            },
            {
                path: 'rentals',
                component: RentalsContentComponent,
            },
            {
                path: '**',
                redirectTo: 'movies',
            },
        ],
    },
    { 
        path: '**', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
