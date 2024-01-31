import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultName',
  pure: true
})
export class DefaultNamePipe implements PipeTransform {

  transform(album: any): string {
    return album? album : "unknown";
  }

}
