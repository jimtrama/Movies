import path from './path';

export const API_BASE_ROUTE = path();
export const LOGIN_ENDPOINT = API_BASE_ROUTE + 'auth/login/';
export const REFRESH_ENDPOINT = API_BASE_ROUTE + 'auth/refresh/';

export const MOVIES_ENDPOINT = API_BASE_ROUTE + 'rent-store/movies/';
export const CREATE_MOVIE_ENDPOINT = API_BASE_ROUTE + 'rent-store/movies/';
export const GET_MOVIE = API_BASE_ROUTE + 'rent-store/movies/';

export const RENT_A_MOVIE_ENDPOINT = API_BASE_ROUTE + 'rent-store/rentals/';
export const GET_RENTALS_ENDPOINT = API_BASE_ROUTE + 'rent-store/rentals/';
export const RETURN_RENTAL = API_BASE_ROUTE + 'rent-store/rentals/';

export const GET_PROFILE = API_BASE_ROUTE + 'rent-store/profile/';
