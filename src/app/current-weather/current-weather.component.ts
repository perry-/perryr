import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather.service';
import { map } from 'rxjs/operators';
import { CurrentWeatherDto } from './current-weather-dto.model';
import { TimeSeriesEntry } from '../timeseries-model/timeseries-entry.model';
import { CurrentWeatherViewModel } from './current-weather-view.model';
import { WeatherIconLegends } from './weather-icon-legends';
import { TimeSeriesDetails } from '../timeseries-model/timeseries-details.model';
 
@Component({
  selector: 'perryr-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent {

  constructor(private weatherService: WeatherService) {
  }

  $currentWeather: Observable<CurrentWeatherViewModel> = this.weatherService.$current.pipe(
    map((currentWeatherDto: CurrentWeatherDto) => currentWeatherDto.properties.timeseries[0]),
    map((currentHour: TimeSeriesEntry) => {
      const symbol_code: string = currentHour.data?.next_1_hours?.summary?.symbol_code;
      const {air_temperature, precipitation_rate, wind_speed}: TimeSeriesDetails = currentHour.data?.instant?.details;
      
      return {
        symbol_code,
        symbol_desc: WeatherIconLegends.get(symbol_code.split('_')[0]),
        air_temperature,
        precipitation_rate,
        wind_speed,
        is_warm: air_temperature >= 0
      } as CurrentWeatherViewModel
    })
  );
}
