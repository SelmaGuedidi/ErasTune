import { Component, inject } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-stepper',
  standalone: false,
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  mapService = inject(MapService)
  decade:number=1980
  
  onClick(year:number): void {
    this.decade=year
    this.mapService.decadeClicked(this.decade)
  }
}
