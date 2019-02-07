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

  allData = []; // DB data
  chart = []; // This will hold our chart1 info, frontal strain
  chart2 = []; // This will hold our chart2 info, back strain
  chart3 = []; // This will hold our chart3 info, frontal vibration
  chart4 = []; // This will hold our chart3 info, back vibration

  constructor(private dataService: DataService) {}

  ngOnInit() {
    setInterval(() => {this.updateCharts()}, 1000);
    setInterval(() => {this.allData = dataService.getAllData()}, 1000);
  }

  getFrontStrainData(){
  
  }

  getFrontVibrationData(){

  }

  getBackStrainData(){

  }

  getBackVibrationData(){

  }

  updateCharts(){
    this.chart = this.chartBuilder(this.canvas, [1,2,3,4,5], [
      {
        data: getFrontStrainData(),
        borderColor: "#17dd44",
        fill: false
      }
    ]);

    this.chart2 = this.chartBuilder(this.canvas2, [2,3,4,5,7], [
      {
        data:  getBackStrainData(),
        borderColor: "#9017e4",
        fill: false
      }
    ]);

    this.chart3 = this.chartBuilder(this.canvas3, [1,2,3,4,5], [
      {
        data: getFrontVibrationData(),
        borderColor: "#dad823",
        fill: false
      }
    ]);

    this.chart4 = this.chartBuilder(this.canvas4, [1,2,3,4,5], [
      {
        data: getBackVibrationData(),
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
