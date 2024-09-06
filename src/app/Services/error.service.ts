import { Injectable } from '@angular/core';
import { exhaustMap, Observable, of, Subject } from 'rxjs';

export type Error = {key:string,desc:string[]}

@Injectable()
export class ErrorService {

    public emit:Subject<Error> = new Subject();
    public listen:Observable<Error> = this.emit.asObservable()
    .pipe(
        exhaustMap((error)=>
            {
                if(typeof "" === typeof error.desc){
                    error.desc = [error.desc+""]
                }
                return of(error);
            })
    );    
    
    constructor() { 
        
    }

    
}