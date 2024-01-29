import { Component } from '@angular/core';

@Component({
  selector: 'app-stepper',
  standalone: false,
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {
  decade:number=1980
  onClick(year:number): void {
    this.decade=year
  }
}
