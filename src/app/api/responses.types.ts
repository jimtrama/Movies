import Movie from "../Models/movie.model"

export type CategoriesResponse = 
{
    "count":number,
    "next":string,
    "previus":string,
    "results":[Movie]
}