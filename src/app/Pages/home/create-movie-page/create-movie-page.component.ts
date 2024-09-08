import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CREATE_MOVIE } from '../../../api/api.constants';
import { Subscription } from 'rxjs';
import { ErrorService } from '../../../Services/error.service';


type MovieCreate = 
{
  title:string,
  categories:string[],
  pub_date:string,
  duration:string,
  rating:string,
  description:string
}

@Component({
    selector: 'app-create-movie-page',
    templateUrl: './create-movie-page.component.html',
    styleUrl: './create-movie-page.component.scss',
})
export class CreateMoviePageComponent {
    constructor(private http: HttpClient,private errorService:ErrorService) {
        this.errorService.listen.subscribe(e=>{
            this.errorMsg = e.desc[0]
        })
    }

    categories: { title: string; checked: boolean }[] = [
        { title: 'Horror', checked: false },
        { title: 'Adventure', checked: false },
        { title: 'Drama', checked: false },
        { title: 'Lifestyle', checked: false },
        { title: 'Comedy', checked: false },
    ];

    errorMsg:string = "";

    catSelected(i: number) {
        this.categories[i].checked = !this.categories[i].checked;
    }

    createBtnClicked() {
        const movie = this.createMovie();

        if (typeof movie != typeof "") {
            this.sendRequest(
             movie as MovieCreate
            );
        }else{
            this.errorMsg = "Something went wrong with the "+movie;
            this.loading = {closed:true} as Subscription;
        }
        
    }

    createMovie(): MovieCreate | string {

        const toSend: any = {};

        const title = (<HTMLInputElement>document.getElementById('title'))
            .value;
        if (!title || (title.length <= 0 && title.length > 40)) return 'Title';
        toSend['title'] = title;

        const pub_date = (<HTMLInputElement>document.getElementById('pub_date'))
            .value;
        if (pub_date.length != 4 && pub_date.length != 0) return 'Year';
        toSend['pub_date'] = pub_date == ""?0:pub_date;

        const duration = (<HTMLInputElement>document.getElementById('duration'))
            .value;
        if (duration.length >= 4)
            return 'Duration';
        toSend['duration'] = duration == ""?0:duration;

        const rating = (<HTMLInputElement>document.getElementById('rating'))
            .value;
        if (  rating.length >= 3) return 'Rating';
        toSend['rating'] = rating == ""?0:rating;

        const description = (<HTMLInputElement>document.getElementById('description'))
            .value;
        if ( description.length >= 100) return 'Description';
        toSend['description'] = description;

        let cats: any = [];
        for (const cat of this.categories) {
            if (cat.checked) {
                cats.push(cat.title);
            }
        }
        toSend['categories'] = cats;

        return toSend;
    }

    loading:Subscription = {} as Subscription
    sendRequest(
        movie:MovieCreate
    ) {
        this.loading = this.http
            .post(CREATE_MOVIE, {
                title:movie.title,
                categories:movie.categories,
                pub_date:movie.pub_date,
                duration:movie.duration??0,
                rating:movie.rating??0,
                description:movie.description,
            })
            .subscribe((res) => {
                this.errorMsg = "";
                ["title","pub_date","duration","rating","description"]
                .forEach((id)=>{(<HTMLInputElement>document.getElementById(id)).value = ""});
                this.categories.forEach(cat=>cat.checked = false)
            });
    }
}
