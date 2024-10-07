import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapService } from './services/map.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ZoomComponent } from "./components/zoom/zoom.component";
import { ZoomService } from './services/zoom.service';
import { MapComponent } from './components/map/map.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { MusicplayerComponent } from './components/musicplayer/musicplayer.component';
import {ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SplashScreenComponent} from './components/splash-screen/splash-screen.component'
import { StepperComponent } from './components/stepper/stepper.component';
import { DefaultImagePipe } from './pipes/default-image.pipe';
import { DefaultNamePipe } from './pipes/default-name.pipe';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({ declarations: [
        AppComponent,
        ZoomComponent,
        MapComponent,
        MusicplayerComponent,
        StepperComponent,
        SplashScreenComponent,
        LandingpageComponent,
        DefaultImagePipe,
        DefaultNamePipe,
    ],
    bootstrap: [
        AppComponent,
    ], imports: [BrowserModule,
        AppRoutingModule,
        ToastrModule.forRoot({ preventDuplicates: true }),
        BrowserAnimationsModule,
        NgbModule], providers: [MapService, ZoomService, provideAnimationsAsync(), provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {

}
