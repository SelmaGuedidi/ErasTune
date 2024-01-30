import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapService } from './map-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MusicPlayerComponent } from './components/music-player/music-player.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicPlayerComponent,
  ],
  imports: [
   BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MapService],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
