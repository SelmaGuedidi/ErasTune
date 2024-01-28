import { Component, EventEmitter, Output } from '@angular/core';
import { ZoomService } from 'src/app/services/zoom.service';


@Component({
  selector: 'app-zoom',
  standalone: false,

  templateUrl: './zoom.component.html',
  styleUrl: './zoom.component.scss'
})
export class ZoomComponent {
  constructor(private zoomService: ZoomService) {}

  zoomIn() {
    console.log("zoomin")
    this.zoomService.zoomIn();
  }

  resetZoom() {
    this.zoomService.resetZoom();
  }

  zoomOut() {
    this.zoomService.zoomOut();
  }
}
