import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('canvas2') canvas2: ElementRef;
  @ViewChild('canvas3') canvas3: ElementRef;
  @ViewChild('canvas4') canvas4: ElementRef;

  chart = []; // This will hold our chart info
  chart2 = []; // This will hold our chart2 info
  chart3 = []; // This will hold our chart3 info
  chart4 = []; // This will hold our chart3 info

  constructor(private _weather: DataService) {}

  ngOnInit() {
    //we an use this example to see to request data
    // this._weather.dailyForecast()
    //   .subscribe(res => {
    //     let temp_max = res['list'].map(res => res.main.temp_max);
    //     let temp_min = res['list'].map(res => res.main.temp_min);
    //     let alldates = res['list'].map(res => res.dt)
    //
    //     let weatherDates = []
    //     alldates.forEach((res) => {
    //       let jsdate = new Date(res * 1000)
    //       weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
    //     })
    //
    //     this.chart = new Chart('canvas', {
    //     type: 'line',
    //     data: {
    //       labels: weatherDates,
    //       datasets: [
    //         {
    //           data: temp_max,
    //           borderColor: "#3cba9f",
    //           fill: false
    //         },
    //         {
    //           data: temp_min,
    //           borderColor: "#ffcc00",
    //           fill: false
    //         },
    //       ]
    //     },
    //     options: {
    //       legend: {
    //         display: false
    //       },
    //       scales: {
    //         xAxes: [{
    //           display: true
    //         }],
    //         yAxes: [{
    //           display: true
    //         }],
    //       }
    //     }
    //   });
    //   })
  }

  ngAfterViewInit(){
    this.chart = this.chartBuilder(this.canvas, [1,2,3,4,5], [
      {
        data: [123,345,567,789,890],
        borderColor: "#17dd44",
        fill: false
      }
    ]);

    this.chart2 = this.chartBuilder(this.canvas2, [2,3,4,5,7], [
      {
        data: [4,5,6,7,7],
        borderColor: "#9017e4",
        fill: false
      }
    ]);

    this.chart3 = this.chartBuilder(this.canvas3, [1,2,3,4,5], [
      {
        data: [23,4,6,2,5],
        borderColor: "#dad823",
        fill: false
      }
    ]);

    this.chart4 = this.chartBuilder(this.canvas4, [1,2,3,4,5], [
      {
        data: [345,54,6,23,56],
        borderColor: "#3c17e4",
        fill: false
      }
    ]);
  }

  chartBuilder(element, xData, yDataset){

    return new Chart(element.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels:xData,
        datasets: yDataset
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
}
