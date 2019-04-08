import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as h337 from 'heatmap.js';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-buggys',
  templateUrl: './buggys.component.html',
  styleUrls: ['./buggys.component.css']
})
export class BuggysComponent {
  allData = [];

  constructor(private _dataService: DataService) { }
  @ViewChild('map') map: ElementRef;

  ngOnInit() {

    setInterval(() => {
      this._dataService.getAllData().subscribe(data => {
        this.allData = data;
      })
    }, 1000);
    setInterval(() => {this.updateHeatmap()}, 1000);
  }

  getStrain1Data(){
    var strain_1 = []
    for(let i=0; i<this.allData.length; i++){
      strain_1[i] = this.allData[i].strain_sensor_1;
    }
    return [strain_1];
  }

  getStrain2Data(){
    var strain_2 = []
    for(let i=0; i<this.allData.length; i++){
      strain_2[i] = this.allData[i].strain_sensor_2;
    }
    return [strain_2];
  }
  
  getStrain3Data(){
    var strain_3 = []
    for(let i=0; i<this.allData.length; i++){
      strain_3[i] = this.allData[i].strain_sensor_3;
    }
    return [strain_3];
  }

  updateHeatmap() {
    var heatmapInstance = h337.create({
      // This is where the info is stored! 
      container: this.map.nativeElement
    });
    
    // Random data generators and limits.
    var height = 360;
    var width = 370; // Actual space width is 400, yet the heatmap exceeds boundaries when it's 400.
    var max = 150; // Higher the number, less saturated and extreme red splotches.
    var len = 400; // Smaller the number, more precise red area marking of the points.
    var points = [];

    while (len--) {
      var strain1 = this.getStrain1Data();
      var strain2 = this.getStrain2Data();
      var strain3 = this.getStrain3Data();

      var randval = Math.floor(Math.random()*100);
      max = Math.max(max, randval);
      
      var fPoint1 = {
        x: 362,
        y: 220,
        value: strain1
      };
      var fPoint2 = {
        x: 362,
        y: 130,
        value: strain2
      };
      var bPoint3 = {
        x: 245,
        y: 174,
        value: strain3
      };
      points.push(fPoint1, fPoint2, bPoint3);
    }
    
    
    // Follow heatmap data format.
    var data = {
      max: max,
      min: 10,
      data: points 
     };
  
    // Installs data which has been given by the variable above.
    heatmapInstance.setData(data);
  }

}
