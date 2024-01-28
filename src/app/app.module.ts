import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapService } from './services/map.service';
import { HttpClientModule } from '@angular/common/http';
import { ZoomComponent } from "./components/zoom/zoom.component";
import { ZoomService } from './services/zoom.service';
import { MapComponent } from './components/map/map.component';


@NgModule({
    declarations: [
      AppComponent,
        ZoomComponent,
        MapComponent
    ],
    providers: [MapService,ZoomService],
    bootstrap: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
       
    ]
})
export class AppModule {
  
}
