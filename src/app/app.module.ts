import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { GpsComponent } from './components/dashboard/gps/gps.component';
import { VideoComponent } from './components/dashboard/video/video.component';
import { FooterComponent } from './components/footer/footer.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { BatteryComponent } from './components/status-bar/battery/battery.component';
import { DateComponent } from './components/status-bar/date/date.component';
import { SignalComponent } from './components/status-bar/signal/signal.component';
import { BuggysComponent } from './components/buggys/buggys.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    GraphsComponent,
    GpsComponent,
    VideoComponent,
    FooterComponent,
    StatusBarComponent,
    BatteryComponent,
    DateComponent,
    SignalComponent,
    BuggysComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
