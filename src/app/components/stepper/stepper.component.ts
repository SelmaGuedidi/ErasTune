import { Component } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-stepper',
  standalone: false,
  template: `<div class="stepper-wrapper">
  <div *ngFor="let year of decades" [class]="decade >= year ? 'stepper-item completed' : 'stepper-item active'" (click)="onClick(year)">
    <div class="step-counter">{{ year }}</div>
  </div>
</div>
`,
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  constructor(private mapService: MapService) {}
  decades: number[] = [1950, 1960, 1970, 1980, 1990, 2000, 2010];
  decade:number=1980

  onClick(year:number): void {
    this.decade=year
    this.mapService.decadeClicked(this.decade)
  }
}
