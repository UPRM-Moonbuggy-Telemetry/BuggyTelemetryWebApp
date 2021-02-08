import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../data.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})

export class GraphsComponent implements OnInit {
  //Changed from static: true to false. Verify later just for precaution.LFQR
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('canvas2', { static: false }) canvas2: ElementRef;
  @ViewChild('canvas3', { static: false }) canvas3: ElementRef;
  @ViewChild('canvas4', { static: false }) canvas4: ElementRef;

  allData = []; // DB most recent data
  chart = []; // This will hold our chart1 info, frontal strain
  chart2 = []; // This will hold our chart2 info, central strain
  chart3 = []; // This will hold our chart3 info, frontal vibration
  chart4 = []; // This will hold our chart3 info, back vibration
  xlabels = []; // x-axis

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    setInterval(() => {
      this._dataService.getAllData().subscribe(data => {
        this.allData = data;
      });
    }, 1000);
    setInterval(() => { this.updateCharts(); }, 1000);
    this.generateXLabels();
  }

  getFrontStrainData(){
    var strain1 = [];
    var strain2 = [];
    for (let i=0; i < this.allData.length; i++) {
      strain1[i] = this.allData[i].strain_front_lft_1;
      strain2[i] = this.allData[i].strain_front_rt_1;
    }
    return [strain1, strain2];
  }

  getFrontVibrationData(){
    var vibration1 = [];
    var vibration2 = [];
    for(let i=0; i<this.allData.length; i++){
      vibration1[i] = this.allData[i].vibration_front_lft;
      vibration2[i] = this.allData[i].vibration_front_rt;
    }
    return [vibration1, vibration2];
  }

  getBackStrainData(){
    var strain3 = [];
    var strain4 = [];
    for(let i=0; i<this.allData.length; i++){
      strain3[i] = this.allData[i].strain_center_1;
      strain4[i] = this.allData[i].strain_center_2;
    }
    return [strain3,strain4];
  }

  getBackVibrationData(){
    var vibration3 = []
    var vibration4 = []
    for(let i=0; i < this.allData.length; i++){
      vibration3[i] = this.allData[i].vibration_rear_lft;
      vibration4[i] = this.allData[i].vibration_rear_rt;
    }
    return [vibration3, vibration4];
  }

  updateCharts(){
    var strain1 = this.getFrontStrainData()[0];
    var strain2 = this.getFrontStrainData()[1];
    var strain3 = this.getBackStrainData()[0];
    var strain4 = this.getBackStrainData()[1];

    this.chart = this.chartBuilder(this.canvas, [
      {
        data: strain1,
        borderColor: '#5fd152',
        fill: false,
        label: 'Frontal Strain 1'
      },
      {
        data: strain2,
        borderColor: '#a073ff',
        fill: false,
        label: 'Frontal Strain 2'
      }
    ]);

    this.chart2 = this.chartBuilder(this.canvas2, [
      {
        data: strain3,
        borderColor: '#5fd152',
        fill: false,
        label: 'Central Strain 1'
      },
      {
        data: strain4,
        borderColor: '#a073ff',
        fill: false,
        label: 'Central Strain 2'
      }
    ]);

    var vibration1 = this.getFrontVibrationData()[0];
    var vibration2 = this.getFrontVibrationData()[1];
    var vibration3 = this.getBackVibrationData()[0];
    var vibration4 = this.getBackVibrationData()[1];

    this.chart3 = this.chartBuilder(this.canvas3, [
      {
        data: vibration1,
        borderColor: '#fc6625',
        fill: false,
        label: 'Left Frontal Vibration'
      },
      {
        data: vibration2,
        borderColor: '#3c75df',
        fill: false,
        label: 'Right Frontal Vibration'
      }
    ]);

    this.chart4 = this.chartBuilder(this.canvas4, [
      {
        data: vibration3,
        borderColor: '#fc6625',
        fill: false,
        label: 'Left Rear Vibration'
      },
      {
        data: vibration4,
        borderColor: '#3c75df',
        fill: false,
        label: 'Right Rear Vibration'
      }
    ]);
  }

  chartBuilder(element, yDatasets){

    return new Chart(element.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.xlabels,
        datasets: yDatasets
      },
      options: {
        animation: false,
        legend: {
          display: true
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

  generateXLabels(){
    for (let i=1; i <= 30; i++) {
        this.xlabels.push(i);
    }
  }
}
