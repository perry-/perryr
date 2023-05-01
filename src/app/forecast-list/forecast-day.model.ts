export interface ForecastDay {
    date: string,
    symbol_night_code: string,
    symbol_night_desc: string,
    symbol_morning_code: string,
    symbol_morning_desc: string,
    symbol_afternoon_code: string,
    symbol_afternoon_desc: string,
    symbol_evening_code: string,
    symbol_evening_desc: string,
    max_temp: number,
    min_temp: number,
    max_precipitation: number,
    min_precipitation: number,
    wind: string,
}