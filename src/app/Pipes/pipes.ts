import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'cutIfNeeded',
})
export class CutIfNeed implements PipeTransform {
  transform(value: string): string {
    const limit = 30;
    
    if(value.length < limit) return value;
    let result ="";
    for(let i = 0; i< limit;i++){
        result+= value[i];
    }
    return result+"...";
  }
}