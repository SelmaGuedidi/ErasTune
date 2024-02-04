import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  private _zoom = 1;

  get zoom(): number {
    return this._zoom;
  }
 scale(){
  d3.select('#svg')
  .attr('transform',`scale(${this._zoom})`);
 }

  zoomIn() {
    this._zoom += 0.1;
    
    this.scale();
  }

  resetZoom() {
    this._zoom = 1;
    this.scale();
   
  }

  zoomOut() {
    this._zoom =this._zoom-0.1<1?1:this._zoom-0.1;
    this.scale();
   
  }
}
