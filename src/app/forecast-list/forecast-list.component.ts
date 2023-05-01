import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Observable, map, tap } from 'rxjs';
import { ForecastDay } from './forecast-day.model';
import { TimeSeriesEntry } from '../timeseries-model/timeseries-entry.model';
import { WeatherIconLegends } from '../current-weather/weather-icon-legends';

@Component({
  selector: 'perryr-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss']
})
export class ForecastListComponent {
  constructor(private weatherService: WeatherService) {
  }

  $forecastDays: Observable<ForecastDay[]> = this.weatherService.$forecast.pipe(
    map((forecast => {
      return forecast.properties?.timeseries as TimeSeriesEntry[]
    })),
    map((timeseries: TimeSeriesEntry[]) => timeseries.filter((timeseriesEntry) => !(new Date(timeseriesEntry.time).getUTCHours() % 6))),
    map((timeseries: TimeSeriesEntry[]) => timeseries.reduce((acc: Map<string, TimeSeriesEntry[]>, current, index) => {
      const currentDate = current.time.split('T')[0];
      const timeIndex: number = Math.floor(new Date(current.time).getUTCHours() / 6);

      let intervals: TimeSeriesEntry[] = acc.get(currentDate) || [...Array(4)];
      intervals[timeIndex] = current;
      acc.set(currentDate, intervals);

      return acc;
    }, new Map<string, TimeSeriesEntry[]>)),
    map((timeseries: Map<string, TimeSeriesEntry[]>) => {
      const days: ForecastDay[] = [];

      timeseries.forEach(day => {
        const max_precipitation: number = Math.max(
          day[0]?.data.next_6_hours?.details?.precipitation_amount_max,
          day[1]?.data.next_6_hours?.details?.precipitation_amount_max,
          day[2]?.data.next_6_hours?.details?.precipitation_amount_max,
          day[3]?.data.next_6_hours?.details?.precipitation_amount_max
        );
        const min_precipitation: number = Math.min(
          day[0]?.data.next_6_hours?.details?.precipitation_amount_min,
          day[1]?.data.next_6_hours?.details?.precipitation_amount_min,
          day[2]?.data.next_6_hours?.details?.precipitation_amount_min,
          day[3]?.data.next_6_hours?.details?.precipitation_amount_min
        );

        const max_temp: number = Math.max(
          day[0]?.data.next_6_hours?.details?.air_temperature_max,
          day[1]?.data.next_6_hours?.details?.air_temperature_max,
          day[2]?.data.next_6_hours?.details?.air_temperature_max,
          day[3]?.data.next_6_hours?.details?.air_temperature_max
        );
        const min_temp: number = Math.min(
          day[0]?.data.next_6_hours?.details?.air_temperature_min,
          day[1]?.data.next_6_hours?.details?.air_temperature_min,
          day[2]?.data.next_6_hours?.details?.air_temperature_min,
          day[3]?.data.next_6_hours?.details?.air_temperature_min
        )

        days.push({
          date: new Date(day[0]?.time || day[1]?.time || day[2]?.time || day[3]?.time).toLocaleDateString(),
          symbol_night_code: day[0]?.data.next_6_hours.summary.symbol_code,
          symbol_night_desc: WeatherIconLegends.get(day[0]?.data.next_6_hours.summary.symbol_code.split('_')[0]),
          symbol_morning_code: day[1]?.data?.next_6_hours?.summary.symbol_code,
          symbol_morning_desc: WeatherIconLegends.get(day[1]?.data?.next_6_hours?.summary.symbol_code.split('_')[0]),
          symbol_afternoon_code: day[2]?.data?.next_6_hours?.summary.symbol_code,
          symbol_afternoon_desc: WeatherIconLegends.get(day[2]?.data?.next_6_hours?.summary.symbol_code.split('_')[0]),
          symbol_evening_code: day[3]?.data?.next_6_hours?.summary.symbol_code,
          symbol_evening_desc: WeatherIconLegends.get(day[3]?.data?.next_6_hours?.summary.symbol_code.split('_')[0]),
          min_temp: min_temp ? Math.round(min_temp) : null,
          max_temp: max_temp ? Math.round(max_temp) : null,
          min_precipitation: min_precipitation || null,
          max_precipitation: max_precipitation || null,
          wind: "",
        } as ForecastDay)
      });
      return days;
    }),
  )
}
