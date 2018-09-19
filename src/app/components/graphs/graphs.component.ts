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

  chart = []; // This will hold our chart info

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
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels:[345,345,3456,3456,3456,345,2345,234],
        datasets: [
          {
            data: [123,1234,25,345,35,456435,6],
            borderColor: "#3cba9f",
            fill: false
          },
          {
            data: [234,345,435,346,456,457,7,567],
            borderColor: "#ffcc00",
            fill: false
          },
        ]
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
