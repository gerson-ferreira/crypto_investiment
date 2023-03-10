import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StockPriceResponse } from '../models/stock-price.interface';
import { Petr4StockPriceService } from './petr4-stock-price.service';

describe('Petr4StockPriceService', () => {
  let service: Petr4StockPriceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Petr4StockPriceService]
    });

    service = TestBed.get(Petr4StockPriceService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});