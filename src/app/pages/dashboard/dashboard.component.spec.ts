import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StockPrice } from 'src/app/models/stock-price.interface';
import { Petr4StockPriceService } from 'src/app/services/petr4-stock-price.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let petr4StockPriceService: jasmine.SpyObj<Petr4StockPriceService>;

  beforeEach(() => {
    petr4StockPriceService = jasmine.createSpyObj('Petr4StockPriceService', ['getStockPrices']);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: Petr4StockPriceService, useValue: petr4StockPriceService }
      ]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getStockPrices', () => {
    petr4StockPriceService.getStockPrices.and.returnValue(of([]));
    fixture.detectChanges();
    expect(petr4StockPriceService.getStockPrices).toHaveBeenCalled();
  });

  it('should render chart', () => {
    const prices: StockPrice[] = [
      { day: 1, date: '2023-01-01', value: '10.00', variationD1: '0.00%', variationFirst: '0.00%' },
      { day: 2, date: '2023-01-02', value: '20.00', variationD1: '100.00%', variationFirst: '100.00%' }
    ];
    petr4StockPriceService.getStockPrices.and.returnValue(of(prices));

    fixture.detectChanges();

    expect(component.prices).toEqual(prices);
    expect(component.chart.data.labels).toEqual(['2023-01-01', '2023-01-02']);
    expect(component.chart.data.datasets[0].data).toEqual(['10.00', '20.00']);
  });
});