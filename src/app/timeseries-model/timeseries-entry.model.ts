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
        },
        next_6_hours: {
            details: {
                precipitation_amount: number
            },
            summary: {
                symbol_code: string
            }
        },
        next_12_hours: {
            details: {
                precipitation_amount: number,
                precipitation_amount_max: number,
                precipitation_amount_min: number,
            },
            summary: {
                symbol_code: string
            }
        }
    }
}