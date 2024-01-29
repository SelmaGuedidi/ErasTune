import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent {
  // @Output() splashScreenComplete = new EventEmitter<void>();
  zoom: String
  ngOnInit() {
    // Simulate animation duration, then emit event
    setTimeout(() => {
      this.zoom="zoom-out";
    },5000); // Adjust the time based on your actual animation duration
  }
}
