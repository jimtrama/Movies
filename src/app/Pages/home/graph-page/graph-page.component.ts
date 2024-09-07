import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import Movie from '../../../Models/movie.model';
import SimResponse from "./data.json";



@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrl: './graph-page.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class GraphPageComponent implements AfterViewInit{

  data:any = {};
  max:number = -Infinity;
  min:number = Infinity;

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

  ngAfterViewInit(): void {
    this.renderCircles();
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
    console.log(s);
    this.data = s;
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
      const scale = this.lerp(
        this.data[keys[i]].length,
        this.min,
        this.max,
        toMin,
        toMax
      )
      const div = document.createElement('div');
      div.classList.add("circle");
      div.style.top = ((Math.random() * (max-min)) + min )+ "px"
      div.style.left = (i*step + paddingX/2 )+ "px";
      div.style.height = scale + "px";
      div.style.width = scale + "px";
      const r = Math.random() * 255;
      div.style.backgroundColor = `rgba(${r},4,255,0.6)`
      div.id = "circle-"+i;
      canvas.appendChild(div);

      const ledgent = document.getElementById("ledgent");
      if(!ledgent) return;
      const top = ((Math.random() * (ledgent.getBoundingClientRect().height-10)) + 0 );
      const spanText = document.createElement('span');
      spanText.innerText = keys[i];
      spanText.classList.add("text");
      spanText.style.bottom = top+spanText.getBoundingClientRect().height + "px"
      spanText.style.left = (i*step + paddingX/2 + scale/2 - 15 )+ "px";
      spanText.id = "text-"+i;
      ledgent.appendChild(spanText);

      const divLine = document.createElement('div');
      divLine.classList.add("line");
      //divLine.style.bottom =  "-300px"
      divLine.style.left = (i*step + paddingX/2 + scale/2 )+ "px";
      divLine.style.height = "100%";
      divLine.id = "line-"+i;
      document.getElementById("wrapper")?.prepend(divLine);
    }
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
