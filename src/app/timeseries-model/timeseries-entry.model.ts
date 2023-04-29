import { TimeSeriesDetails } from "./timeseries-details.model";

export interface TimeSeriesEntry {
    time: string;
    data: {
        instant: {
            details: TimeSeriesDetails
        },
        next_1_hours: {
            details: {
                precipitation_amount: number
            },
            summary: {
                symbol_code: string
            }
        }
    }
}