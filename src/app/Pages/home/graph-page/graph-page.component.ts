import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import Movie from '../../../Models/movie.model';
import { exhaustMap } from 'rxjs';
import { MOVIES_ENDPOINT } from '../../../api/api.constants';



@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrl: './graph-page.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class GraphPageComponent{

  data:any = {};
  max:number = -Infinity;
  min:number = Infinity;
  circles:{x:number,y:number,r:number,year:number,count:number}[] = []
  selectedYear:{year:number,count:number} = {year:-1,count:0};
  loading= true;

  constructor(private http:HttpClient){
    this.http.get(MOVIES_ENDPOINT)
    .pipe(exhaustMap((res:any)=>{
      const count = res.count;
      return this.http.get(MOVIES_ENDPOINT+"?page_size="+count)
    }))
    .subscribe((res:any)=>{
      this.prepareData(res.results);
    })
  }

  prepareData(data:Movie[]){
    let s:any = {};

    for(const movie of data){
      if(movie.pub_date >= 1900 && movie.pub_date <= new Date().getFullYear())
      if(typeof s[movie.pub_date] === typeof []){
        s[movie.pub_date].push(movie.title);
        if(s[movie.pub_date].length > this.max){
          this.max = s[movie.pub_date].length
        }
        if(s[movie.pub_date].length < this.min){
          this.min = s[movie.pub_date].length
        }
      }else{
        s[movie.pub_date] = [movie.title];
      }
    }
    this.data = s;
    this.renderCircles();
  }

  

  renderCircles(){
    const canvas = document.getElementById("board");
    if(!canvas) return;

    const paddingX = 100;
    const paddingY = 150;

    const toMax = 100;
    const toMin = 20;

    const max = canvas.getBoundingClientRect().height - paddingY/2;
    const min = paddingY / 2;
    

    const width = canvas.getBoundingClientRect().width - paddingX;
    const keys = Object.keys(this.data);
    const step = width / keys.length;
    
    for(let i = 0 ; i < keys.length;i++){    
      const r = this.lerp(
        this.data[keys[i]].length,
        this.min,
        this.max,
        toMin,
        toMax
      )
      const y = Math.random() * (max - min) + min;
      const x = i * step + paddingX / 2;
      this.circles.push({x,y,r,year:+keys[i],count:this.data[keys[i]].length})
    }
    this.loading =  false;
  }
  
  yearSelected(event:any){
    this.selectedYear.year = event[0];
    this.selectedYear.count = event[1];
  }

  clearCanvas(){
    document.getElementById("board")?.remove();
    const div = document.createElement("div");
    div.id = "board";
    div.classList.add("board");
    document.getElementById("board-wrapper")?.appendChild(div);
  }


  lerp(x:number,fromStart:number,fromEnd:number,toStart:number,toEnd:number){
    const slop = (toEnd - toStart )/(fromEnd - fromStart);
    return toStart + slop * (x-fromStart)
  }
}
