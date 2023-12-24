import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapService } from './map-service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
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
