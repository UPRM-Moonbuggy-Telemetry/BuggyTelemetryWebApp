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

  getStrainLeftData(){
    var strain_1L = []
    for(let i=0; i<this.allData.length; i++){
      strain_1L[i] = this.allData[i].strain_front_lft_1;
    }
    return [strain_1L];
  }

  getStrainLeft2Data(){
    var strain_2L = []
    for(let i=0; i<this.allData.length; i++){
      strain_2L[i] = this.allData[i].strain_front_lft_2;
    }
    return [strain_2L];
  }

  getStrainLeft3Data(){
    var strain_3L = []
    for(let i=0; i<this.allData.length; i++){
      strain_3L[i] = this.allData[i].strain_front_lft_3;
    }
    return [strain_3L];
  }

  getStrainRightData(){
    var strain_1R = []
    for(let i=0; i<this.allData.length; i++){
      strain_1R[i] = this.allData[i].strain_front_rt_1;
    }
    return [strain_1R];
  }

  getStrainRight2Data(){
    var strain_2R = []
    for(let i=0; i<this.allData.length; i++){
      strain_2R[i] = this.allData[i].strain_front_rt_2;
    }
    return [strain_2R];
  }

  getStrainRight3Data(){
    var strain_3R = []
    for(let i=0; i<this.allData.length; i++){
      strain_3R[i] = this.allData[i].strain_front_rt_3;
    }
    return [strain_3R];
  }

  getStrainCenterData(){
    var strain_1C = []
    for(let i=0; i<this.allData.length; i++){
      strain_1C[i] = this.allData[i].strain_center_1;
    }
    return [strain_1C];
  }

  getStrainCenter2Data(){
    var strain_2C = []
    for(let i=0; i<this.allData.length; i++){
      strain_2C[i] = this.allData[i].strain_center_2;
    }
    return [strain_2C];
  }

  getStrainCenter3Data(){
    var strain_3C = []
    for(let i=0; i<this.allData.length; i++){
      strain_3C[i] = this.allData[i].strain_center_3;
    }
    return [strain_3C];
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
    var len = 4000; // Smaller the number, more precise red area marking of the points.
    var points = [];

    while (len != 0) {
      len--;
      var strainLeft = this.getStrainLeftData();
      var strainLeft2 = this.getStrainLeft2Data();
      var strainLeft3 = this.getStrainLeft3Data();
      var strainRight  = this.getStrainRightData();
      var strainRight2  = this.getStrainRight2Data();
      var strainRight3  = this.getStrainRight3Data();
      var strainCenter = this.getStrainCenterData();
      var strainCenter2 = this.getStrainCenter2Data();
      var strainCenter3 = this.getStrainCenter3Data();

      // var randval = Math.floor(Math.random()*100);
      max = Math.max(max, 6);
      
      var LPoint = {
        x: 362,
        y: 220,
        value: strainLeft, strainLeft2, strainLeft3
      };
      var RPoint = {
        x: 362,
        y: 130,
        value: strainRight, strainRight2, strainRight3
      };
      var CPoint = {
        x: 245,
        y: 174,
        value: strainCenter, strainCenter2, strainCenter3
      };
      points.push(LPoint, RPoint, CPoint);
    }
    
    
    // Follow heatmap data format.
    var data = {
      max: max,
      min: 0,
      data: points 
     };
  
    // Installs data which has been given by the variable above.
    heatmapInstance.setData(data);
    heatmapInstance.repaint();
  }

}
