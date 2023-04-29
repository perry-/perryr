import { TimeSeriesEntry } from "../timeseries-model/timeseries-entry.model"

export interface CurrentWeatherDto {
    geometry: {
        coordinates: Array<number>,
        type: string
    },
    properties: {
        timeseries: TimeSeriesEntry[]
    }
}