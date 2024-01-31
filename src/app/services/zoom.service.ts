import { Injectable } from '@angular/core';
import { min } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  private _zoom = 1;

  get zoom(): number {
    return this._zoom;
  }

  zoomIn() {
    this._zoom += 0.1;
  }

  resetZoom() {
    this._zoom = 1;
  }

  zoomOut() {
    this._zoom =this._zoom-0.1<1?1:this._zoom-0.1;
  }
}
