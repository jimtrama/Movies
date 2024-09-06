export default class Movie{
    public uuid:string = "";
    public title:string= "";
    public pub_date:number = -1;
    public duration:number = -1;
    public rating:number = -1;
    public description:string = "";
    public poster_url:string = "";
    public categories:string[]=[];

    public static from(data:{}):Movie{
        return {...data} as (Movie)
    }
}