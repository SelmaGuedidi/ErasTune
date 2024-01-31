import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage',
  pure: true
})
export class DefaultImagePipe implements PipeTransform {

  transform(path: string |undefined): string {
    if (path != "/img/generic/nocover.svg") {
      return path;
    } else {
      // Handle the case where the value is undefined
      // return './assets/default_image.png';
      return './assets/No_Cover.jpg';

    }
  }

}