import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { StockPrice, StockPriceResponse } from '../models/stock-price.interface';

@Injectable({
  providedIn: 'root'
})
export class Petr4StockPriceService {
  constructor(private http: HttpClient) { }

  getStockPrices(): Observable<StockPrice[]> {
    return this.http.get<StockPriceResponse>('/petr4')
      .pipe(
        map(response => {
          const quotes = response.chart.result[0].indicators.quote[0];
          const dates = response.chart.result[0].timestamp;
          const prices: StockPrice[] = [];

          for (let i = 0; i < 30; i++) {
            const date = new Date(dates[i] * 1000);
            const value = quotes.close[i];

            let variationD1 = null;
            if (i > 0) {
              variationD1 = ((value - quotes.close[i - 1]) / quotes.close[i - 1]) * 100;
              variationD1 = variationD1.toFixed(2);
            }

            let variationFirst = null;
            if (i === 0) {
              variationFirst = 0;
            } else {
              variationFirst = ((value - quotes.close[0]) / quotes.close[0]) * 100;
              variationFirst = variationFirst.toFixed(2);
            }

            prices.push({
              day: i + 1,
              date: date.toLocaleDateString(),
              value: value.toFixed(2),
              variationD1: variationD1 + '%',
              variationFirst: variationFirst + '%'
            });
          }

          return prices;
        })
      );
  }
}