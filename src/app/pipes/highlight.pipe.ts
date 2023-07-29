import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string = "", strToHighlight: string = ''): string {

    if (!strToHighlight) {
      return value;
    }
  
    //gi = Global and case Insensitive
    const regex = new RegExp(strToHighlight, 'gi');
    
    return value.replace(regex, (match) => `<b>${match}</b>`);

  }

}
