import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class WeatherService {
    private expires: string | null = null;

    constructor(private http: HttpClient) {

    }

    public $forecast: Observable<any> = this.http.get<any>('https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=59.9333&lon=10.7166');
    public $current: Observable<any> = this.http.get<any>('https://api.met.no/weatherapi/nowcast/2.0/complete?lat=59.9333&lon=10.7166');
}