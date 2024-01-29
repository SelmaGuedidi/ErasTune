import { Component } from '@angular/core';
import { ZoomService } from './services/zoom.service';
import { BehaviorSubject, delay } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Eras Tune';
  showSplashScreen = true;

  showSplashScreen$ = new BehaviorSubject<boolean>(true);

  ngOnInit() {
    // setTimeout(() => {
    //   this.showSplashScreen = false;
    // }, 3000);
    this.showSplashScreen$.pipe(delay(3000)).subscribe(() => {
      this.showSplashScreen$.next(false);
    });
  }

  constructor(public zoomService: ZoomService) {}

  }


