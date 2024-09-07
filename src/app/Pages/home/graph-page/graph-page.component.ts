import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Movie from '../../../Models/movie.model';
import { MOVIES_ENDPOINT } from '../../../api/api.constants';
import { exhaustMap } from 'rxjs';
import SimResponse from "./data.json";



@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrl: './graph-page.component.scss'
})
export class GraphPageComponent {

  //data:Movie[] = [];

  constructor(private http:HttpClient){
    // this.http.get(MOVIES_ENDPOINT)
    // .pipe(exhaustMap((res:any)=>{
    //   const count = res.count;
    //   return this.http.get(MOVIES_ENDPOINT+"?page_size="+count)
    // }))
    // .subscribe((res:any)=>{
    //   this.data = res.results;
    // })

    

    this.prepareData([...SimResponse.results] as Movie[])


  }

  prepareData(data:Movie[]){
    for(let i = 0 ; i < data.length;i++){
      
    }
    this.filterData(data);
    this.structData(data);
    this.showData();
  }

  filterData(data:Movie[]){

  }

  structData(data:Movie[]){
    let s:any = {};

    for(const movie of data){
      if(typeof s[movie.pub_date] === typeof []){
        s[movie.pub_date].push(movie.title);
      }else{
        s[movie.pub_date] = [movie.title];
      }
    }
    console.log(s);
  }

  showData(){

  }
}
