import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../data.service';
import { Chart } from 'chart.js';

function randomvar(){
  var a = Math.random();
  var b = Math.random();
  var c = Math.random();
  var d = Math.random();

  var values = [a, b, c, d]

   return values; 
}

var nums = setInterval(randomvar, 1000);


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

  chart = []; // This will hold our chart1 info
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
    setInterval(() => {this.updateCharts()}, 1000);
  }

  
  updateCharts(){
    this.chart = this.chartBuilder(this.canvas, [1,2,3,4,5], [
      {
        data: randomvar(),
        borderColor: "#17dd44",
        fill: false
      }
    ]);

    this.chart2 = this.chartBuilder(this.canvas2, [2,3,4,5,7], [
      {
        data: randomvar(),
        borderColor: "#9017e4",
        fill: false
      }
    ]);

    this.chart3 = this.chartBuilder(this.canvas3, [1,2,3,4,5], [
      {
        data: randomvar(),
        borderColor: "#dad823",
        fill: false
      }
    ]);

    this.chart4 = this.chartBuilder(this.canvas4, [1,2,3,4,5], [
      {
        data: randomvar(),
        borderColor: "#3c17e4",
        fill: false
      }
    ]);
  }
  /*      
         Variables aren't being used. Just making the randomized math accessible. 
          Each has a different limit, in order to meet the number limits of the y-axis
          previously assigned for the graphs.  

          UPDATE: The graphs do NOT have a limit. Numbers are there as approximates.
  */

  randvar1 = Math.floor((Math.random() * 1000) + 1);

  randvar2 = Math.floor((Math.random() * 10) + 1);

  randvar3 = Math.floor((Math.random() * 25) + 1);

  randvar4 = Math.floor((Math.random() * 400) + 1);
  

  /*
    To continually excecute a function, after waiting the specified number for milliseconds: 
        setInterval(function, milliseconds)
  */


  

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
