export interface StockPrice {
  day: number;
  date: string;
  value: string;
  variationD1: string;
  variationFirst: string;
}

export interface StockPriceResponse {
  chart: {
    result: [{
      indicators: {
        quote: [{
          close: number[];
        }];
      },
      timestamp: number[];
    }];
  };
}