import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset, LabelItem, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ISale } from '../../common/interfaces/ISale';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent {
  @Input() sales: ISale[] = []

  ngOnInit() {
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sales']) {
      this.sales = changes['sales'].currentValue
      this.updateChartData();
    }

    if (changes['barChartData']) {
      this.barChartData = changes['barChartData'].currentValue
      this.updateChartData();
    }
  }

  public barChartLabels: string[] = [''];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartConfiguration['data'] = {
    labels: this.barChartLabels,
    datasets: [
      { data: [this.getSalesByMonth('Jan')], label: 'Jan' },
      { data: [this.getSalesByMonth('Feb')], label: 'Feb' },
      { data: [this.getSalesByMonth('Mar')], label: 'Mar' },
      { data: [this.getSalesByMonth('Apr')], label: 'Apr' },
    ]
  };

  private updateChartData() {
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        { data: [this.getSalesByMonth('Jan')], label: 'Jan' },
        { data: [this.getSalesByMonth('Feb')], label: 'Feb' },
        { data: [this.getSalesByMonth('Mar')], label: 'Mar' },
        { data: [this.getSalesByMonth('Apr')], label: 'Apr' },

      ]
    }
  }

  public getSalesByMonth(date: 'Jan' | 'Feb' | 'Mar' | 'Apr'): number {
    const length = this.sales.filter((row) => row.date === date).length
    return length
  }
}
