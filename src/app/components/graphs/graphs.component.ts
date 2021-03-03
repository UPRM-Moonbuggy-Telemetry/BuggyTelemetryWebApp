import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../data.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})

export class GraphsComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  @ViewChild('canvas2', { static: true }) canvas2: ElementRef;
  @ViewChild('canvas3', { static: true }) canvas3: ElementRef;
  @ViewChild('canvas4', { static: true }) canvas4: ElementRef;

  allData = []; // DB most recent data
  chart = []; // This will hold our chart1 info, central-front strain
  chart2 = []; // This will hold our chart2 info, central-back strain
  chart3 = []; // This will hold our chart3 info, backseat strain
  chart4 = []; // This will hold our chart4 info, all vibration
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

  getCenterFrontStrainData(){
    var strain1 = []; // angle 0
    var strain2 = []; // angle 45
    var strain3 = []; // angle 90

    for (let i=0; i < this.allData.length; i++) {
      strain1[i] = this.allData[i].strain_center_front_1;
      strain2[i] = this.allData[i].strain_center_front_2;
      strain3[i] = this.allData[i].strain_center_front_3;
    }
    return [strain1, strain2, strain3];
  }

  getCenterBackStrainData(){
    var strain1 = []; // angle 0
    var strain2 = []; // angle 45
    var strain3 = []; // angle 90

    for (let i=0; i < this.allData.length; i++) {
      strain1[i] = this.allData[i].strain_center_back_1;
      strain2[i] = this.allData[i].strain_center_back_2;
      strain3[i] = this.allData[i].strain_center_back_3;
    }
    return [strain1, strain2, strain3];
  }

  getBackseatStrainData(){
    var strain1 = []; // angle 0
    var strain2 = []; // angle 45
    var strain3 = []; // angle 90

    for (let i=0; i < this.allData.length; i++) {
      strain1[i] = this.allData[i].strain_backseat_1;
      strain2[i] = this.allData[i].strain_backseat_2;
      strain3[i] = this.allData[i].strain_backseat_3;
    }
    return [strain1, strain2, strain3];
  }

  getVibrationData(){
    var vibration1 = this.allData[0].vibration_front_lft; // front-left
    var vibration2 = this.allData[0].vibration_front_rt; // front-right
    var vibration3 = this.allData[0].vibration_rear_lft; // rear-left
    var vibration4 = this.allData[0].vibration_rear_rt; // rear-right
    var vibration5 = this.allData[0].vibration_center_back; // center-back

    // for(let i=0; i<this.allData.length; i++){
    //   vibration1[i] = this.allData[i].vibration_front_lft;
    //   vibration2[i] = this.allData[i].vibration_front_rt;
    //   vibration3[i] = this.allData[i].vibration_rear_lft;
    //   vibration4[i] = this.allData[i].vibration_rear_rt;
    //   vibration5[i] = this.allData[i].vibration_center_back;
    // }
    return [vibration1, vibration2, vibration3, vibration4, vibration5];
  }

  updateCharts(){
    var strain1 = this.getCenterFrontStrainData();
    var strain2 = this.getCenterBackStrainData();
    var strain3 = this.getBackseatStrainData();
    var vibration = this.getVibrationData();

    this.chart = this.chartBuilder(this.canvas, 'line', [
      {
        data: strain1[0],
        borderColor: '#5fd152',
        fill: false,
        label: 'Central-Front Strain (0°)'
      },
      {
        data: strain1[1],
        borderColor: '#a073ff',
        fill: false,
        label: 'Central-Front Strain (45°)'
      },
      {
        data: strain1[2],
        borderColor: '#a073ff',
        fill: false,
        label: 'Central-Front Strain (90°)'
      }
    ]);

    this.chart2 = this.chartBuilder(this.canvas2, 'line', [
      {
        data: strain2[0],
        borderColor: '#5fd152',
        fill: false,
        label: 'Central-Back Strain (0°)'
      },
      {
        data: strain2[1],
        borderColor: '#a073ff',
        fill: false,
        label: 'Central-Back Strain (45°)'
      },
      {
        data: strain2[2],
        borderColor: '#a073ff',
        fill: false,
        label: 'Central-Back Strain (90°)'
      }
    ]);

    this.chart3 = this.chartBuilder(this.canvas3, 'line', [
      {
        data: strain3[0],
        borderColor: '#5fd152',
        fill: false,
        label: 'Backseat Strain (0°)'
      },
      {
        data: strain3[1],
        borderColor: '#a073ff',
        fill: false,
        label: 'Backseat Strain (45°)'
      },
      {
        data: strain3[2],
        borderColor: '#a073ff',
        fill: false,
        label: 'Backseat Strain (90°)'
      }
    ]);

    // Gotta finish this one
    this.chart4 = this.chartBuilder2(this.canvas4, [
      {
        data: [vibration[0]],
        borderColor: '#5fd152',
        fill: true,
        label: 'Front-Left Vibration'
      },
      {
        data: [vibration[1]],
        borderColor: '#a073ff',
        fill: true,
        label: 'Front-Right Vibration'
      },
      {
        data: [vibration[2]],
        borderColor: '#a073ff',
        fill: true,
        label: 'Rear-Left Vibration'
      },
      {
        data: [vibration[3]],
        borderColor: '#a073ff',
        fill: true,
        label: 'Rear-Right Vibration'
      },
      {
        data: [vibration[4]],
        borderColor: '#a073ff',
        fill: true,
        label: 'Center-Back Vibration'
      }
    ]);

  }

  chartBuilder(element, type, yDatasets){

    return new Chart(element.nativeElement.getContext('2d'), {
      type: type,
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

  chartBuilder2(element, yDatasets){

    return new Chart(element.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        // labels: [1,2,3,4],
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
            display: true,
            ticks: {
              beginAtZero: true
            }
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
