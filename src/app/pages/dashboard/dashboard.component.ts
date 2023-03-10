import { Component, OnInit } from '@angular/core';
import { StockPrice } from 'src/app/models/stock-price.interface';
import { Petr4StockPriceService } from 'src/app/services/petr4-stock-price.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  prices: StockPrice[];
  chart: any;

  constructor(private petro4StockPriceService: Petr4StockPriceService) {}

  ngOnInit() {
    this.petro4StockPriceService.getStockPrices().subscribe(prices => {
      this.prices = prices;
      this.renderChart();
    });
  }

  renderChart() {
    const lineChartData = {
      labels: this.prices.map(price => price.date),
      datasets: [
        {
          label: 'Valor',
          data: this.prices.map(price => price.value),
          backgroundColor: 'rgba(0,255,0,0.5)',
          borderColor: 'black',
          borderWidth: 1
        }
      ]
    };

    this.chart = new Chart('lineChart', {
      type: 'line',
      data: lineChartData,
      
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
    
}
