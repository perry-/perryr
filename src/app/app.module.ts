import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherService } from './weather.service';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { PrecipitationStatusComponent } from './precipitation-status/precipitation-status.component';
import { ForecastListComponent } from './forecast-list/forecast-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    PrecipitationStatusComponent,
    ForecastListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
